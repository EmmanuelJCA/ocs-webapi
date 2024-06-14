import { Entity, JoinColumn, ManyToMany, OneToMany, OneToOne } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { UserEntity } from '../../user/entities/user.entity';
import { PhysicianDto } from '../dtos/physician.dto';
import { PhysicianSpecializationEntity } from '../../department/entities/physician-specialization.entity';
import { AppointmentEntity } from '../../appointment/entities/appointment.entity';
import { TreatmentEntity } from '../../treatment/entities/treatment.entity';

@Entity({ name: 'physicians' })
@UseDto(PhysicianDto)
export class PhysicianEntity extends AbstractEntity<PhysicianDto> {
  @ManyToMany(
    () => PhysicianSpecializationEntity,
    specialization => specialization.physicians,
  )
  specialization!: PhysicianSpecializationEntity[];

  @OneToOne(
    () => UserEntity,
    user => user.physician,
    { eager: true, nullable: false }
  )
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @OneToMany(
    () => AppointmentEntity,
    appointment => appointment.physician
  )
  appointments!: AppointmentEntity[];

  @OneToMany(
    () => TreatmentEntity,
    treatment => treatment.physician
  )
  treatments!: TreatmentEntity[];
}
