import { Entity, JoinColumn, ManyToMany, OneToMany, OneToOne } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { UserEntity } from '../../user/entities/user.entity';
import { PhysicianSupportDto } from '../dtos/physician-support.dto';
import { PhysicianSupportSpecializationEntity } from './physician-support-specialization.entity';
import { TreatmentSessionEntity } from '../../treatment/entities/treatment-session.entity';

@Entity({ name: 'physician_supports' })
@UseDto(PhysicianSupportDto)
export class PhysicianSupportEntity extends AbstractEntity<PhysicianSupportDto> {
  @ManyToMany(
    () => PhysicianSupportSpecializationEntity,
    specialization => specialization.physicianSupports,
  )
  specializations!: PhysicianSupportSpecializationEntity[];

  @OneToOne(
    () => UserEntity,
    user => user.physicianSupport,
    { eager: true, nullable: false }
  )
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @OneToMany(
    () => TreatmentSessionEntity,
    session => session.physicianSupport
  )
  treatmentSessions!: TreatmentSessionEntity[];
}
