import { Genre } from '../../../constants/genre';
import { DateField, EmailField, EnumField, PasswordField, PhoneField, StringField, UUIDField } from '../../../decorators'
import { Matches, MaxDate, MinDate } from 'class-validator';
import { RoleType, RoleTypeWithoutSuperAdmin } from '../../../constants/role-type';

const currentDate = new Date();

export class CreatePhysicianSupportDto {
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

  @EnumField(() => RoleTypeWithoutSuperAdmin, { each: true })
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

  @UUIDField({ each: true, minLength: 1 })
  oncologyCentersIds!: Uuid[];

  @UUIDField({ each: true, minLength: 1 })
  specializationsIds!: Uuid[];
}
