import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ClassField, StringField } from '../../../decorators/field.decorators';
import { RecipeEntity } from '../entities/recipe.entity';
import { SuppliesEntity } from '../../supplies/entities/supplies.entity';
import { TreatmentSessionDto } from '../../treatment/dtos/treatment-session.dto';

export class RecipeDto extends AbstractDto {
  @StringField()
  instructions!: string;

  @ClassField(() => SuppliesEntity, { each: true } )
  supplies: SuppliesEntity[];

  @ClassField(() => TreatmentSessionDto, { each: true })
  sessions: TreatmentSessionDto[];

  constructor(treatmentType: RecipeEntity) {
    super(treatmentType);
    this.instructions = treatmentType.instructions;
    this.supplies = treatmentType.supplies;
    this.sessions = treatmentType.treatmentSessions.toDtos();
  }
}
