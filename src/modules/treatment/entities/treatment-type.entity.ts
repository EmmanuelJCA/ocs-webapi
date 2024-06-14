import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { AbstractEntity } from '../../../common/abstract.entity';
import { TreatmentTypeDto } from '../dtos/treatment-type.dto';
import { DepartmentEntity } from '../../department/entities/department.entity';
import { TreatmentEntity } from './treatment.entity';
import { SuppliesEntity } from '../../supplies/entities/supplies.entity';

@Entity({ name: 'treatment_types' })
@UseDto(TreatmentTypeDto)
export class TreatmentTypeEntity extends AbstractEntity<TreatmentTypeDto> {
  @Column({ unique: true, type: 'varchar' })
  name!: string;

  @Column({ unique: true, type: 'varchar' })
  description!: string;

  @ManyToOne(
    () => DepartmentEntity,
    department => department.treatmentTypes
  )
  @JoinColumn({ name: 'department_id' })
  department!: DepartmentEntity;

  @OneToMany(
    () => TreatmentEntity,
    treatment => treatment.type
  )
  treatments!: TreatmentEntity[];

  @ManyToMany(
    () => SuppliesEntity,
    supplies => supplies.treatmentType
  )
  supplies!: SuppliesEntity[];
}
