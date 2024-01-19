/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export function AuthUser() {
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = request.user;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (user?.[Symbol.for('isPublic')]) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  })();
}
