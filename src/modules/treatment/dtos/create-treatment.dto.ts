import { DateField, EnumField, StringField, UUIDField } from '../../../decorators/field.decorators';
import { TreatmentResult } from '../../../constants/treatment-result';

export class CreateTreatmentDto {
  @StringField()
  instructions!: string;

  @DateField()
  startDateTime!: Date;

  @DateField({ nullable: true })
  endDateTime!: Date | null;

  @EnumField(() => TreatmentResult, { nullable: true })
  result!: TreatmentResult | null;

  @StringField({ nullable: true })
  resultNotes!: string | null;

  @UUIDField()
  treatmentTypeId!: Uuid;

  @UUIDField()
  oncologyCenterId!: Uuid;

  @UUIDField()
  physicianId!: Uuid;

  @UUIDField()
  diagnosticId!: Uuid;
}
