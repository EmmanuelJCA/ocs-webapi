import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { SuppliesEntity } from '../../supplies/entities/supplies.entity';
import { TreatmentSessionEntity } from '../../treatment/entities/treatment-session.entity';
import { RecipeDto } from '../dtos/recipe.dto';

@Entity({ name: 'recipes' })
@UseDto(RecipeDto)
export class RecipeEntity extends AbstractEntity<RecipeDto> {
  @Column({ type: 'varchar' })
  instructions!: string;

  @ManyToMany(
    () => SuppliesEntity,
    supplies => supplies.recipes
  )
  @JoinTable({
    name: 'recipes_supplies',
    joinColumn: { name: 'recipes_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'supplies_id',
      referencedColumnName: 'id',
    },
  })
  supplies!: SuppliesEntity[];

  @ManyToMany(
    () => TreatmentSessionEntity,
    treatmentSessions => treatmentSessions.recipes,
  )
  treatmentSessions!: TreatmentSessionEntity[];
}
