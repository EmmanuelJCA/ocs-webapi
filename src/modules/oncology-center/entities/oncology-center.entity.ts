import { Column, Entity, ManyToMany, OneToOne } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { UserEntity } from '../../user/entities/user.entity';
import { OncologyCenterDto } from '../dtos/oncology-center.dto';
import { AppointmentEntity } from '../../appointment/entities/appointment.entity';

@Entity({ name: 'oncology_centers' })
@UseDto(OncologyCenterDto)
export class OncologyCenterEntity extends AbstractEntity<OncologyCenterDto> {
  @Column({ nullable: true, type: 'date' })
  inactivatedAt!: Date | null;

  @Column({ unique: true, type: 'varchar' })
  name!: string;

  @Column({ unique: true, type: 'varchar' })
  phone!: string;

  @Column({ unique: true, type: 'varchar' })
  email!: string;

  @Column({ nullable: true, type: 'varchar' })
  website!: string | null;

  @ManyToMany(() => UserEntity, (user) => user.oncologyCenters)
  users!: UserEntity[];

  @OneToOne(
    () => AppointmentEntity,
    appointment => appointment.oncologyCenter,
    { nullable: false }
  )
  appointment!: AppointmentEntity;
}
