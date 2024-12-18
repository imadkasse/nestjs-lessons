import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    console.log(roles);

    if (!roles.includes('admin')) {
      console.log('BAD role');
      return false;
    }
    return true;
  }
}
// the class returned true or false =>
// if return true run the function after that
// if return false the Guard return exption error
