import { Column, Entity, OneToOne, VirtualColumn } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { PersonDto } from '../dtos/person.dto';
import { Genre } from '../../../constants';
import { UserEntity } from '../../user/entities/user.entity';
import { PatientEntity } from '../../patient/entities/patient.entity';

@Entity({ name: 'persons' })
@UseDto(PersonDto)
export class PersonEntity extends AbstractEntity<PersonDto> {
  @Column({ type: 'varchar' })
  firstName!: string;

  @Column({ type: 'varchar' })
  lastName!: string;

  @VirtualColumn({
    query: (alias) =>
      `SELECT CONCAT(${alias}.first_name, ' ', ${alias}.last_name)`,
  })
  fullName!: string;

  @Column({ type: 'enum', enum: Genre })
  genre!: Genre;

  @Column({ unique: true, type: 'varchar' })
  identification!: string;

  @Column({ type: 'date' })
  dateOfBirth!: Date;

  @Column({ unique: true, type: 'varchar' })
  phone!: string;

  @OneToOne(() => UserEntity, user => user.person)
  user!: UserEntity | null;

  @OneToOne(() => PatientEntity, patient => patient.person, { nullable: false })
  patient!: PatientEntity;
}
