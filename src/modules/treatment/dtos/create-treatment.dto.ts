import { DateField, EnumField, StringFieldOptional, UUIDField } from '../../../decorators/field.decorators';
import { TreatmentResult } from '../../../constants/treatment-result';
import { ValidateIf } from 'class-validator';

export class CreateTreatmentDto {
  @ValidateIf((a) => a.instructions !== '')
  @StringFieldOptional()
  instructions?: string = '';

  @DateField()
  startDateTime!: Date;

  @DateField({ nullable: true })
  endDateTime!: Date | null;

  @EnumField(() => TreatmentResult, { nullable: true })
  result!: TreatmentResult | null;

  @ValidateIf((a) => a.resultNotes !== '')
  @StringFieldOptional({ nullable: true })
  resultNotes?: string | null = '';

  @UUIDField()
  treatmentTypeId!: Uuid;

  @UUIDField()
  oncologyCenterId!: Uuid;

  @UUIDField()
  physicianId!: Uuid;

  @UUIDField()
  diagnosticId!: Uuid;
}
