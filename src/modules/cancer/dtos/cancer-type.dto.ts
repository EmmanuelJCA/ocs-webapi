import { AbstractDto } from '../../../common/dto/abstract.dto';
import { StringField } from '../../../decorators/field.decorators';
import { CancerTypeEntity } from '../entities/cancer-type.entity';

export class CancerTypeDto extends AbstractDto {
  @StringField()
  name!: string;

  @StringField()
  description!: string;

  constructor(cancerType: CancerTypeEntity) {
    super(cancerType);
    this.name = cancerType.name;
    this.description = cancerType.description;
  }
}
