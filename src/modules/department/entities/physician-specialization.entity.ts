import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { UseDto } from '../../../decorators';
import { AbstractEntity } from '../../../common/abstract.entity';
import { SpecializationDto } from '../dtos';
import { DepartmentEntity } from './department.entity';
import { PhysicianEntity } from '../../physician/entities/physician.entity';

@Entity({ name: 'physician_specialization' })
@UseDto(SpecializationDto)
export class PhysicianSpecializationEntity extends AbstractEntity<SpecializationDto> {
  @Column({ unique: true, type: 'varchar' })
  name!: string;

  @ManyToMany(
    () => PhysicianEntity,
    physician => physician.specialization,
  )
  @JoinTable({
    name: 'physicians_specializations_physicians',
    joinColumn: { name: 'physician_specialization_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'physician_id',
      referencedColumnName: 'id',
    },
  })
  physicians!: PhysicianEntity[];

  @ManyToOne(
    () => DepartmentEntity,
    department => department.physicianSpecializations
  )
  @JoinColumn({ name: 'department_id' })
  department!: DepartmentEntity;
}
