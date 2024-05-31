import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity, PhysicianSpecializationEntity, PhysicianSupportSpecializationEntity } from './entities';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity, PhysicianSpecializationEntity, PhysicianSupportSpecializationEntity])],
  controllers: [DepartmentController],
  exports: [DepartmentService],
  providers: [DepartmentService],
})
export class DepartmentModule {}
