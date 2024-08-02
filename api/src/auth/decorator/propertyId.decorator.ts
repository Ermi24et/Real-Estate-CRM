import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// property decorator
export const PropertyId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.property ? request.user.id : null;
  },
);
