import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../constants';
import { ApiFile, Auth, AuthUser } from '../../decorators';
import { IFile } from '../../interfaces/file';
import { UserDto } from '../user/dtos/user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { SignInPayloadDto } from './dto/sign-in-payload.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { UserSignUpDto } from './dto/user-sign-up.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: SignInPayloadDto,
    description: 'User info with access token',
  })
  async userSignIn(
    @Body() userSignInDto: UserSignInDto,
  ): Promise<SignInPayloadDto> {
    const userEntity = await this.authService.validateUser(userSignInDto);

    const token = await this.authService.createAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    return new SignInPayloadDto(userEntity.toDto(), token);
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  @ApiFile({ name: 'avatar' })
  async userSignUp(
    @Body() userSignUpDto: UserSignUpDto,
    @UploadedFile() file?: IFile,
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(userSignUpDto, file);

    return createdUser.toDto({
      isActive: true,
    });
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }
}
