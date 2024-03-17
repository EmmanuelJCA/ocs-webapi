import { AbstractDto } from '../../../common/dto/abstract.dto';
import {
  DateField,
  EmailField,
  PhoneField,
  StringField,
} from '../../../decorators';
import { type OncologyCenterEntity } from '../entities/oncology-center.entity';

export class OncologyCenterDto extends AbstractDto {
  @StringField()
  name!: string;

  @PhoneField()
  phone!: string;

  @EmailField()
  email!: string;

  @DateField({ nullable: true })
  inactivatedAt!: Date | null;

  constructor(oncologyCenter: OncologyCenterEntity) {
    super(oncologyCenter);
    this.name = oncologyCenter.name;
    this.phone = oncologyCenter.phone;
    this.email = oncologyCenter.email;
    this.inactivatedAt = oncologyCenter.inactivatedAt;
  }
}
