import { Matches, MaxDate, MinDate } from 'class-validator';

import {
  Genre,
  RoleType,
} from '../../../constants';
import {
  DateField,
  EmailField,
  EnumField,
  PasswordField,
  PhoneField,
  StringField,
  UUIDField,
} from '../../../decorators';
import { Transform } from 'class-transformer';

const currentDate = new Date();

export class CreateUserDto {
  @StringField()
  readonly firstName!: string;

  @StringField()
  readonly lastName!: string;

  @EmailField()
  readonly email!: string;

  @PasswordField({ minLength: 6 })
  readonly password!: string;

  @StringField()
  @Matches(/[EGJPV]-\d{8}/)
  identification!: string;

  @EnumField(() => Genre)
  genre!: Genre;

  @Transform(({ value }: { value: string }) => (value ? value.split(',') : []))
  @EnumField(() => RoleType, { each: true })
  roles!: RoleType[];

  @DateField()
  @MinDate(
    new Date(
      currentDate.getFullYear() - 86,
      currentDate.getMonth(),
      currentDate.getDate(),
    ),
  )
  @MaxDate(
    new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate(),
    ),
  )
  dateOfBirth!: Date;

  @PhoneField()
  phone!: string;

  @Transform(({ value }: { value: string }) => (value ? value.split(',') : []))
  @UUIDField({ each: true, minLength: 1 })
  oncologyCentersIds!: Uuid[];
}
