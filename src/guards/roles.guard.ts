import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import _ from 'lodash';

import { type RoleType } from '../constants';
import { Roles } from '../decorators';
import { type UserEntity } from '../modules/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleType[]>(Roles, context.getHandler());

    if (_.isEmpty(roles)) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = <UserEntity>request.user;

    if (user.inactivatedAt !== null) {
      return false;
    }

    return user.roles.some((role) => roles.includes(role));
  }
}
