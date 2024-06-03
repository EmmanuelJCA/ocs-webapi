import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicianSupportEntity } from './entities/physician-support.entity';
import { PhysicianSupportController } from './physician-support.controller';
import { PhysicianSupportService } from './physician-support.service';
import { UserModule } from '../user/user.module';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicianSupportEntity]), UserModule, DepartmentModule],
  exports: [],
  providers: [PhysicianSupportService],
  controllers: [PhysicianSupportController],
})
export class PhysicianSupportModule {}
