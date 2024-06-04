import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { PatientDto } from '../dtos/patient.dto';
import { PersonEntity } from '../../person/entities/person.entity';
import { AppointmentEntity } from '../../appointment/entities/appointment.entity';

@Entity({ name: 'patients' })
@UseDto(PatientDto)
export class PatientEntity extends AbstractEntity<PatientDto> {
  @Column({ unique: true, type: 'varchar' })
  email!: string;

  @OneToOne(
    () => PersonEntity,
    person => person.patient,
    { eager: true, nullable: false, cascade: true }
  )
  @JoinColumn({ name: 'person_id' })
  person!: PersonEntity;

  @OneToOne(
    () => AppointmentEntity,
    appointment => appointment.patient,
    { nullable: false }
  )
  appointment!: AppointmentEntity;
}
