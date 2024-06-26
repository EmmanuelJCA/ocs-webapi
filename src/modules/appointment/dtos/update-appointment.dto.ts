import { DateFieldOptional, StringFieldOptional, UUIDFieldOptional } from '../../../decorators/field.decorators';

export class UpdateAppointmentDto {
  @StringFieldOptional()
  notes?: string;

  @DateFieldOptional()
  startDateTime!: Date;

  @DateFieldOptional()
  endDateTime?: Date;

  @UUIDFieldOptional()
  reasonsIds!: Uuid[];

  @UUIDFieldOptional()
  physicianId!: Uuid;

  @UUIDFieldOptional()
  patientId!: Uuid;

  @UUIDFieldOptional()
  oncologyCenterId!: Uuid;
}
