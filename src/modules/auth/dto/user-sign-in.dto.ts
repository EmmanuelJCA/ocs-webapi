import { EmailField, StringField } from '../../../decorators';

export class UserSignInDto {
  @EmailField()
  readonly email!: string;

  @StringField()
  readonly password!: string;
}
