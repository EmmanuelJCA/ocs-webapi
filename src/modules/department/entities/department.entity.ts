import { Column, Entity, OneToMany } from 'typeorm';
import { UseDto } from '../../../decorators';
import { AbstractEntity } from '../../../common/abstract.entity';
import { DepartmentDto } from '../dtos';
import { SpecializationEntity } from './specialization.entity';

@Entity({ name: 'departments' })
@UseDto(DepartmentDto)
export class DepartmentEntity extends AbstractEntity<DepartmentDto> {
  @Column({ unique: true, type: 'varchar' })
  name!: string;

  @OneToMany(
    () => SpecializationEntity,
    specialization => specialization.department,
    { eager: true, nullable: false }
  )
  specializations!: SpecializationEntity[];
}
