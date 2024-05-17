import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.entity.js';
import { UserModule } from '../user/user.module.js';
import { BcryptService } from '../providers/hashing/bcrypt.service.js';
import { HashingService } from '../providers/hashing/hashing.service.js';
// import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { RoleGuard } from './guards/role.guard.js';
import { PermissionGuard } from './guards/permission.guard.js';
import { FirebaseService } from './firebase.service.js';
import { LoggerModule, LoggerService } from '@wexcute/catalyst-logger';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    LoggerModule.forRoot(),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    AuthService,
    FirebaseService,
    JwtStrategy,
    RoleGuard,
    PermissionGuard,
  ],
})
export class AuthModule {}
