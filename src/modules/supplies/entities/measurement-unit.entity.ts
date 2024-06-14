import { Entity, Column, OneToMany } from 'typeorm';
import { SuppliesEntity } from './supplies.entity';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { AbstractEntity } from '../../../common/abstract.entity';
import { MeasurementUnitDto } from '../dtos/measurement-unit.dto';

@Entity({ name: 'measurement_units' })
@UseDto(MeasurementUnitDto)
export class MeasurementUnitEntity extends AbstractEntity<MeasurementUnitDto> {
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @Column({ type: 'varchar', unique: true })
  abbreviation!: string;

  @OneToMany(
    () => SuppliesEntity,
    supplies => supplies.measurementUnit
  )
  supplies!: SuppliesEntity[];
}
