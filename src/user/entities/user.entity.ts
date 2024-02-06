import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from '../../role/entities/role.entity';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, default: () => uuidv4() })
  _id: string;
  @Prop({ unique: true, index: true, trim: true })
  email: string;
  @Prop({ trim: true })
  password: string;
  @Prop({ type: mongoose.Schema.Types.String, ref: 'Role' })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
