import { ValidateIf } from 'class-validator';
import { DateField, StringFieldOptional, UUIDField } from '../../../decorators/field.decorators';

export class CreateAppointmentDto {
  @ValidateIf((a) => a.notes !== '')
  @StringFieldOptional()
  notes?: string;

  @DateField()
  startDateTime!: Date;

  @DateField({ nullable: true })
  endDateTime!: Date | null;

  @UUIDField({ each: true, minLength: 1 })
  reasonsIds!: Uuid[];

  @UUIDField()
  physicianId!: Uuid;

  @UUIDField()
  patientId!: Uuid;

  @UUIDField()
  oncologyCenterId!: Uuid;
}
