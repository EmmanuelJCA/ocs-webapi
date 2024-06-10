import { DateField, StringFieldOptional, UUIDField } from '../../../decorators/field.decorators';

export class CreateDiagnosticDto {
  @DateField()
  date!: Date;

  @StringFieldOptional()
  notes?: string;

  @UUIDField()
  appointmentId!: Uuid;

  @UUIDField()
  cancerTypeId!: Uuid;

  @UUIDField()
  cancerStageId!: Uuid;
}
