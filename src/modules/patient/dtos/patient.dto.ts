import { AbstractDto } from '../../../common/dto/abstract.dto';
import { PatientEntity } from '../entities/patient.entity';
import { DateField, EmailField, EnumField, PhoneField, StringField, StringFieldOptional } from '../../../decorators';
import { Matches } from 'class-validator';
import { Genre } from '../../../constants';

export class PatientDto extends AbstractDto {
  @StringField()
  firstName!: string;

  @StringField()
  lastName!: string;

  @EnumField(() => Genre)
  genre!: Genre;

  @StringFieldOptional()
  @Matches(/[EGJPV]-\d{8}-\d/)
  identification!: string;

  @DateField()
  dateOfBirth!: Date;

  @EmailField()
  email!: string;

  @PhoneField()
  phone!: string;

  constructor(patient: PatientEntity) {
    super(patient);
    this.firstName = patient.person.firstName;
    this.lastName = patient.person.lastName;
    this.genre = patient.person.genre;
    this.identification = patient.person.identification;
    this.dateOfBirth = patient.person.dateOfBirth;
    this.email = patient.email;
    this.phone = patient.person.phone;
  }
}
