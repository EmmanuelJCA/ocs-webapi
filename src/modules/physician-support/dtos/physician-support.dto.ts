import { Genre } from '../../../constants/genre';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ClassField, DateField, EmailField, EnumField, PhoneField, StringField, StringFieldOptional } from '../../../decorators'
import { Matches } from 'class-validator';
import { PhysicianSupportEntity } from '../entities/physician-support.entity';
import { SpecializationDto } from '../../department/dtos/specialization.dto';
import { RoleType } from '../../../constants/role-type';
import { S3UrlParser } from '../../../decorators/transform.decorators';
import { OncologyCenterDto } from '../../oncology-center/dtos/oncology-center.dto';
import { OmitType } from '@nestjs/swagger';

export class PhysicianSupportDto extends AbstractDto {
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

  constructor(physicianSupport: PhysicianSupportEntity) {
    super(physicianSupport);
    this.firstName = physicianSupport.user.person.firstName;
    this.lastName = physicianSupport.user.person.lastName;
    this.email = physicianSupport.user.email;
    this.avatar = physicianSupport.user.avatar;
    this.identification = physicianSupport.user.person.identification;
    this.genre = physicianSupport.user.person.genre;
    this.roles = physicianSupport.user.roles;
    this.dateOfBirth = physicianSupport.user.person.dateOfBirth;
    this.phone = physicianSupport.user.person.phone;
    this.oncologyCenters = physicianSupport.user.oncologyCenters;
    this.specializations = physicianSupport.specializations;
  }
}
