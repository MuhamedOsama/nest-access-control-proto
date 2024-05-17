import { isPermissible } from './../../utils/isPermissible';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Permission } from '../decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedPermissions = this.reflector
      .get(Permission, context.getHandler())
      .map((r) => r.toLocaleLowerCase());
    if (!allowedPermissions || !allowedPermissions.length) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return isPermissible(user.permissions, allowedPermissions);
  }
}
