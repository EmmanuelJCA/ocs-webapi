import { DateField, DateFieldOptional, StringFieldOptional, UUIDField } from '../../../decorators/field.decorators';

export class CreateAppointmentDto {
  @StringFieldOptional()
  notes?: string;

  @DateField()
  startDateTime!: Date;

  @DateFieldOptional()
  endDateTime?: Date;

  @UUIDField()
  reasonId!: Uuid;

  @UUIDField()
  physicianId!: Uuid;

  @UUIDField()
  patientId!: Uuid;

  @UUIDField()
  oncologyCenterId!: Uuid;
}
