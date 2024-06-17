import { StringFieldOptional } from '../../../decorators';

export class UpdateCancerTypeDto {
  @StringFieldOptional()
  name?: string;

  @StringFieldOptional()
  description?: string;
}
