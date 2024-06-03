import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { UseDto } from '../../../decorators';
import { AbstractEntity } from '../../../common/abstract.entity';
import { SpecializationDto } from '../dtos';
import { DepartmentEntity } from './department.entity';
import { PhysicianSupportEntity } from '../../physician-support/entities/physician-support.entity';

@Entity({ name: 'physician_support_specializations' })
@UseDto(SpecializationDto)
export class PhysicianSupportSpecializationEntity extends AbstractEntity<SpecializationDto> {
  @Column({ unique: true, type: 'varchar' })
  name!: string;

  @ManyToMany(
    () => PhysicianSupportEntity,
    physicianSupport => physicianSupport.specializations,
  )
  @JoinTable({
    name: 'physician_supports_specializations_physician_supports',
    joinColumn: { name: 'physician_support_specialization_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'physician_support_id',
      referencedColumnName: 'id',
    },
  })
  physicianSupports!: PhysicianSupportEntity[];

  @ManyToOne(
    () => DepartmentEntity,
    department => department.physicianSupportSpecialization
  )
  @JoinColumn({ name: 'department_id' })
  department!: DepartmentEntity;
}
