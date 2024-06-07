import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './auth/auth.module';
import { SeederService } from './seeder/seeder.service';
import { ConfigModule } from '@nestjs/config';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Load multiple env files or select based on NODE_ENV
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/nest-access-management-proto',
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
