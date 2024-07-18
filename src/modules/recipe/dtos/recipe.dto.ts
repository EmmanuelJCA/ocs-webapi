import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ClassField, StringField } from '../../../decorators/field.decorators';
import { RecipeEntity } from '../entities/recipe.entity';
import { RecipeSuppliesDto } from './recipe-supplies.dto';

export class RecipeDto extends AbstractDto {
  @StringField()
  instructions!: string;

  @ClassField(() => RecipeSuppliesDto, { each: true } )
  supplies: RecipeSuppliesDto[];

  constructor(recipe: RecipeEntity) {
    super(recipe);
    this.instructions = recipe.instructions;
    this.supplies = recipe.recipeSupplies.toDtos();
  }
}
