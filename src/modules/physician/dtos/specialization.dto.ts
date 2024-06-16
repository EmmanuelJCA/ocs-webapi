import { AbstractDto } from '../../../common/dto/abstract.dto';
import { StringField } from '../../../decorators';
import { PhysicianSpecializationEntity } from '../entities/physician-specialization.entity';

export class SpecializationDto extends AbstractDto {
  @StringField()
  name!: string;

  constructor(specialization: PhysicianSpecializationEntity) {
    super(specialization);
    this.name = specialization.name;
  }
}
