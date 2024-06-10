import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CancerTypeEntity } from '../cancer/entities/cancer-type.entity';
import { CancerStageEntity } from '../cancer/entities/cancer-stage.entity';

@Injectable()
export class CancerService {
  constructor(
    @InjectRepository(CancerTypeEntity)
    private cancerTypeRepository: Repository<CancerTypeEntity>,
    @InjectRepository(CancerStageEntity)
    private cancerStageRepository: Repository<CancerStageEntity>,
  ) {}

  async findAllCancerTypes(): Promise<CancerTypeEntity[]> {
    return this.cancerTypeRepository.find();
  }

  async findAllCancerStages(): Promise<CancerStageEntity[]> {
    return this.cancerStageRepository.find();
  }

  async findOneCancerType(id: Uuid): Promise<CancerTypeEntity> {
    const cancerTypeEntity = await this.cancerTypeRepository.findOneBy({ id });
    if (!cancerTypeEntity) {
      throw new NotFoundException('Tipo de cáncer no encontrado');
    }

    return cancerTypeEntity;
  }

  async findOneCancerStage(id: Uuid): Promise<CancerStageEntity> {
    const cancerStageEntity = await this.cancerStageRepository.findOneBy({ id });
    if (!cancerStageEntity) {
      throw new NotFoundException('Etapa de cáncer no encontrado');
    }

    return cancerStageEntity;
  }
}
