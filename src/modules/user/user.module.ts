import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateSettingsHandler } from './commands/create-settings.command';
import { UserEntity } from './entities/user.entity';
import { UserSettingsEntity } from './entities/user-settings.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const handlers = [CreateSettingsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserSettingsEntity])],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, ...handlers],
})
export class UserModule {}
