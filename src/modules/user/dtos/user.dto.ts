import { Matches, ValidateNested } from 'class-validator';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { Genre, RoleType } from '../../../constants';
import {
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
import { Type } from 'class-transformer';
import { ApiProperty, OmitType } from '@nestjs/swagger';

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

  @ApiProperty({ type: () => [OmitType(OncologyCenterDto, ['users'] as const)] })
  @Type(() => OmitType(OncologyCenterDto, ['users'] as const))
  @ValidateNested()
  oncologyCenters?: Omit<OncologyCenterDto, 'users'>[];

  constructor(user: UserEntity) {
    super(user);
    this.inactivatedAt = user.inactivatedAt;
    this.firstName = user.person.firstName;
    this.lastName = user.person.lastName;
    this.genre = user.person.genre;
    this.identification = user.person.identification;
    this.dateOfBirth = user.person.dateOfBirth;
    this.roles = user.roles;
    this.email = user.email;
    this.avatar = user.avatar;
    this.phone = user.person.phone;
    this.oncologyCenters = user.oncologyCenters;
  }
}
