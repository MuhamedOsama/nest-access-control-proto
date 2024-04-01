import { Permission } from '../entities/permission.entity';

export interface IPermissionService {
  /** Create a new permission. */
  createPermission(name: string, description?: string): Promise<Permission>;
  // Retrieve all permissions available in the system.
  findAllPermissions(): Promise<Permission[]>;
  // Find a specific permission by its ID.
  findPermissionById(id: string): Promise<Permission>;
  //  Update the details of an existing permission.
  updatePermission(
    id: string,
    name: string,
    description?: string,
  ): Promise<Permission>;
  // Remove a permission from the system.
  deletePermission(id: string): Promise<void>;
  // Link a permission to a role.
  assignPermissionToRole(permissionId: string, roleId: string): Promise<void>;
  // Unlink a permission from a role.
  removePermissionFromRole(permissionId: string, roleId: string): Promise<void>;
}
