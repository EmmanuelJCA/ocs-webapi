import { Matches, MaxDate, MinDate } from 'class-validator';
import { Genre } from '../../../constants';
import { DateFieldOptional, EmailFieldOptional, EnumFieldOptional, PasswordFieldOptional, PhoneFieldOptional, StringFieldOptional } from '../../../decorators';

const currentDate = new Date();

export class UpdatePatientDto {
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
}
