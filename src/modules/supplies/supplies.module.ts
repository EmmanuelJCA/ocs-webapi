import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OncologyCenterModule } from '../oncology-center/oncology-center.module';
import { PersonModule } from '../person/person.module';
import { SuppliesEntity } from './entities/supplies.entity';
import { SuppliesController } from './supplies.controller';
import { MeasurementUnitController } from './measurement-unit.controller';
import { SuppliesService } from './supplies.service';
import { MeasurementUnitEntity } from './entities/measurement-unit.entity';
import { TreatmentModule } from '../treatment/treatment.module';

@Module({
  imports: [TypeOrmModule.forFeature([SuppliesEntity, MeasurementUnitEntity]), PersonModule, OncologyCenterModule, forwardRef(() => TreatmentModule)],
  controllers: [SuppliesController, MeasurementUnitController],
  exports: [SuppliesService],
  providers: [SuppliesService],
})
export class SuppliesModule {}
