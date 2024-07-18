import { ClassFieldOptional, DateFieldOptional, StringFieldOptional, UUIDFieldOptional } from '../../../decorators/field.decorators';
import { UpdateRecipeDto } from '../../recipe/dtos/update-recipe.dto';

export class UpdateTreatmentSessionDto {
  @StringFieldOptional()
  instructions?: string;

  @DateFieldOptional()
  startDateTime?: Date;

  @DateFieldOptional({ nullable: true })
  endDateTime?: Date | null;

  @StringFieldOptional()
  observations?: string;

  @UUIDFieldOptional()
  physicianSupportId?: Uuid;

  @UUIDFieldOptional()
  treatmentId?: Uuid;

  @ClassFieldOptional(() => UpdateRecipeDto, { isArray: true })
  recipes?: UpdateRecipeDto[];
}
