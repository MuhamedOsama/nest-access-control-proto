import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Permission } from '../../permission/entities/permission.entity.js';
import { v4 as uuidv4 } from 'uuid';

export type RoleDocument = HydratedDocument<Role>;
@Schema({ timestamps: true })
export class Role {
  @Prop({ type: String })
  _id() {
    return uuidv4();
  }
  @Prop({ unique: true, index: true, trim: true, lowercase: true })
  name: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.String, ref: 'Permission' }] })
  permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
