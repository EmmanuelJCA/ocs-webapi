import { UserDto } from '../../user/dtos/user.dto';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import {
  ClassField,
  DateField,
  EmailField,
  PhoneField,
  StringField,
} from '../../../decorators';
import { type OncologyCenterEntity } from '../entities/oncology-center.entity';
import { OmitType } from '@nestjs/swagger';

export class OncologyCenterDto extends AbstractDto {
  @StringField()
  name!: string;

  @PhoneField()
  phone!: string;

  @EmailField()
  email!: string;

  @DateField({ nullable: true })
  inactivatedAt!: Date | null;

  @ClassField(() => OmitType(UserDto, ['oncologyCenters'] as const), { isArray: true })
  users?: Omit<UserDto, 'oncologyCenters'>[];

  constructor(oncologyCenter: OncologyCenterEntity) {
    super(oncologyCenter);
    this.name = oncologyCenter.name;
    this.phone = oncologyCenter.phone;
    this.email = oncologyCenter.email;
    this.inactivatedAt = oncologyCenter.inactivatedAt;
    this.users = oncologyCenter.users?.map((user) => new UserDto(user));
  }
}
