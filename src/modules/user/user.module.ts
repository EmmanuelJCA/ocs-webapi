import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OncologyCenterModule } from '../oncology-center/oncology-center.module';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PersonModule, OncologyCenterModule],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
