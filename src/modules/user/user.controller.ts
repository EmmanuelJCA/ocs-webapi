import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UploadedFile,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../constants';
import { ApiFile, Auth, UUIDParam } from '../../decorators';
import { IFile } from '../../interfaces/file';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Auth([RoleType.SUPER_ADMINISTRATOR, RoleType.ADMINISTRATOR])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  @ApiFile({ name: 'avatar' })
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: IFile,
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(createUserDto, file);

    return createdUser.toDto();
  }

  @Get()
  @Auth([RoleType.SUPER_ADMINISTRATOR, RoleType.ADMINISTRATOR])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get users list',
    type: [UserDto],
  })
  async getUsers(): Promise<UserDto[]> {
    const userEntity = await this.userService.getUsers();

    return userEntity.toDtos();
  }

  @Get(':id')
  @Auth([RoleType.SUPER_ADMINISTRATOR, RoleType.ADMINISTRATOR])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: UserDto,
  })
  async getUser(@UUIDParam('id') userId: Uuid): Promise<UserDto> {
    const user = await this.userService.getUser(userId);

    return user.toDto();
  }

  @Put(':id')
  @Auth([RoleType.SUPER_ADMINISTRATOR, RoleType.ADMINISTRATOR])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Updated' })
  @ApiFile({ name: 'avatar' })
  async updateUser(
    @UUIDParam('id') userId: Uuid,
    @Body() createUserDto: UpdateUserDto,
    @UploadedFile() file?: IFile,
  ): Promise<UserDto> {
    const createdUser = await this.userService.updateUser(
      userId,
      createUserDto,
      file,
    );

    return createdUser.toDto();
  }

  @Delete(':id')
  @Auth([RoleType.SUPER_ADMINISTRATOR, RoleType.ADMINISTRATOR])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successfully Deleted' })
  async inactivateUser(@UUIDParam('id') userId: Uuid): Promise<void> {
    await this.userService.inactivateUser(userId);
  }
}
