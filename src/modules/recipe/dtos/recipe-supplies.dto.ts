import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ClassField, NumberField, StringField } from '../../../decorators/field.decorators';
import { MeasurementUnitDto } from '../../supplies/dtos/measurement-unit.dto';
import { RecipeSuppliesEntity } from '../entities/recipe-supplies.entity';

export class RecipeSuppliesDto extends AbstractDto {
  @StringField()
  name!: string;

  @StringField()
  description!: string;

  @ClassField(() => MeasurementUnitDto)
  measurementUnit!: MeasurementUnitDto;

  @NumberField()
  dose!: number;

  constructor(recipeSupplies: RecipeSuppliesEntity) {
    super(recipeSupplies);
    this.name = recipeSupplies.supplies.name;
    this.description = recipeSupplies.supplies.description;
    this.measurementUnit = recipeSupplies.supplies.measurementUnit;
    this.dose = recipeSupplies.dose;
  }
}
