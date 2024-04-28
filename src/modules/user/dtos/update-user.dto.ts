import { Matches, MaxDate, MinDate } from 'class-validator';

import {
  Genre,
  type RoleType,
  RoleTypeWithoutSuperAdmin,
} from '../../../constants';
import {
  BooleanFieldOptional,
  DateFieldOptional,
  EmailFieldOptional,
  EnumFieldOptional,
  PasswordFieldOptional,
  PhoneFieldOptional,
  StringFieldOptional,
  UUIDFieldOptional,
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

  @EnumFieldOptional(() => RoleTypeWithoutSuperAdmin, { each: true })
  roles?: RoleType[];

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

  @BooleanFieldOptional()
  isActive?: boolean;

  inactivatedAt?: Date | null = this.isActive ? null : new Date();

  @UUIDFieldOptional({ each: true, minLength: 1 })
  oncologyCentersIds!: string[];
}
