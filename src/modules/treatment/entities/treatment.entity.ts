import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { TreatmentTypeEntity } from './treatment-type.entity';
import { OncologyCenterEntity } from '../../oncology-center/entities/oncology-center.entity';
import { PhysicianEntity } from '../../physician/entities/physician.entity';
import { DiagnosticEntity } from '../../diagnostic/entities/diagnostic.entity';
import { TreatmentDto } from '../dtos/treatment.dto';
import { TreatmentResult } from '../../../constants/treatment-result';
import { TreatmentSessionEntity } from './treatment-session.entity';

@Entity({ name: 'treatments' })
@UseDto(TreatmentDto)
export class TreatmentEntity extends AbstractEntity<TreatmentDto> {
  @Column({ unique: true, type: 'varchar' })
  instructions!: string;

  @Column({ type: 'timestamp' })
  startDateTime!: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDateTime!: Date | null;

  @Column({ type: 'enum', enum: TreatmentResult, nullable: true })
  result!: TreatmentResult | null;

  @Column({ type: 'varchar', nullable: true })
  resultNotes!: string | null;

  @ManyToOne(
    () => TreatmentTypeEntity,
    treatmentType => treatmentType.treatments,
  )
  @JoinColumn({ name: 'treatment_type_id' })
  type!: TreatmentTypeEntity;

  @ManyToOne(
    () => OncologyCenterEntity,
    oncologyCenter => oncologyCenter.treatments,
  )
  @JoinColumn({ name: 'oncology_center_id' })
  oncologyCenter!: OncologyCenterEntity;

  @ManyToOne(
    () => PhysicianEntity,
    physician => physician.treatments,
  )
  @JoinColumn({ name: 'physician_id' })
  physician!: PhysicianEntity;

  @ManyToMany(
    () => DiagnosticEntity,
    diagnostic => diagnostic.treatments,
  )
  diagnostics!: DiagnosticEntity[];

  @OneToMany(
    () => TreatmentSessionEntity,
    session => session.treatment,
  )
  sessions!: TreatmentSessionEntity[];
}
