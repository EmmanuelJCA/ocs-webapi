import { AbstractDto } from '../../../common/dto/abstract.dto';
import { AppointmentEntity } from '../entities/appointment.entity';
import { ClassField, DateField, DateFieldOptional, StringField } from '../../../decorators/field.decorators';
import { PatientDto } from '../../patient/dtos/patient.dto';
import { PhysicianDto } from '../../physician/dtos/physician.dto';
import { AppointmentReasonDto } from './appointment-reason.dto';
import { DiagnosticDto } from '../../diagnostic/dtos/diagnostic.dto';

export class AppointmentDto extends AbstractDto {
  @StringField()
  notes!: string;

  @DateField()
  startDateTime!: Date;

  @DateFieldOptional()
  endDateTime?: Date;

  @ClassField(() => AppointmentReasonDto, { isArray: true })
  reasons!: AppointmentReasonDto[];

  @ClassField(() => PhysicianDto)
  physician!: PhysicianDto;

  @ClassField(() => PatientDto)
  patient!: PatientDto;

  @ClassField(() => DiagnosticDto, { isArray: true })
  diagnostics!: DiagnosticDto[];

  @ClassField(() => DiagnosticDto, { isArray: true })
  monitoredDiagnostics!: DiagnosticDto[];

  constructor(appointment: AppointmentEntity) {
    super(appointment);
    this.notes = appointment.notes;
    this.startDateTime = appointment.startDateTime;
    this.endDateTime = appointment.endDateTime
    this.reasons = appointment.reasons;
    this.physician = appointment.physician.toDto();
    this.patient = appointment.patient.toDto();
    this.diagnostics = appointment.diagnostics.toDtos();
    this.monitoredDiagnostics = appointment.monitoredDiagnostics.toDtos();
  }
}
