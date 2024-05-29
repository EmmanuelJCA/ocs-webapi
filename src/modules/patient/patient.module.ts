import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PatientEntity } from './entities/patient.entity';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity]), PersonModule],
  exports: [],
  providers: [PatientService],
  controllers: [PatientController],
})
export class PatientModule {}
