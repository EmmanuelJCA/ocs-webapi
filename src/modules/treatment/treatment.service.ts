import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreatmentEntity } from './entities/treatment.entity';
import { In, Repository } from 'typeorm';
import { TreatmentTypeEntity } from './entities/treatment-type.entity';
import { TreatmentSessionEntity } from './entities/treatment-session.entity';
import { CreateTreatmentDto, UpdateTreatmentDto } from './dtos';
import { DiagnosticService } from '../diagnostic/diagnostic.service';
import { OncologyCenterService } from '../oncology-center/oncology-center.service';
import { PhysicianService } from '../physician/physician.service';
import { Transactional } from 'typeorm-transactional';
import { RecipeService } from '../recipe/recipe.service';
import { CreateTreatmentSessionDto } from './dtos/create-treatment-session.dto';
import { PhysicianSupportService } from '../physician-support/physician-support.service';
import { UpdateTreatmentSessionDto } from './dtos/update-treatment-session.dto';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(TreatmentEntity)
    private treatmentRepository: Repository<TreatmentEntity>,
    @InjectRepository(TreatmentSessionEntity)
    private treatmentSessionRepository: Repository<TreatmentSessionEntity>,
    @InjectRepository(TreatmentTypeEntity)
    private treatmentTypeRepository: Repository<TreatmentTypeEntity>,
    private diagnosticService: DiagnosticService,
    private oncologyCenterService: OncologyCenterService,
    private physicianService: PhysicianService,
    @Inject(forwardRef(() => RecipeService))
    private recipeService: RecipeService,
    private physicianSupportService: PhysicianSupportService
  ) {}

  async create({ diagnosticId, oncologyCenterId, physicianId, treatmentTypeId, ...createTreatmentDto }: CreateTreatmentDto): Promise<TreatmentEntity> {
    const physician = await this.physicianService.findOne(physicianId);

    if(!physician.user.oncologyCenters.find(oc => oc.id === oncologyCenterId)) {
      throw new NotFoundException('El oncólogo no pertenece al centro oncológico seleccionado');
    }

    const treatmentType = await this.findOneTreatmentType(treatmentTypeId);

    if (!physician.specialization.find(specialization => specialization.department.id === treatmentType.department.id)) {
      throw new NotFoundException('El oncólogo no tiene la especialización necesaria para el tipo de tratamiento seleccionado');
    }

    const diagnostic = await this.diagnosticService.findOne(diagnosticId);
    const oncologyCenter = await this.oncologyCenterService.getOncologyCenter(oncologyCenterId);

    const treatment = this.treatmentRepository.create({
      oncologyCenter,
      physician,
      type: treatmentType,
      diagnostics: [diagnostic],
      ...createTreatmentDto
    });

    await this.treatmentRepository.save(treatment);

    return treatment;
  }

  @Transactional()
  async createTreatmentSession({ recipes = [], treatmentId, physicianSupportId, ...sessionDto  }: CreateTreatmentSessionDto) {
    const treatmentEntity = await this.findOne(treatmentId);

    const physicianSupportEntity = await this.physicianSupportService.findOne(physicianSupportId);

    const recipeEntities = recipes.map(async (r) => {
      return await this.recipeService.create(r);
    });

    if (recipeEntities.length !== recipes.length) {
      throw new BadRequestException("Alguna de las recetas está mal");
    }

    const treatmentSessionEntity = this.treatmentSessionRepository.create(sessionDto);

    treatmentSessionEntity.treatment = treatmentEntity;
    treatmentSessionEntity.physicianSupport = physicianSupportEntity
    treatmentSessionEntity.recipes = await Promise.all(recipeEntities);

    await this.treatmentSessionRepository.save(treatmentSessionEntity);

    return treatmentSessionEntity;
  }

  async findAll(diagnosticId?: Uuid): Promise<TreatmentEntity[]> {
    return this.treatmentRepository.find({
      relations: ['oncologyCenter', 'physician.user', 'diagnostics', 'type', 'diagnostics.appointment.patient', 'sessions', 'physician.specialization'],
      ...(diagnosticId ? { where: { diagnostics: { id: diagnosticId } } } : {})
    });
  }

  async findAllTreatmentSessions(treatmentId?: Uuid): Promise<TreatmentSessionEntity[]> {
    return this.treatmentSessionRepository.find({
      relations: ['physicianSupport.user', 'physicianSupport.specializations', 'recipes.recipeSupplies.supplies.measurementUnit'],
      ...(treatmentId
          ? { where: { treatment: { id: treatmentId } } }
          : {}
      )
    });
  }

  async findAllTreatmentTypes(): Promise<TreatmentTypeEntity[]> {
    return this.treatmentTypeRepository.find();
  }

  async findOne(id: Uuid): Promise<TreatmentEntity> {
    const treatmentEntity = await this.treatmentRepository.findOne({
      relations: ['oncologyCenter', 'physician.user.oncologyCenters', 'diagnostics', 'type', 'diagnostics.appointment.patient', 'sessions'],
      where: {id}
    });
    if (!treatmentEntity) {
      throw new NotFoundException('Tratamiento no encontrado');
    }

    return treatmentEntity;
  }

  async findOneTreatmentSession(id: Uuid): Promise<TreatmentSessionEntity> {
    const treatmentSessionEntity = await this.treatmentSessionRepository.findOne({
      relations: ['physicianSupport.user', 'physicianSupport.specializations', 'recipes.recipeSupplies.supplies'],
      where: {id}
    });
    if (!treatmentSessionEntity) {
      throw new NotFoundException('Sesión de tratamiento no encontrada');
    }

    return treatmentSessionEntity;
  }

  async findOneTreatmentType(id: Uuid): Promise<TreatmentTypeEntity> {
    const treatmentTypeEntity = await this.treatmentTypeRepository.findOne({ relations: ['department'], where: { id }});
    if (!treatmentTypeEntity) {
      throw new NotFoundException('Tipo de tratamiento no encontrado');
    }

    return treatmentTypeEntity;
  }

  async findTreatmentTypesByIds(ids: Uuid[]): Promise<TreatmentTypeEntity[]> {
    return this.treatmentTypeRepository.findBy({ id: In(ids) });
  }

  async update(
    id: Uuid,
    { oncologyCenterId, physicianId, diagnosticsIds, treatmentTypeId, ...appointmentUpdated }: UpdateTreatmentDto
  ): Promise<TreatmentEntity> {
    const treatmentEntity = await this.findOne(id);

    const treatment = this.treatmentRepository.merge(treatmentEntity, appointmentUpdated);

    if (oncologyCenterId) {
      const oncologyCenterEntity = await this.oncologyCenterService.getOncologyCenter(oncologyCenterId);
      treatment.oncologyCenter = oncologyCenterEntity;
    }

    if (physicianId) {
      const physicianEntity = await this.physicianService.findOne(physicianId);
      treatment.physician = physicianEntity;
    }

    if(!treatment.physician.user.oncologyCenters.find(oc => oc.id === treatment.oncologyCenter.id)) {
      throw new BadRequestException('El médico no pertenece al centro oncológico seleccionado');
    }

    if(diagnosticsIds) {
      const diagnostics = await this.diagnosticService.findAllByIds(diagnosticsIds);
      treatment.diagnostics = diagnostics;
    }

    if (treatmentTypeId) {
      const treatmentTypeEntity = await this.findOneTreatmentType(treatmentTypeId);
      treatment.type = treatmentTypeEntity;
    }

    await this.treatmentRepository.save(treatment);

    return treatment;
  }

  @Transactional()
  async updateTreatmentSession(
    id: Uuid,
    { recipes, treatmentId, physicianSupportId, ...sessionUpdated }: UpdateTreatmentSessionDto
  ): Promise<TreatmentSessionEntity> {
    const treatmentSessionEntity = await this.findOneTreatmentSession(id);

    const treatmentSession = this.treatmentSessionRepository.merge(treatmentSessionEntity, sessionUpdated);

    if(treatmentId) {
      const treatmentEntity = await this.findOne(treatmentId);
      treatmentSession.treatment = treatmentEntity;
    }

    if(physicianSupportId) {
      const physicianSupportEntity = await this.physicianSupportService.findOne(physicianSupportId);
      treatmentSession.physicianSupport = physicianSupportEntity;
    }

    if(recipes) {
      const recipeEntities = recipes.map(async (r) => {
        return await this.recipeService.update(r);
      });
      treatmentSession.recipes = await Promise.all(recipeEntities);
    }

    return this.treatmentSessionRepository.save(treatmentSession);
  }
}
