import { AbstractDto } from '../../../common/dto/abstract.dto';
import { StringField } from '../../../decorators';
import { PhysicianSpecializationEntity, PhysicianSupportSpecializationEntity } from '../entities';

export class SpecializationDto extends AbstractDto {
  @StringField()
  name!: string;

  constructor(specialization: PhysicianSpecializationEntity | PhysicianSupportSpecializationEntity) {
    super(specialization);
    this.name = specialization.name;
  }
}
