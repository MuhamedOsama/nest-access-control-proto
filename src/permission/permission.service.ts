import { permissions } from './../seeder/permissions';
import { Injectable } from '@nestjs/common';
import { IPermissionService } from './types/permission-service.interface';
import { Permission } from './entities/permission.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PermissionService implements IPermissionService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}
  async createMultiplePermissions(permissions: Permission[]): Promise<boolean> {
    const seededPermissionsIds = await this.permissionModel
      .find(
        {
          _id: { $in: permissions.map((permission) => permission._id) },
        },
        { _id: 1 },
      ) // Project only the _id field
      .exec()
      .then((results) => results.map((result) => result._id));

    // Prepare bulk write operations for roles that are not already seeded
    const permissionsToSeed = permissions
      .filter((permission) => !seededPermissionsIds.includes(permission._id))
      .map((permission) => ({
        insertOne: {
          document: permission,
        },
      }));

    // Execute bulk write only if there are roles to seed
    if (permissionsToSeed.length > 0) {
      const result = await this.permissionModel.bulkWrite(permissionsToSeed);
      return result.ok === 1;
    }

    // Return true if there are no new roles to seed, indicating the operation is "successful"
    return true;
  }
  createPermission(name: string, description?: string): Promise<Permission> {
    throw new Error('Method not implemented.');
  }
  findAllPermissions(): Promise<Permission[]> {
    throw new Error('Method not implemented.');
  }
  findPermissionById(id: string): Promise<Permission> {
    throw new Error('Method not implemented.');
  }
  updatePermission(
    id: string,
    name: string,
    description?: string,
  ): Promise<Permission> {
    throw new Error('Method not implemented.');
  }
  deletePermission(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  assignPermissionToRole(permissionId: string, roleId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  removePermissionFromRole(
    permissionId: string,
    roleId: string,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
