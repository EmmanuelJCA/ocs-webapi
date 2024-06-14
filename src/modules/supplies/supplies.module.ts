import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OncologyCenterModule } from '../oncology-center/oncology-center.module';
import { PersonModule } from '../person/person.module';
import { SuppliesEntity } from './entities/supplies.entity';
import { SuppliesController } from './supplies.controller';
import { MeasurementUnitController } from './measurement-unit.controller';
import { SuppliesService } from './supplies.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuppliesEntity]), PersonModule, OncologyCenterModule],
  controllers: [SuppliesController, MeasurementUnitController],
  exports: [],
  providers: [SuppliesService],
})
export class SuppliesModule {}
