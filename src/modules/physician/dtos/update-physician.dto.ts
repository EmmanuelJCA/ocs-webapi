import { Transform } from 'class-transformer';
import { Matches, MaxDate, MinDate } from 'class-validator';

import {
  Genre,
  RoleType,
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

export class UpdatePhysicianDto {
  @StringFieldOptional()
  firstName?: string;

  @StringFieldOptional()
  lastName?: string;

  @EmailFieldOptional()
  email?: string;

  @PasswordFieldOptional({ minLength: 6 })
  password?: string;

  @StringFieldOptional()
  @Matches(/[EGJPV]-\d{8}/)
  identification?: string;

  @EnumFieldOptional(() => Genre)
  genre?: Genre;

  @Transform(({ value }: { value: string }) => (value ? value.split(',') : []))
  @EnumFieldOptional(() => RoleType, { each: true })
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

  @Transform(({ value }: { value: string }) => (value ? value.split(',') : []))
  @UUIDFieldOptional({ each: true, minLength: 1 })
  oncologyCentersIds!: Uuid[];

  @Transform(({ value }: { value: string }) => (value ? value.split(',') : []))
  @UUIDFieldOptional({ each: true, minLength: 1 })
  specializationsIds!: Uuid[];
}
