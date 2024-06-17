import { Genre } from '../../../constants/genre';
import { DateField, EmailField, EnumField, PasswordField, PhoneField, StringField, UUIDField } from '../../../decorators'
import { Matches, MaxDate, MinDate } from 'class-validator';
import { RoleType } from '../../../constants/role-type';
import { Transform } from 'class-transformer';

const currentDate = new Date();

export class CreatePhysicianDto {
  @StringField()
  firstName!: string;

  @StringField()
  lastName!: string;

  @EmailField()
  email!: string;

  @PasswordField({ minLength: 6 })
  password!: string;

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

  @Transform(({ value }: { value: string }) => (value ? value.split(',') : []))
  @UUIDField({ each: true, minLength: 1 })
  specializationsIds!: Uuid[];
}
