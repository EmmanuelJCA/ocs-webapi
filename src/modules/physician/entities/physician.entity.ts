import { Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { UserEntity } from '../../user/entities/user.entity';
import { PhysicianDto } from '../dtos/physician.dto';
import { PhysicianSpecializationEntity } from '../../department/entities/physician-specialization.entity';

@Entity({ name: 'physicians' })
@UseDto(PhysicianDto)
export class PhysicianEntity extends AbstractEntity<PhysicianDto> {
  @ManyToMany(
    () => PhysicianSpecializationEntity,
    physicianSpecialization => physicianSpecialization.physicians,
  )
  physicianSpecialization!: PhysicianSpecializationEntity[];

  @OneToOne(
    () => UserEntity,
    user => user.physician,
    { eager: true, nullable: false }
  )
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;
}
