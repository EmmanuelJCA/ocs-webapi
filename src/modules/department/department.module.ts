import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity, SpecializationEntity } from './entities';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity, SpecializationEntity])],
  controllers: [DepartmentController],
  exports: [DepartmentService],
  providers: [DepartmentService],
})
export class DepartmentModule {}
