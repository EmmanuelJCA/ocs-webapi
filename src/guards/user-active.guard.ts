import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { type UserEntity } from '../modules/user/entities/user.entity';

@Injectable()
export class UserActiveGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = <UserEntity>request.user;

    return !(user.inactivatedAt !== null);
  }
}
