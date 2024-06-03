import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity, PhysicianSpecializationEntity, PhysicianSupportSpecializationEntity } from './entities';
import { In, Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>,
    @InjectRepository(PhysicianSpecializationEntity)
    private physicianSpecializationRepository: Repository<PhysicianSpecializationEntity>,
    @InjectRepository(PhysicianSupportSpecializationEntity)
    private physicianSupportSpecializationRepository: Repository<PhysicianSupportSpecializationEntity>,
  ) {}

  async findAll(): Promise<DepartmentEntity[]> {
    return this.departmentRepository.find();
  }

  async findOne(id: Uuid): Promise<DepartmentEntity> {
    const departmentEntity = await this.departmentRepository.findOneBy({ id });

    if (!departmentEntity) {
      throw new NotFoundException('Departamento no encontrado');
    }

    return departmentEntity;
  }

  async findSpecializationsByIds(ids: Uuid[]): Promise<PhysicianSpecializationEntity[]> {
    return this.physicianSpecializationRepository.findBy({ id: In(ids) });
  }

  async findSupportSpecializationsByIds(ids: Uuid[]): Promise<PhysicianSupportSpecializationEntity[]> {
    return this.physicianSupportSpecializationRepository.findBy({ id: In(ids) });
  }
}
