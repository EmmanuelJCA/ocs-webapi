import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { AppointmentEntity } from '../../appointment/entities/appointment.entity';
import { CancerTypeEntity } from '../../cancer/entities/cancer-type.entity';
import { CancerStageEntity } from '../../cancer/entities/cancer-stage.entity';
import { DiagnosticDto } from '../dtos/diagnostic.dto';

@Entity({ name: 'diagnostics' })
@UseDto(DiagnosticDto)
export class DiagnosticEntity extends AbstractEntity<DiagnosticDto> {
  @Column({ type: 'timestamp', nullable: true })
  closedAt!: Date | null;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ type: 'varchar' })
  notes!: string;

  @ManyToOne(
    () => AppointmentEntity,
    appointment => appointment.diagnostics,
    { nullable: false }
  )
  @JoinColumn({ name: 'appointment_id' })
  appointment!: AppointmentEntity;

  @ManyToOne(
    () => CancerTypeEntity,
    cancerType => cancerType.diagnostics,
    { eager: true, nullable: false }
  )
  @JoinColumn({ name: 'cancer_type_id' })
  cancerType!: CancerTypeEntity;

  @ManyToOne(
    () => CancerStageEntity,
    cancerStage => cancerStage.diagnostics,
    { eager: true, nullable: false }
  )
  @JoinColumn({ name: 'cancer_stage_id' })
  cancerStage!: CancerStageEntity;

  @ManyToMany(
    () => AppointmentEntity,
    appointment => appointment.monitoredDiagnostics,
  )
  @JoinTable({
    name: 'diagnostics_appointments',
    joinColumn: { name: 'diagnostic_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'appointment_id',
      referencedColumnName: 'id',
    },
  })
  monitoringAppointments!: AppointmentEntity[];
}
