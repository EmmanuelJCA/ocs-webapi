import { AbstractDto } from '../../../common/dto/abstract.dto';
import { StringField } from '../../../decorators/field.decorators';
import { MeasurementUnitEntity } from '../entities/measurement-unit.entity';

export class MeasurementUnitDto extends AbstractDto {
  @StringField()
  name!: string;

  @StringField()
  abbreviation!: string;

  constructor(treatmentType: MeasurementUnitEntity) {
    super(treatmentType);
    this.name = treatmentType.name;
    this.abbreviation = treatmentType.abbreviation;
  }
}
