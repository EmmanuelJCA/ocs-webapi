import { AbstractDto } from '../../../common/dto/abstract.dto';
import { AppointmentEntity } from '../entities/appointment.entity';
import { ClassField, DateField, DateFieldOptional, StringField } from '../../../decorators/field.decorators';
import { PatientDto } from '../../patient/dtos/patient.dto';
import { PhysicianDto } from '../../physician/dtos/physician.dto';
import { AppointmentReasonDto } from './appointment-reason.dto';

export class AppointmentDto extends AbstractDto {
  @StringField()
  notes!: string;

  @DateField()
  startDateTime!: Date;

  @DateFieldOptional()
  endDateTime?: Date;

  @ClassField(() => AppointmentReasonDto)
  reason!: AppointmentReasonDto;

  @ClassField(() => PhysicianDto)
  physician!: PhysicianDto;

  @ClassField(() => PatientDto)
  patient!: PatientDto;

  constructor(appointment: AppointmentEntity) {
    super(appointment);
    this.notes = appointment.notes;
    this.startDateTime = appointment.startDateTime;
    this.endDateTime = appointment.endDateTime
    this.reason = appointment.reason;
    this.physician = appointment.physician.toDto();
    this.patient = appointment.patient.toDto();
  }
}
