import { Matches, MaxDate, MinDate } from 'class-validator';

import { Genre, RoleType, RoleTypeWithoutSuperAdmin } from '../../../constants';
import {
  DateFieldOptional,
  EmailFieldOptional,
  EnumFieldOptional,
  PasswordFieldOptional,
  PhoneFieldOptional,
  StringFieldOptional,
} from '../../../decorators';

const currentDate = new Date();

export class UpdateUserDto {
  @StringFieldOptional()
  readonly firstName?: string;

  @StringFieldOptional()
  readonly lastName?: string;

  @EmailFieldOptional()
  readonly email?: string;

  @PasswordFieldOptional({ minLength: 6 })
  readonly password?: string;

  @StringFieldOptional()
  @Matches(/[EGJPV]-\d{8}/)
  identification?: string;

  @EnumFieldOptional(() => Genre)
  genre?: Genre;

  @EnumFieldOptional(() => RoleTypeWithoutSuperAdmin)
  role?: RoleType;

  @DateFieldOptional()
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
  dateOfBirth?: Date;

  @PhoneFieldOptional()
  phone?: string;

  @DateFieldOptional()
  inactivatedAt?: Date | null = null;
}
