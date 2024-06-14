import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { AbstractEntity } from '../../../common/abstract.entity';
import { PatientEntity } from '../../patient/entities/patient.entity';
import { PhysicianEntity } from '../../physician/entities/physician.entity';
import { AppointmentReasonEntity } from './appointment-reason.entity';
import { AppointmentDto } from '../dtos/appointment.dto';
import { OncologyCenterEntity } from '../../oncology-center/entities/oncology-center.entity';
import { DiagnosticEntity } from '../../diagnostic/entities/diagnostic.entity';

@Entity({ name: 'appointments' })
@UseDto(AppointmentDto)
export class AppointmentEntity extends AbstractEntity<AppointmentDto> {
  @Column({ unique: true, type: 'varchar' })
  notes!: string;

  @Column({ type: 'timestamp' })
  startDateTime!: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDateTime?: Date;

  @ManyToMany(
    () => AppointmentReasonEntity,
    reason => reason.appointment,
  )
  reasons!: AppointmentReasonEntity[];

  @ManyToOne(
    () => OncologyCenterEntity,
    oncologyCenter => oncologyCenter.appointments,
    { eager: true, nullable: false, cascade: true }
  )
  @JoinColumn({ name: 'oncology_center_id' })
  oncologyCenter!: OncologyCenterEntity;

  @OneToOne(
    () => PatientEntity,
    patient => patient.appointment,
    { eager: true, nullable: false, cascade: true }
  )
  @JoinColumn({ name: 'patient_id' })
  patient!: PatientEntity;

  @OneToOne(
    () => PhysicianEntity,
    physician => physician.appointments,
    { eager: true, nullable: false, cascade: true }
  )
  @JoinColumn({ name: 'physician_id' })
  physician!: PhysicianEntity;

  @OneToMany(
    () => DiagnosticEntity,
    diagnostic => diagnostic.appointment,
    { eager: true }
  )
  diagnostics!: DiagnosticEntity[];

  @ManyToMany(
    () => DiagnosticEntity,
    diagnostic => diagnostic.monitoringAppointments,
    { eager: true }
  )
  monitoredDiagnostics!: DiagnosticEntity[];
}
