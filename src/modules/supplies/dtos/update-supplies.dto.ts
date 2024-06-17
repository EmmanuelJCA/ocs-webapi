import { StringFieldOptional, UUIDFieldOptional } from '../../../decorators';

export class UpdateSuppliesDto {
  @StringFieldOptional()
  name?: string;

  @StringFieldOptional()
  description?: string;

  @UUIDFieldOptional({ each: true })
  treatmentTypesIds?: Uuid[];

  @UUIDFieldOptional()
  measurementUnitId?: Uuid;
}
