import { ClassFieldOptional, NumberFieldOptional, StringFieldOptional, UUIDFieldOptional } from '../../../decorators/field.decorators';

export class UpdateRecipeSuppliesDto {
  @UUIDFieldOptional()
  id?: Uuid;

  @StringFieldOptional()
  instructions?: string;

  @NumberFieldOptional()
  dose?: number;
}

export class UpdateRecipeDto {
  @UUIDFieldOptional()
  id?: Uuid;

  @StringFieldOptional()
  instructions?: string;

  @ClassFieldOptional(() => UpdateRecipeSuppliesDto, { isArray: true })
  supplies?: UpdateRecipeSuppliesDto[];
}
