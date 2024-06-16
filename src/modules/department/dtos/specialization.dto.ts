import { AbstractDto } from '../../../common/dto/abstract.dto';
import { StringField } from '../../../decorators';
import { PhysicianSpecializationEntity } from '../../physician/entities/physician-specialization.entity';
import { PhysicianSupportSpecializationEntity } from '../../physician-support/entities/physician-support-specialization.entity';

export class SpecializationDto extends AbstractDto {
  @StringField()
  name!: string;

  constructor(specialization: PhysicianSpecializationEntity | PhysicianSupportSpecializationEntity) {
    super(specialization);
    this.name = specialization.name;
  }
}
