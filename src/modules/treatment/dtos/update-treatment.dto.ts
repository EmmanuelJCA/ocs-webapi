import { DateFieldOptional, EnumFieldOptional, StringFieldOptional, UUIDFieldOptional } from '../../../decorators/field.decorators';
import { TreatmentResult } from '../../../constants/treatment-result';

export class UpdateTreatmentDto {
  @StringFieldOptional()
  instructions?: string;

  @DateFieldOptional()
  startDateTime?: Date;

  @DateFieldOptional({ nullable: true })
  endDateTime?: Date | null;

  @EnumFieldOptional(() => TreatmentResult, { nullable: true })
  result?: TreatmentResult | null;

  @StringFieldOptional({ nullable: true })
  resultNotes?: string | null;

  @UUIDFieldOptional()
  treatmentTypeId?: Uuid;

  @UUIDFieldOptional()
  oncologyCenterId?: Uuid;

  @UUIDFieldOptional()
  physicianId?: Uuid;

  @UUIDFieldOptional({ each: true, minLength: 1 })
  diagnosticsIds?: Uuid[];
}
