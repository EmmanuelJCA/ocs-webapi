import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicianEntity } from './entities/physician.entity';
import { PhysicianController } from './physician.controller';
import { PhysicianService } from './physician.service';
import { UserModule } from '../user/user.module';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicianEntity]), UserModule, DepartmentModule],
  exports: [PhysicianService],
  providers: [PhysicianService],
  controllers: [PhysicianController],
})
export class PhysicianModule {}
