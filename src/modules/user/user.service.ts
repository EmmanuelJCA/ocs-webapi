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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private oncologyCenterService: OncologyCenterService,
    private validatorService: ValidatorService,
    private awsS3Service: AwsS3Service,
  ) {}

  findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(findData);
  }

  async findByEmail(
    options: Partial<{ username: string; email: string }>,
  ): Promise<UserEntity | null> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .select();

    if (options.email) {
      queryBuilder.orWhere('user.email = :email', {
        email: options.email,
      });
    }

    return queryBuilder.getOne();
  }

  async createUser(
    createUserDto: CreateUserDto,
    file?: IFile,
  ): Promise<UserEntity> {
    if (file && !this.validatorService.isImage(file.mimetype)) {
      throw new FileNotImageException();
    }

    const oncologyCenters =
      await this.oncologyCenterService.getOncologyCentersByIds(
        createUserDto.oncologyCentersIds,
      );

    if (oncologyCenters.length !== createUserDto.oncologyCentersIds.length) {
      throw new BadRequestException();
    }

    const userEntity = this.userRepository.create(createUserDto);

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

    return queryBuilder.getMany();
  }

  async getUser(userId: Uuid): Promise<UserEntity> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder.leftJoinAndSelect('user.oncologyCenters', 'oncologyCenters');
    queryBuilder.where('user.id = :userId', { userId });

    const userEntity = await queryBuilder.getOne();

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }

  async updateUser(
    id: Uuid,
    { isActive, oncologyCentersIds, ...updateUserDto }: UpdateUserDto,
    file?: IFile,
  ): Promise<UserEntity> {
    const userEntity = await this.getUser(id);

    if (isActive !== undefined) {
      updateUserDto.inactivatedAt = isActive ? null : new Date();
    }

    const oncologyCenters =
      await this.oncologyCenterService.getOncologyCentersByIds(
        oncologyCentersIds,
      );

    this.userRepository.merge(userEntity, {
      ...updateUserDto,
      oncologyCenters,
    });

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
