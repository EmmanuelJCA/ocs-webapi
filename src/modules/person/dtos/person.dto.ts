import { AbstractDto } from '../../../common/dto/abstract.dto';
import { PersonEntity } from '../entities/person.entity';
import { DateField, EnumField, PhoneField, StringField, StringFieldOptional } from '../../../decorators';
import { Matches } from 'class-validator';
import { Genre } from '../../../constants';

export class PersonDto extends AbstractDto {
  @StringField()
  firstName!: string;

  @StringField()
  lastName!: string;

  @StringField()
  fullName!: string;

  @EnumField(() => Genre)
  genre!: Genre;

  @StringFieldOptional()
  @Matches(/[EGJPV]-\d{8}-\d/)
  identification!: string;

  @DateField()
  dateOfBirth!: Date;

  @PhoneField()
  phone!: string;

  constructor(person: PersonEntity) {
    super(person);
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.fullName = person.fullName;
    this.genre = person.genre;
    this.identification = person.identification;
    this.dateOfBirth = person.dateOfBirth;
    this.phone = person.phone;
  }
}
