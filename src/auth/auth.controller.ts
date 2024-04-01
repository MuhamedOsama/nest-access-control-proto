import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninRequestDto } from './dto/signin.dto';
import { UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from './decorators/roles.decorator';
import { RoleGuard } from './guards/role.guard';
import { PermissionGuard } from './guards/permission.guard';
import { Permission } from './decorators/permission.decorator';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninRequestDto) {
    return this.authService.signin(signinDto);
  }
  // @Permission(['view_profile'])
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  getProfile(@Request() req) {
    return true;
  }
}
