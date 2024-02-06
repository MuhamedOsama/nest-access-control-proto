import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './auth/auth.module';
import { SeederService } from './seeder/seeder.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nest-access-management-proto',
    ),
    UserModule,
    RoleModule,
    PermissionModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService, SeederService],
})
export class AppModule {}
