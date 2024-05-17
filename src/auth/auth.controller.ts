import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninRequestDto } from './dto/signin.dto';
import { Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

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
  // @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  getProfile(@Request() req) {
    return true;
  }
}
