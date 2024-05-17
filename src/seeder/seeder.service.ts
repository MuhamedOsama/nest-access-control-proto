import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PermissionService } from '../permission/permission.service';
import { RoleService } from '../role/role.service';
import { permissions } from './permissions';
import { roles } from './roles';

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
