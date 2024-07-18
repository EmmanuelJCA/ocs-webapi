import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicianSupportEntity } from './entities/physician-support.entity';
import { PhysicianSupportController } from './physician-support.controller';
import { PhysicianSupportService } from './physician-support.service';
import { UserModule } from '../user/user.module';
import { PhysicianSupportSpecializationController } from './physician-support-specialization.controller';
import { PhysicianSupportSpecializationEntity } from './entities/physician-support-specialization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicianSupportEntity, PhysicianSupportSpecializationEntity]), UserModule],
  exports: [PhysicianSupportService],
  providers: [PhysicianSupportService],
  controllers: [PhysicianSupportController, PhysicianSupportSpecializationController],
})
export class PhysicianSupportModule {}
