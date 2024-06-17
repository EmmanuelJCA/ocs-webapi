import { StringField } from '../../../decorators';

export class CreateCancerTypeDto {
  @StringField()
  name!: string;

  @StringField()
  description!: string;
}
