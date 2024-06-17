import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreatmentEntity } from './entities/treatment.entity';
import { In, Repository } from 'typeorm';
import { TreatmentTypeEntity } from './entities/treatment-type.entity';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(TreatmentEntity)
    private treatmentRepository: Repository<TreatmentEntity>,
    @InjectRepository(TreatmentTypeEntity)
    private treatmentTypeRepository: Repository<TreatmentTypeEntity>,
  ) {}

  async findAll(): Promise<TreatmentEntity[]> {
    return this.treatmentRepository.find();
  }

  async findAllTreatmentTypes(): Promise<TreatmentTypeEntity[]> {
    return this.treatmentTypeRepository.find();
  }

  async findOneTreatmentType(id: Uuid): Promise<TreatmentTypeEntity> {
    const treatmentTypeEntity = await this.treatmentTypeRepository.findOneBy({id});
    if (!treatmentTypeEntity) {
      throw new NotFoundException('Tipo de tratamiento no encontrado');
    }

    return treatmentTypeEntity;
  }

  async findTreatmentTypesByIds(ids: Uuid[]): Promise<TreatmentTypeEntity[]> {
    return this.treatmentTypeRepository.findBy({ id: In(ids) });
  }
}
