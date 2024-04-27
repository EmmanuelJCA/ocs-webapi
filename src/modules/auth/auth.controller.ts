import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../decorators';
import { UserDto } from '../user/dtos/user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { SignInPayloadDto } from './dto/sign-in-payload.dto';
import { UserSignInDto } from './dto/user-sign-in.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
      roles: userEntity.roles,
    });

    return new SignInPayloadDto(userEntity.toDto(), token);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([])
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }
}
