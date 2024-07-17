import { ValidateIf } from 'class-validator';
import { DateFieldOptional, StringFieldOptional, UUIDFieldOptional } from '../../../decorators/field.decorators';

export class UpdateAppointmentDto {
  @ValidateIf((a) => a.notes !== '')
  @StringFieldOptional()
  notes?: string;

  @DateFieldOptional()
  startDateTime?: Date;

  @DateFieldOptional({ nullable: true })
  endDateTime?: Date | null;

  @UUIDFieldOptional({ each: true, minLength: 1 })
  reasonsIds!: Uuid[];

  @UUIDFieldOptional({ each: true })
  monitoredDiagnosticsIds!: Uuid[];

  @UUIDFieldOptional()
  physicianId!: Uuid;

  @UUIDFieldOptional()
  patientId!: Uuid;

  @UUIDFieldOptional()
  oncologyCenterId!: Uuid;
}
