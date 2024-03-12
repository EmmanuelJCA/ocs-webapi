import { Matches } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { Genre, RoleType } from '../../../constants';
import {
  DateField,
  EmailField,
  EnumField,
  PhoneField,
  StringField,
  StringFieldOptional,
} from '../../../decorators';
import { type UserEntity } from '../entities/user.entity';

export class UserDto extends AbstractDto {
  @DateField({ nullable: true })
  inactivatedAt!: Date | null;

  @StringField()
  firstName!: string;

  @StringField()
  lastName!: string;

  @StringField()
  username!: string;

  @EnumField(() => Genre)
  genre!: Genre;

  @StringFieldOptional()
  @Matches(/[EGJPV]-\d{8}-\d/)
  identification!: string;

  @DateField()
  dateOfBirth!: Date;

  @EnumField(() => RoleType)
  role!: RoleType;

  @EmailField()
  email!: string;

  @StringFieldOptional({ nullable: true })
  avatar?: string | null;

  @PhoneField()
  phone!: string;

  constructor(user: UserEntity) {
    super(user);
    this.inactivatedAt = user.inactivatedAt;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.genre = user.genre;
    this.identification = user.identification;
    this.dateOfBirth = user.dateOfBirth;
    this.role = user.role;
    this.email = user.email;
    this.avatar = user.avatar;
    this.phone = user.phone;
  }
}
