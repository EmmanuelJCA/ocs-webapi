import { ValidateIf } from 'class-validator';
import { ClassFieldOptional, DateField, StringFieldOptional, UUIDField } from '../../../decorators/field.decorators';
import { CreateRecipeDto } from '../../recipe/dtos/create-recipe.dto';

export class CreateTreatmentSessionDto {
  @ValidateIf((a) => a.instructions !== '')
  @StringFieldOptional()
  instructions?: string = '';

  @DateField()
  startDateTime!: Date;

  @DateField({ nullable: true })
  endDateTime!: Date | null;

  @ValidateIf((a) => a.observations !== '')
  @StringFieldOptional()
  observations?: string = '';

  @UUIDField()
  physicianSupportId!: Uuid;

  @UUIDField()
  treatmentId!: Uuid;

  @ClassFieldOptional(() => CreateRecipeDto, { isArray: true })
  recipes?: CreateRecipeDto[];
}
