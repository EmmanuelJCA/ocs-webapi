import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicianEntity } from './entities/physician.entity';
import { PhysicianController } from './physician.controller';
import { PhysicianService } from './physician.service';
import { UserModule } from '../user/user.module';
import { PhysicianSpecializationEntity } from './entities/physician-specialization.entity';
import { PhysicianSpecializationController } from './physiscian-specialization.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicianEntity, PhysicianSpecializationEntity]), UserModule],
  exports: [PhysicianService],
  providers: [PhysicianService],
  controllers: [PhysicianController, PhysicianSpecializationController],
})
export class PhysicianModule {}
