import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { validateHash } from '../../common/utils';
import { type RoleType, TokenType } from '../../constants';
import { UserNotFoundException } from '../../exceptions';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { type UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { type UserSignInDto } from './dto/user-sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
  ) {}

  async createAccessToken(data: {
    role: RoleType;
    userId: Uuid;
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }

  async validateUser(userSignInDto: UserSignInDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      email: userSignInDto.email,
    });

    const isPasswordValid = await validateHash(
      userSignInDto.password,
      user?.password,
    );

    if (!isPasswordValid || user?.inactivatedAt !== null) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
