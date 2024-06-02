import { Genre } from '../../../constants/genre';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ClassField, DateField, EmailField, EnumField, PhoneField, StringField, StringFieldOptional } from '../../../decorators'
import { Matches } from 'class-validator';
import { PhysicianEntity } from '../entities/physician.entity';
import { SpecializationDto } from '../../department/dtos/specialization.dto';
import { RoleType } from '../../../constants/role-type';
import { S3UrlParser } from '../../../decorators/transform.decorators';
import { OncologyCenterDto } from '../../oncology-center/dtos/oncology-center.dto';
import { OmitType } from '@nestjs/swagger';

export class PhysicianDto extends AbstractDto {
  @DateField({ nullable: true })
  inactivatedAt!: Date | null;

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

  @EnumField(() => RoleType, { each: true })
  roles!: RoleType[];

  @EmailField()
  email!: string;

  @StringFieldOptional({ nullable: true })
  @S3UrlParser()
  avatar?: string | null;

  @PhoneField()
  phone!: string;

  @ClassField(() => OmitType(OncologyCenterDto, ['users'] as const), { isArray: true })
  oncologyCenters?: Omit<OncologyCenterDto, 'users'>[];

  @ClassField(() => SpecializationDto, { isArray: true })
  specializations!: SpecializationDto[];

  constructor(physician: PhysicianEntity) {
    super(physician);
    this.firstName = physician.user.person.firstName;
    this.lastName = physician.user.person.lastName;
    this.email = physician.user.email;
    this.identification = physician.user.person.identification;
    this.genre = physician.user.person.genre;
    this.roles = physician.user.roles;
    this.dateOfBirth = physician.user.person.dateOfBirth;
    this.phone = physician.user.person.phone;
    this.oncologyCenters = physician.user.oncologyCenters;
    this.specializations = physician.physicianSpecialization;
  }
}
