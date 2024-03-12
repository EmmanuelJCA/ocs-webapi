import { Column, Entity, VirtualColumn } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { Genre, RoleType } from '../../../constants';
import { UseDto } from '../../../decorators';
import { UserDto } from '../dtos/user.dto';

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ nullable: true, type: 'date' })
  inactivatedAt!: Date | null;

  @Column({ type: 'varchar' })
  firstName!: string;

  @Column({ type: 'varchar' })
  lastName!: string;

  @Column({ type: 'enum', enum: Genre })
  genre!: Genre;

  @Column({ unique: true, type: 'varchar' })
  identification!: string;

  @Column({ type: 'date' })
  dateOfBirth!: Date;

  @Column({ type: 'enum', enum: RoleType, array: true })
  roles!: RoleType[];

  @Column({ unique: true, type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({ unique: true, type: 'varchar' })
  phone!: string;

  @Column({ nullable: true, type: 'varchar' })
  avatar!: string | null;

  @VirtualColumn({
    query: (alias) =>
      `SELECT CONCAT(${alias}.first_name, ' ', ${alias}.last_name)`,
  })
  fullName!: string;
}
