import {
  DateFieldOptional,
  EmailFieldOptional,
  PhoneFieldOptional,
  StringFieldOptional,
} from '../../../decorators';

export class UpdateOncologyCenterDto {
  @StringFieldOptional()
  name?: string;

  @PhoneFieldOptional()
  phone?: string;

  @EmailFieldOptional()
  email?: string;

  @DateFieldOptional({ nullable: true })
  inactivatedAt?: Date | null;
}
