import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { AbstractEntity } from '../../../common/abstract.entity';
import { AppointmentEntity } from './appointment.entity';
import { AppointmentReasonDto } from '../dtos/appointment-reason.dto';

@Entity({ name: 'appointment_reasons' })
@UseDto(AppointmentReasonDto)
export class AppointmentReasonEntity extends AbstractEntity<AppointmentReasonDto> {
  @Column({ unique: true, type: 'varchar' })
  description!: string;

  @ManyToMany(
    () => AppointmentEntity,
    appointment => appointment.reasons,
    { nullable: false }
  )
  @JoinTable({
    name: 'appointment_reasons_appointments',
    joinColumn: { name: 'appointment_reasons_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'appointments_id',
      referencedColumnName: 'id',
    },
  })
  appointment!: AppointmentEntity[];
}
