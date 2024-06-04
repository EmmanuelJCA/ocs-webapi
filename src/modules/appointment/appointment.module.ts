import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { AppointmentReasonEntity } from './entities/appointment-reason.entity';
import { PhysicianModule } from '../physician/physician.module';
import { PatientModule } from '../patient/patient.module';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { OncologyCenterModule } from '../oncology-center/oncology-center.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentEntity, AppointmentReasonEntity]),
    OncologyCenterModule,
    PhysicianModule,
    PatientModule,
  ],
  exports: [],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
