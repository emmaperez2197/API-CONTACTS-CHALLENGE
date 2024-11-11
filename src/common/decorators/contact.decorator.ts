import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetContact = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.contact;
  },
);
