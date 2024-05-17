import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import AdminJS from 'adminjs';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { PermissionModule } from './permission/permission.module.js';
import { RoleModule } from './role/role.module.js';
import { SeederService } from './seeder/seeder.service.js';
import { UserModule } from './user/user.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleTypeorm } from './role/entities/role.typeorm-entity.js';
AdminJS.registerAdapter({ Database: Database, Resource: Resource });
const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '1111',
      username: 'postgres',
      entities: [RoleTypeorm],
      database: 'testo',
      synchronize: true,
    }),
    ConfigModule.forRoot({
      // Load multiple env files or select based on NODE_ENV
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nest-access-management-proto',
    ),
    UserModule,
    RoleModule,
    PermissionModule,
    AuthModule,
    // AdminJS version 7 is ESM-only. In order to import it, you have to use dynamic imports.
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [RoleTypeorm],
      },
      auth: {
        authenticate,
        cookieName: 'adminjs',
        cookiePassword: 'secret',
      },
      sessionOptions: {
        resave: true,
        saveUninitialized: true,
        secret: 'secret',
      },
    }),

    // LoggerModule.forRoot(),
  ],
  controllers: [],
  providers: [AppService, SeederService],
})
export class AppModule {}
