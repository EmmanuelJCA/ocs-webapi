import { DateFieldOptional, EnumFieldOptional, StringFieldOptional, UUIDFieldOptional } from '../../../decorators/field.decorators';
import { TreatmentResult } from '../../../constants/treatment-result';
import { ValidateIf } from 'class-validator';

export class UpdateTreatmentDto {
  @ValidateIf((a) => a.instructions !== '')
  @StringFieldOptional()
  instructions?: string = '';

  @DateFieldOptional()
  startDateTime?: Date;

  @DateFieldOptional({ nullable: true })
  endDateTime?: Date | null;

  @EnumFieldOptional(() => TreatmentResult, { nullable: true })
  result?: TreatmentResult | null;

  @ValidateIf((a) => a.resultNotes !== '')
  @StringFieldOptional({ nullable: true })
  resultNotes?: string | null = '';

  @UUIDFieldOptional()
  treatmentTypeId?: Uuid;

  @UUIDFieldOptional()
  oncologyCenterId?: Uuid;

  @UUIDFieldOptional()
  physicianId?: Uuid;

  @UUIDFieldOptional({ each: true, minLength: 1 })
  diagnosticsIds?: Uuid[];
}
