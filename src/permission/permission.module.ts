import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MongoosePermissionEntity,
  MongoosePermissionSchema,
} from '@wexcute/catalyst-base-entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoosePermissionEntity.name, schema: MongoosePermissionSchema },
    ]),
  ],
  controllers: [],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
