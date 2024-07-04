import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninRequestDto } from './dto/signin.dto';
import { UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetProfileHandler } from '../policiesHandlers/GetProfile.handler';
import { CheckPolicies, PoliciesGuard } from '@catalyst/casl';

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
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  @CheckPolicies(new GetProfileHandler())
  getProfile(@Request() req) {
    return true;
  }
}
