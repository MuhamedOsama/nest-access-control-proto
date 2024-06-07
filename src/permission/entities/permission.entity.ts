import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true })
export class Permission {
  constructor() {}
  @Prop({ type: String })
  _id() {
    return uuidv4();
  }
  @Prop({ trim: true, lowercase: true })
  name: string;
  @Prop({ trim: true, lowercase: true })
  subject: string;
  @Prop({ trim: true, lowercase: true })
  action: string;
}
export const PermissionSchema = SchemaFactory.createForClass(Permission);
