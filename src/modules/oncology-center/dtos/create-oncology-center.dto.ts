import { EmailField, PhoneField, StringField } from '../../../decorators';

export class CreateOncologyCenterDto {
  @StringField()
  name!: string;

  @PhoneField()
  phone!: string;

  @EmailField()
  email!: string;
}
