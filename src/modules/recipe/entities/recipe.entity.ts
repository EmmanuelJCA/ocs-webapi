import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { TreatmentSessionEntity } from '../../treatment/entities/treatment-session.entity';
import { RecipeDto } from '../dtos/recipe.dto';
import { RecipeSuppliesEntity } from './recipe-supplies.entity';

@Entity({ name: 'recipes' })
@UseDto(RecipeDto)
export class RecipeEntity extends AbstractEntity<RecipeDto> {
  @Column({ type: 'varchar' })
  instructions!: string;

  @OneToMany(() => RecipeSuppliesEntity, (recipeSupplies) => recipeSupplies.recipe)
  recipeSupplies!: RecipeSuppliesEntity[];

  @ManyToMany(
    () => TreatmentSessionEntity,
    treatmentSessions => treatmentSessions.recipes,
  )
  treatmentSessions!: TreatmentSessionEntity[];
}
