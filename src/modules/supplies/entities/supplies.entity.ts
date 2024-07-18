import { TreatmentTypeEntity } from './../../treatment/entities/treatment-type.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { AbstractEntity } from '../../../common/abstract.entity';
import { MeasurementUnitEntity } from './measurement-unit.entity';
import { SuppliesDto } from '../dtos/supplies.dto';
import { RecipeSuppliesEntity } from '../../recipe/entities/recipe-supplies.entity';

@Entity({ name: 'supplies' })
@UseDto(SuppliesDto)
export class SuppliesEntity extends AbstractEntity<SuppliesDto> {
  @Column({ unique: true, type: 'varchar' })
  name!: string;

  @Column({ unique: true, type: 'varchar' })
  description!: string;

  @ManyToMany(
    () => TreatmentTypeEntity,
    treatmentType => treatmentType.supplies
  )
  @JoinTable({
    name: 'supplies_treatment_types',
    joinColumn: { name: 'supplies_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'treatment_type_id',
      referencedColumnName: 'id',
    },
  })
  treatmentTypes!: TreatmentTypeEntity[];

  @ManyToOne(
    () => MeasurementUnitEntity,
    measurementUnit => measurementUnit.supplies
  )
  @JoinColumn({ name: 'measurement_unit_id' })
  measurementUnit!: MeasurementUnitEntity;

  @OneToMany(() => RecipeSuppliesEntity, (recipeSupplies) => recipeSupplies.supplies)
  recipeSupplies!: RecipeSuppliesEntity[];
}
