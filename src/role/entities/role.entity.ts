import { MongoosePermissionEntity } from '@catalyst/base-entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
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
  permissions: MongoosePermissionEntity[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
