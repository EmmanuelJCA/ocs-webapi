import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { type CreateOncologyCenterDto } from './dtos/create-oncology-center.dto';
import { type UpdateOncologyCenterDto } from './dtos/update-oncology-center.dto';
import { OncologyCenterEntity } from './entities/oncology-center.entity';
import { OncologyCenterNotFoundException } from './exceptions/oncology-center-not-found.exception';

@Injectable()
export class OncologyCenterService {
  constructor(
    @InjectRepository(OncologyCenterEntity)
    private oncologyCenterRepository: Repository<OncologyCenterEntity>,
  ) {}

  async createOncologyCenter(
    createOncologyCenterDto: CreateOncologyCenterDto,
  ): Promise<OncologyCenterEntity> {
    const oncologyCenterEntity = this.oncologyCenterRepository.create(
      createOncologyCenterDto,
    );

    await this.oncologyCenterRepository.save(oncologyCenterEntity);

    return oncologyCenterEntity;
  }

  async getOncologyCentersByIds(ids: Uuid[]): Promise<OncologyCenterEntity[]> {
    return this.oncologyCenterRepository.findBy({ id: In(ids) });
  }

  async getOncologyCenters(): Promise<OncologyCenterEntity[]> {
    return this.oncologyCenterRepository.find();
  }

  async getOncologyCenter(id: Uuid): Promise<OncologyCenterEntity> {
    const oncologyCenterEntity = await this.oncologyCenterRepository.findOneBy({
      id,
    });

    if (!oncologyCenterEntity) {
      throw new OncologyCenterNotFoundException();
    }

    return oncologyCenterEntity;
  }

  async updateOncologyCenter(
    id: Uuid,
    { isActive, ...updateOncologyCenterDto }: UpdateOncologyCenterDto,
  ): Promise<OncologyCenterEntity> {
    const oncologyCenterEntity = await this.getOncologyCenter(id);

    if (isActive !== undefined) {
      updateOncologyCenterDto.inactivatedAt = isActive ? null : new Date();
    }

    this.oncologyCenterRepository.merge(
      oncologyCenterEntity,
      updateOncologyCenterDto,
    );

    await this.oncologyCenterRepository.save(oncologyCenterEntity);

    return oncologyCenterEntity;
  }

  async inactivateOncologyCenter(id: Uuid): Promise<OncologyCenterEntity> {
    const oncologyCenterEntity = await this.getOncologyCenter(id);

    oncologyCenterEntity.inactivatedAt = new Date();

    await this.oncologyCenterRepository.save(oncologyCenterEntity);

    return oncologyCenterEntity;
  }
}
