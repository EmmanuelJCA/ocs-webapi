import {
  BooleanFieldOptional,
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

  @BooleanFieldOptional()
  isActive?: boolean;

  inactivatedAt?: Date | null = this.isActive ? null : new Date();
}
