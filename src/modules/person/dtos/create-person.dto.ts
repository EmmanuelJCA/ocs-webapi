import { Matches, MinDate, MaxDate } from 'class-validator';
import { Genre } from '../../../constants';
import { DateField, EnumField, PhoneField, StringField } from '../../../decorators';

const currentDate = new Date();

export class CreatePersonDto {
  @StringField()
  firstName!: string;

  @StringField()
  lastName!: string;

  @StringField()
  @Matches(/[EGJPV]-\d{8}/)
  identification!: string;

  @EnumField(() => Genre)
  genre!: Genre;

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
}
