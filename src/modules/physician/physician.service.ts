import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysicianEntity } from './entities/physician.entity';
import { In, Repository } from 'typeorm';
import { CreatePhysicianDto } from './dtos/create-physician.dto';
import { Transactional } from 'typeorm-transactional';
import { UserService } from '../user/user.service';
import { IFile } from '../../interfaces/file';
import { UpdatePhysicianDto } from './dtos/update-physician.dto';
import { PhysicianSpecializationEntity } from './entities/physician-specialization.entity';

@Injectable()
export class PhysicianService {
  constructor(
    @InjectRepository(PhysicianEntity)
    private physicianRepository: Repository<PhysicianEntity>,
    @InjectRepository(PhysicianSpecializationEntity)
    private specializationRepository: Repository<PhysicianSpecializationEntity>,
    private userService: UserService,
  ) {}

  @Transactional()
  async create(
    { specializationsIds, ...personalInfo }: CreatePhysicianDto,
    file?: IFile,
  ): Promise<PhysicianEntity> {
    const specializations =
    await this.findSpecializationsByIds(
      specializationsIds,
    );

    if (specializations.length !== specializationsIds.length) {
      throw new BadRequestException('Especialidades no válidos');
    }

    const user = await this.userService.createUser(personalInfo, file, true);
    const physicianEntity = this.physicianRepository.create();

    physicianEntity.user = user;
    physicianEntity.specialization = specializations;

    await this.physicianRepository.save(physicianEntity);
    return physicianEntity;
  }

  async findAll(): Promise<PhysicianEntity[]> {
    return this.physicianRepository.find({ relations: ['user', 'specialization', 'user.oncologyCenters'] });
  }

  async findAllSpecializations(): Promise<PhysicianSpecializationEntity[]> {
    return this.specializationRepository.find();
  }

  async findOne(id: Uuid): Promise<PhysicianEntity> {
    const physicianEntity = await this.physicianRepository.findOne({
      relations: ['user', 'specialization', 'user.oncologyCenters'],
      where: {id}
    });
    if (!physicianEntity) {
      throw new NotFoundException('Médico no encontrado no encontrada');
    }

    return physicianEntity;
  }

  async findOneSpecialization(id: Uuid): Promise<PhysicianSpecializationEntity> {
    const specialization = await this.specializationRepository.findOne({
      where: {id}
    });
    if (!specialization) {
      throw new NotFoundException('Especialidad no encontrada');
    }

    return specialization;
  }

  async findSpecializationsByIds(ids: Uuid[]): Promise<PhysicianSpecializationEntity[]> {
    return this.specializationRepository.findBy({ id: In(ids) });
  }

  @Transactional()
  async update(id: Uuid, updatePhysicianDto: UpdatePhysicianDto, file?: IFile,): Promise<PhysicianEntity> {
    const physicianEntity = await this.findOne(id);

    const { specializationsIds, ...personalInfo } = updatePhysicianDto;

    const user = await this.userService.updateUser(physicianEntity.user.id, personalInfo, file);

    if (specializationsIds) {
      const specializations =
      await this.findSpecializationsByIds(
        specializationsIds,
      );

      physicianEntity.specialization = specializations;
    }

    await this.physicianRepository.save(physicianEntity);

    physicianEntity.user = user;

    return physicianEntity;
  }

  async inactivate(id: Uuid): Promise<PhysicianEntity> {
    const physicianEntity = await this.findOne(id);

    this.userService.inactivateUser(physicianEntity.user.id);

    return physicianEntity;
  }

}
