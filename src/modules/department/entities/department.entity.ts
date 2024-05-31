import { Column, Entity, OneToMany } from 'typeorm';
import { UseDto } from '../../../decorators';
import { AbstractEntity } from '../../../common/abstract.entity';
import { DepartmentDto } from '../dtos';
import { PhysicianSupportSpecializationEntity } from './physician-support-specialization.entity';
import { PhysicianSpecializationEntity } from './physician-specialization.entity';

@Entity({ name: 'departments' })
@UseDto(DepartmentDto)
export class DepartmentEntity extends AbstractEntity<DepartmentDto> {
  @Column({ unique: true, type: 'varchar' })
  name!: string;

  @OneToMany(
    () => PhysicianSpecializationEntity,
    physicianSpecialization => physicianSpecialization.department,
    { eager: true, nullable: false }
  )
  physicianSpecializations!: PhysicianSpecializationEntity[];

  @OneToMany(
    () => PhysicianSupportSpecializationEntity,
    physicianSupportSpecialization => physicianSupportSpecialization.department,
    { eager: true, nullable: false }
  )
  physicianSupportSpecialization!: PhysicianSupportSpecializationEntity[];
}
