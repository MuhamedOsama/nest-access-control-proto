import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { isInAnyRole } from '../../utils/isInAnyRole.js';
import { Roles } from '../decorators/roles.decorator.js';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedRoles = this.reflector
      .get(Roles, context.getHandler())
      .map((r) => r.toLocaleLowerCase());
    if (!allowedRoles || !allowedRoles.length) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return isInAnyRole(user.role, allowedRoles);
  }
}
