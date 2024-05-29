import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { RoleType } from '../../../constants';
import { UseDto } from '../../../decorators';
import { OncologyCenterEntity } from '../../oncology-center/entities/oncology-center.entity';
import { UserDto } from '../dtos/user.dto';
import { PersonEntity } from '../../person/entities/person.entity';

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ nullable: true, type: 'date' })
  inactivatedAt!: Date | null;

  @Column({ unique: true, type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'enum', enum: RoleType, array: true })
  roles!: RoleType[];

  @Column({ nullable: true, type: 'varchar' })
  avatar!: string | null;

  @OneToOne(
    () => PersonEntity,
    person => person.user,
    { eager: true, nullable: false, cascade: true }
  )
  @JoinColumn({ name: 'person_id' })
  person!: PersonEntity;

  @ManyToMany(
    () => OncologyCenterEntity,
    (oncologyCenter) => oncologyCenter.users,
  )
  @JoinTable({
    name: 'users_oncology_centers',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'oncology_center_id',
      referencedColumnName: 'id',
    },
  })
  oncologyCenters!: OncologyCenterEntity[];
}
