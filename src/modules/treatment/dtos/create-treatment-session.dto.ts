import { ClassFieldOptional, DateField, StringField, UUIDField } from '../../../decorators/field.decorators';
import { CreateRecipeDto } from '../../recipe/dtos/create-recipe.dto';

export class CreateTreatmentSessionDto {
  @StringField()
  instructions!: string;

  @DateField()
  startDateTime!: Date;

  @DateField({ nullable: true })
  endDateTime!: Date | null;

  @StringField()
  observations!: string;

  @UUIDField()
  physicianSupportId!: Uuid;

  @UUIDField()
  treatmentId!: Uuid;

  @ClassFieldOptional(() => CreateRecipeDto, { isArray: true })
  recipes?: CreateRecipeDto[];
}
