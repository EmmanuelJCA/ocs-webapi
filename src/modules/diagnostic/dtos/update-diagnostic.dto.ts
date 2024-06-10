import { DateFieldOptional, StringFieldOptional, UUIDFieldOptional } from '../../../decorators/field.decorators';

export class UpdateDiagnosticDto {
  @DateFieldOptional()
  closedAt?: Date | null;

  @DateFieldOptional()
  date?: Date;

  @StringFieldOptional()
  notes?: string;

  @UUIDFieldOptional()
  appointmentId?: Uuid;

  @UUIDFieldOptional()
  cancerTypeId?: Uuid;

  @UUIDFieldOptional()
  cancerStageId?: Uuid;
}
