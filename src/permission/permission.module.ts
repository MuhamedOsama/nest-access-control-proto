import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service.js';
import { PermissionController } from './permission.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from './entities/permission.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
