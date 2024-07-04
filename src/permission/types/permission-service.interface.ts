import { MongoosePermissionEntity } from '@catalyst/base-entities';

export interface IPermissionService {
  /** Create a new permission. */
  createPermission(
    name: string,
    description?: string,
  ): Promise<MongoosePermissionEntity>;
  // Retrieve all permissions available in the system.
  findAllPermissions(): Promise<MongoosePermissionEntity[]>;
  // Find a specific permission by its ID.
  findPermissionById(id: string): Promise<MongoosePermissionEntity>;
  //  Update the details of an existing permission.
  updatePermission(
    id: string,
    name: string,
    description?: string,
  ): Promise<MongoosePermissionEntity>;
  // Remove a permission from the system.
  deletePermission(id: string): Promise<void>;
  // Link a permission to a role.
  assignPermissionToRole(permissionId: string, roleId: string): Promise<void>;
  // Unlink a permission from a role.
  removePermissionFromRole(permissionId: string, roleId: string): Promise<void>;
}
