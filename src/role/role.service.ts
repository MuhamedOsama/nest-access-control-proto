import { IRoleService } from './types/role-service.interface';
import { Role } from './entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoosePermissionEntity } from '@catalyst/base-entities';

@Injectable()
export class RoleService implements IRoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}
  async createMultipleRoles(roles: any[]): Promise<boolean> {
    const seededRoleIds = await this.roleModel
      .find(
        {
          _id: { $in: roles.map((role) => role._id) },
        },
        { _id: 1 },
      ) // Project only the _id field
      .exec()
      .then((results) => results.map((result) => result._id));

    // Prepare bulk write operations for roles that are not already seeded
    const rolesToSeed = roles
      .filter((role) => !seededRoleIds.includes(role._id))
      .map((role) => ({
        insertOne: {
          document: role,
        },
      }));

    // Execute bulk write only if there are roles to seed
    if (rolesToSeed.length > 0) {
      const result = await this.roleModel.bulkWrite(rolesToSeed);
      return result.ok === 1;
    }

    // Return true if there are no new roles to seed, indicating the operation is "successful"
    return true;
  }
  createRole(
    name: string,
    permissions: MongoosePermissionEntity[],
  ): Promise<Role> {
    const createdRole = new this.roleModel({ name, permissions });
    return createdRole.save();
  }
  findAllRoles(): Promise<Role[]> {
    return this.roleModel.find().populate('permissions').exec();
  }
  findRoleById(id: string): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  updateRole(id: string, name: string, permissions: string[]): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  deleteRole(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  assignRoleToUser(userId: string, roleId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  removeRoleFromUser(userId: string, roleId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getRolesByUser(userId: string): Promise<Role[]> {
    throw new Error('Method not implemented.');
  }
}
