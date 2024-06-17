import { StringField, UUIDField } from '../../../decorators';

export class CreateSuppliesDto {
  @StringField()
  name!: string;

  @StringField()
  description!: string;

  @UUIDField({ each: true })
  treatmentTypesIds!: Uuid[];

  @UUIDField()
  measurementUnitId!: Uuid;
}
