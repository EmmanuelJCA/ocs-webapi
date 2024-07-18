import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SuppliesEntity } from './entities/supplies.entity';
import { MeasurementUnitEntity } from './entities/measurement-unit.entity';
import { CreateSuppliesDto } from './dtos/create-supplies.dto';
import { TreatmentService } from '../treatment/treatment.service';
import { UpdateSuppliesDto } from './dtos/update-supplies.dto';

@Injectable()
export class SuppliesService {
  constructor(
    @InjectRepository(SuppliesEntity)
    private suppliesRepository: Repository<SuppliesEntity>,
    @InjectRepository(MeasurementUnitEntity)
    private measurementUnitRepository: Repository<MeasurementUnitEntity>,
    private treatmentService: TreatmentService,
  ) {}

  async create({ treatmentTypesIds, measurementUnitId, ...supplies }: CreateSuppliesDto): Promise<SuppliesEntity> {
    const measurementUnit = await this.findOneMeasurementUnit(measurementUnitId);
    const treatmentType = await this.treatmentService.findTreatmentTypesByIds(treatmentTypesIds);

    const suppliesEntity = this.suppliesRepository.create(supplies);
    suppliesEntity.treatmentTypes = treatmentType;
    suppliesEntity.measurementUnit = measurementUnit;

    await this.suppliesRepository.save(suppliesEntity);
    return suppliesEntity;
  }

  async findAll() {
    return this.suppliesRepository.createQueryBuilder('supplies')
      .leftJoinAndSelect('supplies.treatmentTypes', 'treatmentTypes')
      .leftJoinAndSelect('supplies.measurementUnit', 'measurementUnit')
      .getMany();
  }

  async findAllByIds(suppliesIds: Uuid[]): Promise<SuppliesEntity[]> {
    return this.suppliesRepository.findBy({id: In(suppliesIds)})
  }

  async findAllMeasurementUnits() {
    return this.measurementUnitRepository.find();
  }

  async findOne(id: Uuid) {
    const suppliesEntity = await this.suppliesRepository.createQueryBuilder('supplies')
      .leftJoinAndSelect('supplies.treatmentTypes', 'treatmentTypes')
      .leftJoinAndSelect('supplies.measurementUnit', 'measurementUnit')
      .where('supplies.id = :id', { id })
      .getOne();

    if (!suppliesEntity) {
      throw new NotFoundException('Insumo no encontrado');
    }

    return suppliesEntity;
  }

  async findOneMeasurementUnit(id: Uuid) {
    const measurementUnitEntity = await this.measurementUnitRepository.findOneBy({ id });
    if (!measurementUnitEntity) {
      throw new NotFoundException('Unidad de medida no encontrada');
    }

    return measurementUnitEntity;
  }

  async update(
    id: Uuid,
    { treatmentTypesIds, measurementUnitId, ...supplies }: UpdateSuppliesDto
  ): Promise<SuppliesEntity> {
    const suppliesEntity = await this.findOne(id);

    this.suppliesRepository.merge(suppliesEntity, supplies);

    if (treatmentTypesIds) {
      const treatmentType = await this.treatmentService.findTreatmentTypesByIds(treatmentTypesIds);
      suppliesEntity.treatmentTypes = treatmentType;
    }

    if (measurementUnitId) {
      const measurementUnit = await this.findOneMeasurementUnit(measurementUnitId);
      suppliesEntity.measurementUnit = measurementUnit;
    }

    await this.suppliesRepository.save(suppliesEntity);
    return suppliesEntity;
  }
}
