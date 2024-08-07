import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ClassField, DateField, EnumField, NumberField, StringField } from '../../../decorators/field.decorators';
import { TreatmentEntity } from '../entities/treatment.entity';
import { TreatmentTypeDto } from './treatment-type.dto';
import { OncologyCenterDto } from '../../oncology-center/dtos/oncology-center.dto';
import { PhysicianDto } from '../../physician/dtos/physician.dto';
import { DiagnosticDto } from '../../diagnostic/dtos/diagnostic.dto';
import { TreatmentResult } from '../../../constants/treatment-result';
import { PatientDto } from '../../patient/dtos/patient.dto';

export class TreatmentDto extends AbstractDto {
  @StringField()
  instructions: string;

  @DateField()
  startDateTime: Date;

  @DateField({ nullable: true })
  endDateTime: Date | null;

  @EnumField(() => TreatmentResult)
  result: TreatmentResult | null;

  @StringField({ nullable: true })
  resultNotes: string | null;

  @ClassField(() => TreatmentTypeDto)
  type: TreatmentTypeDto;

  @ClassField(() => OncologyCenterDto)
  oncologyCenter: OncologyCenterDto;

  @ClassField(() => PhysicianDto)
  physician: PhysicianDto;

  @ClassField(() => PatientDto)
  patient: PatientDto;

  @ClassField(() => DiagnosticDto, { each: true })
  diagnostics: DiagnosticDto[];

  @NumberField()
  sessions: number;

  constructor(treatment: TreatmentEntity) {
    super(treatment);
    this.instructions = treatment.instructions;
    this.startDateTime = treatment.startDateTime;
    this.endDateTime = treatment.endDateTime;
    this.result = treatment.result;
    this.resultNotes = treatment.resultNotes;
    this.type = treatment.type.toDto();
    this.oncologyCenter = treatment.oncologyCenter.toDto();
    this.physician = treatment.physician.toDto();
    this.patient = treatment.diagnostics[0].appointment.patient.toDto();
    this.diagnostics = treatment.diagnostics.toDtos();
    this.sessions = treatment.sessions.length;
  }
}
