import { ClassFieldOptional, DateFieldOptional, StringFieldOptional, UUIDFieldOptional } from '../../../decorators/field.decorators';
import { UpdateRecipeDto } from '../../recipe/dtos/update-recipe.dto';
import { ValidateIf } from 'class-validator';

export class UpdateTreatmentSessionDto {
  @ValidateIf((a) => a.instructions !== '')
  @StringFieldOptional()
  instructions?: string = '';

  @DateFieldOptional()
  startDateTime?: Date;

  @DateFieldOptional({ nullable: true })
  endDateTime?: Date | null;

  @ValidateIf((a) => a.observations !== '')
  @StringFieldOptional()
  observations?: string = '';

  @UUIDFieldOptional()
  physicianSupportId?: Uuid;

  @UUIDFieldOptional()
  treatmentId?: Uuid;

  @ClassFieldOptional(() => UpdateRecipeDto, { isArray: true })
  recipes?: UpdateRecipeDto[];
}
