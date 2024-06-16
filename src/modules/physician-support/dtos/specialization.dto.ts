import { AbstractDto } from '../../../common/dto/abstract.dto';
import { StringField } from '../../../decorators';
import { PhysicianSupportSpecializationEntity } from '../entities/physician-support-specialization.entity';

export class SpecializationDto extends AbstractDto {
  @StringField()
  name!: string;

  constructor(specialization: PhysicianSupportSpecializationEntity) {
    super(specialization);
    this.name = specialization.name;
  }
}
