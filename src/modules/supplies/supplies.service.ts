import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuppliesEntity } from './entities/supplies.entity';
import { MeasurementUnitEntity } from './entities/measurement-unit.entity';

@Injectable()
export class SuppliesService {
  constructor(
    @InjectRepository(SuppliesEntity)
    private suppliesRepository: Repository<SuppliesEntity>,
    @InjectRepository(MeasurementUnitEntity)
    private measurementUnitRepository: Repository<MeasurementUnitEntity>,
  ) {}

  async findAll() {
    return this.suppliesRepository.find();
  }

  async findAllMeasurementUnits() {
    return this.measurementUnitRepository.find();
  }

  async findOne(id: Uuid) {
    const suppliesEntity = await this.suppliesRepository.findOneBy({ id });
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
}
