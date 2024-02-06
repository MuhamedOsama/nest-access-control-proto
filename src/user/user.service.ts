import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }
  async assignRoleToUser(userId: string, roleId: string): Promise<any> {
    try {
      const result = await this.userModel
        .updateOne({ _id: userId }, { $set: { role: roleId } })
        .exec();

      // Check if the operation was successful, e.g., if a document was updated
      if (result.modifiedCount === 0) {
        // Handle the case where the user wasn't found or the role was the same
        return false;
      }

      return true;
    } catch (error) {
      // Handle any errors that occurred during the operation
      return false;
    }
  }
  findUserByEmail(email: string) {
    return this.userModel
      .findOne({ email: email })
      .populate({
        path: 'role',
        populate: {
          path: 'permissions',
        },
      })
      .exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
