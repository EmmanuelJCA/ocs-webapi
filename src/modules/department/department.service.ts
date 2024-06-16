import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>,
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
}
