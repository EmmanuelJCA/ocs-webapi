import { Matches } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { Genre, RoleType } from '../../../constants';
import {
  ClassField,
  DateField,
  EmailField,
  EnumField,
  PhoneField,
  S3UrlParser,
  StringField,
  StringFieldOptional,
} from '../../../decorators';
import { OncologyCenterDto } from '../../oncology-center/dtos/oncology-center.dto';
import { type UserEntity } from '../entities/user.entity';

export class UserDto extends AbstractDto {
  @DateField({ nullable: true })
  inactivatedAt!: Date | null;

  @StringField()
  firstName!: string;

  @StringField()
  lastName!: string;

  @EnumField(() => Genre)
  genre!: Genre;

  @StringFieldOptional()
  @Matches(/[EGJPV]-\d{8}-\d/)
  identification!: string;

  @DateField()
  dateOfBirth!: Date;

  @EnumField(() => RoleType, { each: true })
  roles!: RoleType[];

  @EmailField()
  email!: string;

  @StringFieldOptional({ nullable: true })
  @S3UrlParser()
  avatar?: string | null;

  @PhoneField()
  phone!: string;

  @ClassField(() => OncologyCenterDto, { isArray: true })
  oncologyCenters?: OncologyCenterDto[];

  constructor(user: UserEntity) {
    super(user);
    this.inactivatedAt = user.inactivatedAt;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.genre = user.genre;
    this.identification = user.identification;
    this.dateOfBirth = user.dateOfBirth;
    this.roles = user.roles;
    this.email = user.email;
    this.avatar = user.avatar;
    this.phone = user.phone;
    this.oncologyCenters = user.oncologyCenters;
  }
}
