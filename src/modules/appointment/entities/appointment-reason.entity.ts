import { Column, Entity, OneToOne } from 'typeorm';
import { UseDto } from '../../../decorators/use-dto.decorator';
import { AbstractEntity } from '../../../common/abstract.entity';
import { AppointmentEntity } from './appointment.entity';
import { AppointmentReasonDto } from '../dtos/appointment-reason.dto';

@Entity({ name: 'appointment_reasons' })
@UseDto(AppointmentReasonDto)
export class AppointmentReasonEntity extends AbstractEntity<AppointmentReasonDto> {
  @Column({ unique: true, type: 'varchar' })
  description!: string;

  @OneToOne(
    () => AppointmentEntity,
    appointment => appointment.reason,
    { nullable: false }
  )
  appointment!: AppointmentEntity;
}
