import { SuppliesEntity } from '../../supplies/entities/supplies.entity';
import { AbstractEntity } from '../../../common/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { RecipeEntity } from './recipe.entity';
import { RecipeSuppliesDto } from '../dtos/recipe-supplies.dto';


@Entity({ name: 'recipes_supplies' })
@UseDto(RecipeSuppliesDto)
export class RecipeSuppliesEntity extends AbstractEntity<RecipeSuppliesDto> {
  @ManyToOne(() => RecipeEntity, (recipe) => recipe.recipeSupplies)
  recipe!: RecipeEntity;

  @ManyToOne(() => SuppliesEntity, (supplies) => supplies.recipeSupplies)
  supplies!: SuppliesEntity;

  @Column({ type: 'decimal' })
  dose!: number;
}
