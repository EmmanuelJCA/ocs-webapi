import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { AppointmentReasonEntity } from './entities/appointment-reason.entity';
import { PhysicianModule } from '../physician/physician.module';
import { PatientModule } from '../patient/patient.module';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { DiagnosticModule } from './../diagnostic/diagnostic.module';
import { OncologyCenterModule } from '../oncology-center/oncology-center.module';
import { AppointmentReasonController } from './appointment-reason.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentEntity, AppointmentReasonEntity]),
    forwardRef(() => DiagnosticModule),
    OncologyCenterModule,
    PhysicianModule,
    PatientModule,
  ],
  exports: [AppointmentService],
  providers: [AppointmentService],
  controllers: [AppointmentController, AppointmentReasonController],
})
export class AppointmentModule {}
