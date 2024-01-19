import {
  EmailField,
  PasswordField,
  PhoneFieldOptional,
  StringField,
} from '../../../decorators';

export class UserSignUpDto {
  @StringField()
  readonly firstName!: string;

  @StringField()
  readonly lastName!: string;

  @EmailField()
  readonly email!: string;

  @PasswordField({ minLength: 6 })
  readonly password!: string;

  @PhoneFieldOptional()
  phone?: string;
}
