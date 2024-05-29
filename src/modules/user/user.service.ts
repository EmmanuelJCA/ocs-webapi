import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type FindOptionsWhere, Repository } from 'typeorm';

import { FileNotImageException, UserNotFoundException } from '../../exceptions';
import { type IFile } from '../../interfaces/file';
import { OncologyCenterService } from '../../modules/oncology-center/oncology-center.service';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { type CreateUserDto } from './dtos/create-user.dto';
import { type UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { PersonService } from '../person/person.service';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private personService: PersonService,
    private oncologyCenterService: OncologyCenterService,
    private validatorService: ValidatorService,
    private awsS3Service: AwsS3Service,
  ) {}

  findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(findData);
  }

  @Transactional()
  async createUser(
    { email, password, roles, oncologyCentersIds, ...personalInfo }: CreateUserDto,
    file?: IFile,
  ): Promise<UserEntity> {
    if (file && !this.validatorService.isImage(file.mimetype)) {
      throw new FileNotImageException();
    }

    const oncologyCenters =
      await this.oncologyCenterService.getOncologyCentersByIds(
        oncologyCentersIds,
      );

    if (oncologyCenters.length !== oncologyCentersIds.length) {
      throw new BadRequestException('Centros oncológicos no válidos');
    }

    const existingEmail = await this.userRepository.findOneBy({ email });

    if (existingEmail) {
      throw new BadRequestException('El correo electrónico ya está registrado');
    }

    let personEntity = await this.personService.findOneBy({ identification: personalInfo.identification });

    if (personEntity?.user) {
      throw new BadRequestException('La persona ya posee un usuario registrado');
    }

    if (!personEntity) {
      personEntity = await this.personService.create(personalInfo);
    }

    const userEntity = this.userRepository.create({ email, password, roles });

    userEntity.person = personEntity;
    userEntity.oncologyCenters = oncologyCenters;

    if (file) {
      userEntity.avatar = await this.awsS3Service.uploadImage(file);
    }

    await this.userRepository.save(userEntity);

    return userEntity;
  }

  async getUsers(): Promise<UserEntity[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder.leftJoinAndSelect('user.oncologyCenters', 'oncologyCenters');
    queryBuilder.innerJoinAndSelect('user.person', 'person');

    return queryBuilder.getMany();
  }

  async getUser(userId: Uuid): Promise<UserEntity> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder.leftJoinAndSelect('user.oncologyCenters', 'oncologyCenters');
    queryBuilder.innerJoinAndSelect('user.person', 'person');
    queryBuilder.where('user.id = :userId', { userId });

    const userEntity = await queryBuilder.getOne();

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }

  @Transactional()
  async updateUser(
    id: Uuid,
    { email, password, roles, inactivatedAt, isActive, oncologyCentersIds = [], ...personalInfo }: UpdateUserDto,
    file?: IFile,
  ): Promise<UserEntity> {
    const userEntity = await this.getUser(id);

    if (email && email !== userEntity.email) {
      const existingEmail = await this.userRepository.findOneBy({ email: email ?? '' });

      if (existingEmail) {
        throw new BadRequestException('El correo electrónico ya está registrado');
      }
    }

    if (isActive !== undefined) {
      inactivatedAt = isActive ? null : new Date();
    }

    const oncologyCenters =
      await this.oncologyCenterService.getOncologyCentersByIds(
        oncologyCentersIds,
      );

    const person = await this.personService.update(userEntity.person.id, personalInfo);

    this.userRepository.merge(userEntity, {
      email,
      password,
      roles,
      inactivatedAt,
      person
    });

    userEntity.oncologyCenters = oncologyCenters;

    if (file) {
      userEntity.avatar = await this.awsS3Service.uploadImage(file);
    }

    await this.userRepository.save(userEntity);

    return userEntity;
  }

  async inactivateUser(userId: Uuid): Promise<UserEntity> {
    const userEntity = await this.getUser(userId);

    userEntity.inactivatedAt = new Date();

    await this.userRepository.save(userEntity);

    return userEntity;
  }
}
