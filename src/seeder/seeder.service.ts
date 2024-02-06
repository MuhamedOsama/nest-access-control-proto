import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RoleService } from '../role/role.service';
import { roles } from './roles';
import { permissions } from './permissions';
import { PermissionService } from '../permission/permission.service';

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
