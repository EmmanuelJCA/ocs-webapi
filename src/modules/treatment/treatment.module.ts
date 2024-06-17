import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentEntity } from './entities/treatment.entity';
import { TreatmentTypeEntity } from './entities/treatment-type.entity';
import { TreatmentSessionEntity } from './entities/treatment-session.entity';
import { TreatmentService } from './treatment.service';
import { TreatmentTypeController } from './treatment-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentEntity, TreatmentTypeEntity, TreatmentSessionEntity]),],
  controllers: [TreatmentTypeController],
  exports: [TreatmentService],
  providers: [TreatmentService],
})
export class TreatmentModule {}
