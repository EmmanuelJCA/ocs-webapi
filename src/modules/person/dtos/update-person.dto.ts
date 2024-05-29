import { Matches, MinDate, MaxDate } from 'class-validator';
import { Genre } from '../../../constants';
import { StringFieldOptional, EnumFieldOptional, DateFieldOptional, PhoneFieldOptional } from '../../../decorators';

const currentDate = new Date();

export class UpdatePersonDto {
  @StringFieldOptional()
  firstName?: string;

  @StringFieldOptional()
  lastName?: string;

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
