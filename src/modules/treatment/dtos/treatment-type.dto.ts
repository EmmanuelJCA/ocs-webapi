import { AbstractDto } from '../../../common/dto/abstract.dto';
import { StringField } from '../../../decorators/field.decorators';
import { TreatmentTypeEntity } from '../entities/treatment-type.entity';

export class TreatmentTypeDto extends AbstractDto {
  @StringField()
  name!: string;

  @StringField()
  description!: string;

  constructor(treatmentType: TreatmentTypeEntity) {
    super(treatmentType);
    this.name = treatmentType.name;
    this.description = treatmentType.description;
  }
}
