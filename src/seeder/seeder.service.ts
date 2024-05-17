import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PermissionService } from '../permission/permission.service.js';
import { RoleService } from '../role/role.service.js';
import { permissions } from './permissions.js';
import { roles } from './roles.js';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private roleService: RoleService,
    private permissionService: PermissionService,
  ) {}

  async onApplicationBootstrap() {
    await this.seedRolesAndPermissions();
  }

  private async seedRolesAndPermissions() {
    await this.permissionService.createMultiplePermissions(permissions);
    await this.roleService.createMultipleRoles(roles);
  }
}
