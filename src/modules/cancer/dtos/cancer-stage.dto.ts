import { AbstractDto } from '../../../common/dto/abstract.dto';
import { NumberField, StringField } from '../../../decorators/field.decorators';
import { CancerStageEntity } from '../entities/cancer-stage.entity';

export class CancerStageDto extends AbstractDto {
  @NumberField()
  level!: number;

  @StringField()
  name!: string;

  @StringField()
  description!: string;

  constructor(cancerStage: CancerStageEntity) {
    super(cancerStage);
    this.level = cancerStage.level;
    this.name = cancerStage.name;
    this.description = cancerStage.description;
  }
}
