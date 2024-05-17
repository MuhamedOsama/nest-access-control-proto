import { Permission } from '../../permission/entities/permission.entity.js';
import { Role } from '../entities/role.entity.js';

export interface IRoleService {
  //Create a new role with a specified set of permissions.
  createRole(name: string, permissions: Permission[]): Promise<Role>;
  // Retrieve all roles in the system.
  findAllRoles(): Promise<Role[]>;
  // Find a specific role by its ID.
  findRoleById(id: string): Promise<Role>;
  // Update the details of an existing role, including its permissions.
  updateRole(id: string, name: string, permissions: string[]): Promise<Role>;
  // Remove a role from the system.
  deleteRole(id: string): Promise<void>;
  // Assign a role to a user.
  assignRoleToUser(userId: string, roleId: string): Promise<void>;
  //  Remove a role from a user.
  removeRoleFromUser(userId: string, roleId: string): Promise<void>;
  // Get all roles assigned to a specific user.
  getRolesByUser(userId: string): Promise<Role[]>;
}
