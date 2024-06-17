import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CancerTypeEntity } from '../cancer/entities/cancer-type.entity';
import { CancerStageEntity } from '../cancer/entities/cancer-stage.entity';
import { CreateCancerTypeDto } from './dtos/create-cancer-type.dto';
import { UpdateCancerTypeDto } from './dtos/update-cancer-type.dto';

@Injectable()
export class CancerService {
  constructor(
    @InjectRepository(CancerTypeEntity)
    private cancerTypeRepository: Repository<CancerTypeEntity>,
    @InjectRepository(CancerStageEntity)
    private cancerStageRepository: Repository<CancerStageEntity>,
  ) {}

  async createCancerType(createCancerType: CreateCancerTypeDto): Promise<CancerTypeEntity> {
    const cancerTypeEntity = this.cancerTypeRepository.create(createCancerType);
    return this.cancerTypeRepository.save(cancerTypeEntity);
  }

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

  async updateCancerType(id: Uuid, updateCancerType: UpdateCancerTypeDto): Promise<CancerTypeEntity> {
    const cancerTypeEntity = await this.findOneCancerType(id);
    this.cancerTypeRepository.merge(cancerTypeEntity, updateCancerType);
    return this.cancerTypeRepository.save(cancerTypeEntity);
  }
}
