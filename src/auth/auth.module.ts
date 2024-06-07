import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { BcryptService } from '../providers/hashing/bcrypt.service';
import { HashingService } from '../providers/hashing/hashing.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RoleGuard } from './guards/role.guard';
import { PermissionGuard } from './guards/permission.guard';
import { FirebaseService } from './firebase.service';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    CaslModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    PassportModule,
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
