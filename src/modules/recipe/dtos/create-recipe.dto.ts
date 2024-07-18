import { ClassField, NumberField, StringField, UUIDField } from '../../../decorators/field.decorators';

export class CreateRecipeSuppliesDto {
  @UUIDField()
  id!: Uuid;

  @StringField()
  instructions!: string;

  @NumberField()
  dose!: number;
}

export class CreateRecipeDto {
  @StringField()
  instructions!: string;

  @ClassField(() => CreateRecipeSuppliesDto, { isArray: true })
  supplies!: CreateRecipeSuppliesDto[];
}
