import { AbstractDto } from "../../../common/dto/abstract.dto";
import { DateField, StringField, ClassField } from "../../../decorators";
import { CancerStageDto } from "../../../modules/cancer/dtos/cancer-stage.dto";
import { CancerTypeDto } from "../../../modules/cancer/dtos/cancer-type.dto";
import { DiagnosticEntity } from "../entities/diagnostic.entity";


export class DiagnosticDto extends AbstractDto {
  @DateField()
  closedAt!: Date | null;

  @DateField()
  date!: Date;

  @StringField()
  notes!: string;

  @ClassField(() => CancerTypeDto)
  cancerType!: CancerTypeDto;

  @ClassField(() => CancerStageDto)
  cancerStage!: CancerStageDto;

  constructor(diagnostic: DiagnosticEntity) {
    super(diagnostic);
    this.closedAt = diagnostic.closedAt;
    this.date = diagnostic.date;
    this.notes = diagnostic.notes;
    this.cancerType = diagnostic.cancerType.toDto();
    this.cancerStage = diagnostic.cancerStage.toDto();
  }
}
