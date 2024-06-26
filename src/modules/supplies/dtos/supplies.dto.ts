import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ClassField, StringField } from '../../../decorators/field.decorators';
import { SuppliesEntity } from '../entities/supplies.entity';
import { TreatmentTypeDto } from '../../treatment/dtos/treatment-type.dto';
import { MeasurementUnitDto } from './measurement-unit.dto';

export class SuppliesDto extends AbstractDto {
  @StringField()
  name!: string;

  @StringField()
  description!: string;

  @ClassField(() => TreatmentTypeDto, { isArray: true })
  treatmentTypes!: TreatmentTypeDto[];

  @ClassField(() => MeasurementUnitDto)
  measurementUnit!: MeasurementUnitDto;

  constructor(supplies: SuppliesEntity) {
    super(supplies);
    this.name = supplies.name;
    this.description = supplies.description;
    this.treatmentTypes = supplies.treatmentTypes;
    this.measurementUnit = supplies.measurementUnit;
  }
}
