import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { AbstractEntity } from '../../../common/abstract.entity';
import { TreatmentEntity } from './treatment.entity';
import { RecipeEntity } from '../../recipe/entities/recipe.entity';
import { TreatmentSessionDto } from '../dtos/treatment-session.dto';
import { PhysicianSupportEntity } from '../../physician-support/entities/physician-support.entity';

@Entity({ name: 'treatment_sessions' })
@UseDto(TreatmentSessionDto)
export class TreatmentSessionEntity extends AbstractEntity<TreatmentSessionDto> {
  @Column({ type: 'varchar' })
  instructions!: string;

  @Column({ type: 'timestamp' })
  startDateTime!: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDateTime!: Date | null;

  @Column({ type: 'varchar' })
  observations!: string;

  @ManyToOne(
    () => PhysicianSupportEntity,
    physicianSupport => physicianSupport.treatmentSessions
  )
  @JoinColumn({ name: 'physician_support_id' })
  physicianSupport!: PhysicianSupportEntity;

  @ManyToOne(
    () => TreatmentEntity,
    treatment => treatment.sessions
  )
  @JoinColumn({ name: 'department_id' })
  treatment!: TreatmentEntity;

  @ManyToMany(
    () => RecipeEntity,
    recipe => recipe.treatmentSessions
  )
  @JoinTable({
    name: 'treatment_sessions_recipes',
    joinColumn: { name: 'treatment_sessions', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'recipes_id',
      referencedColumnName: 'id',
    },
  })
  recipes!: RecipeEntity[];
}
