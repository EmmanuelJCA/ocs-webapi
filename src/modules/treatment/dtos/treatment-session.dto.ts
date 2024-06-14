import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ClassField, DateField, StringField } from '../../../decorators/field.decorators';
import { TreatmentSessionEntity } from '../entities/treatment-session.entity';
import { RecipeDto } from '../../recipe/dtos/recipe.dto';

export class TreatmentSessionDto extends AbstractDto {
  @StringField()
  instructions!: string;

  @DateField()
  startDateTime: Date;

  @DateField({ nullable: true })
  endDateTime: Date | null;

  @StringField()
  observations!: string;

  @ClassField(() => RecipeDto, { each: true })
  recipes: RecipeDto[];

  constructor(treatmentType: TreatmentSessionEntity) {
    super(treatmentType);
    this.instructions = treatmentType.instructions;
    this.startDateTime = treatmentType.startDateTime;
    this.endDateTime = treatmentType.endDateTime;
    this.observations = treatmentType.observations;
    this.recipes = treatmentType.recipes.toDtos();
  }
}
