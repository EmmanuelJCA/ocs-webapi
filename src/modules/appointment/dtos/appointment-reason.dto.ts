import { AbstractDto } from '../../../common/dto/abstract.dto';
import { StringField } from '../../../decorators/field.decorators';
import { AppointmentReasonEntity } from '../entities/appointment-reason.entity';

export class AppointmentReasonDto extends AbstractDto {
  @StringField()
  description!: string;

  constructor(reason: AppointmentReasonEntity) {
    super(reason);
    this.description = reason.description;
  }
}
