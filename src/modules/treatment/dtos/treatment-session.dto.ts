import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ClassField, DateField, StringField } from '../../../decorators/field.decorators';
import { TreatmentSessionEntity } from '../entities/treatment-session.entity';
import { RecipeDto } from '../../recipe/dtos/recipe.dto';
import { PhysicianSupportDto } from '../../physician-support/dtos/physician-support.dto';

export class TreatmentSessionDto extends AbstractDto {
  @StringField()
  instructions!: string;

  @DateField()
  startDateTime: Date;

  @DateField({ nullable: true })
  endDateTime: Date | null;

  @StringField()
  observations!: string;

  @ClassField(() => PhysicianSupportDto)
  physicianSupport: PhysicianSupportDto;

  @ClassField(() => RecipeDto, { each: true })
  recipes: RecipeDto[];

  constructor(session: TreatmentSessionEntity) {
    super(session);
    this.instructions = session.instructions;
    this.startDateTime = session.startDateTime;
    this.endDateTime = session.endDateTime;
    this.observations = session.observations;
    this.physicianSupport = session.physicianSupport.toDto()
    this.recipes = session.recipes.toDtos();
  }
}
