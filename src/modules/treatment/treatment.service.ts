import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreatmentEntity } from './entities/treatment.entity';
import { Repository } from 'typeorm';
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
}
