import { AbstractDto } from '../../../common/dto/abstract.dto';
import { StringField } from '../../../decorators';
import { SpecializationEntity } from '../entities';

export class SpecializationDto extends AbstractDto {
  @StringField()
  name!: string;

  constructor(specialization: SpecializationEntity) {
    super(specialization);
    this.name = specialization.name;
  }
}
