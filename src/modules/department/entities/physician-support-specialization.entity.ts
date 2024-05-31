import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UseDto } from '../../../decorators';
import { AbstractEntity } from '../../../common/abstract.entity';
import { SpecializationDto } from '../dtos';
import { DepartmentEntity } from './department.entity';

@Entity({ name: 'physician_support_specializations' })
@UseDto(SpecializationDto)
export class PhysicianSupportSpecializationEntity extends AbstractEntity<SpecializationDto> {
  @Column({ unique: true, type: 'varchar' })
  name!: string;

  @ManyToOne(
    () => DepartmentEntity,
    department => department.physicianSupportSpecialization
  )
  @JoinColumn({ name: 'department_id' })
  department!: DepartmentEntity;
}
