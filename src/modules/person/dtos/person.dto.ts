import { AbstractDto } from '../../../common/dto/abstract.dto';
import { PersonEntity } from '../entities/person.entity';
import { DateField, EmailField, EnumField, PhoneField, S3UrlParser, StringField, StringFieldOptional, UUIDField } from '../../../decorators';
import { Matches } from 'class-validator';
import { Genre, RoleType } from '../../../constants';

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

  @EmailField()
  email?: string;

  @EnumField(() => RoleType, { each: true })
  roles?: RoleType[];

  @StringFieldOptional({ nullable: true })
  @S3UrlParser()
  avatar?: string | null;

  @UUIDField()
  oncologyCentersIds?: Uuid[];

  constructor(person: PersonEntity) {
    super(person);
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.fullName = person.fullName;
    this.genre = person.genre;
    this.identification = person.identification;
    this.dateOfBirth = person.dateOfBirth;
    this.phone = person.phone;
    this.email = person.user?.email;
    this.roles = person.user?.roles;
    this.avatar = person.user?.avatar;
    this.oncologyCentersIds = person.user?.oncologyCenters.map(oc => oc.id);
  }
}
