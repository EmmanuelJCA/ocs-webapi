import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UseDto } from '../../../decorators';
import { AbstractEntity } from '../../../common/abstract.entity';
import { SpecializationDto } from '../dtos';
import { DepartmentEntity } from './department.entity';

@Entity({ name: 'physician_specialization' })
@UseDto(SpecializationDto)
export class PhysicianSpecializationEntity extends AbstractEntity<SpecializationDto> {
  @Column({ unique: true, type: 'varchar' })
  name!: string;

  // @ManyToMany(
  //   () => PhysicianEntity,
  //   physician => physician.specializations
  // )
  // physicians!: PhysicianEntity[];

  @ManyToOne(
    () => DepartmentEntity,
    department => department.physicianSpecializations
  )
  @JoinColumn({ name: 'department_id' })
  department!: DepartmentEntity;
}
