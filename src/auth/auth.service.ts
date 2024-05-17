import {
  Injectable,
  LoggerService,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
// import { sign } from 'jsonwebtoken';
import { HashingService } from '../providers/hashing/hashing.service';
import { roles } from '../seeder/roles';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { SigninRequestDto, SigninResponseDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    // private readonly loggerService: LoggerService,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    let isUserExists = await this.userService.findUserByEmail(signupDto.email);
    if (isUserExists) {
      // this.loggerService.log(
      //   'user sign up already exists using catalyst logger',
      //   {
      //     email: signupDto.email,
      //   },
      // );
      throw new BadRequestException('email already exists.');
    }
    const password = await this.hashingService.hash(signupDto.password);
    let user = await this.userService.create({ ...signupDto, password });
    const defaultRole = roles.find((r) => r.name == 'User');
    await this.userService.assignRoleToUser(user._id, defaultRole._id);
    // this.loggerService.log('user sign up success using catalyst logger', {
    //   email: signupDto.email,
    // });
    return user;
  }
  async signin(signinDto: SigninRequestDto): Promise<SigninResponseDto> {
    const user = await this.userService.findUserByEmail(signinDto.email);
    if (!user) throw new UnauthorizedException('Incorrect email or password');
    const isPasswordMatch = await this.hashingService.compare(
      signinDto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role.name,
      permissions: user.role.permissions.map((r) => r.name),
    };
    // const token = sign(payload, 'SECRET_KEY', {
    //   expiresIn: '7d',
    // });
    return new SigninResponseDto(
      user.email,
      'token',
      payload.role,
      payload.permissions,
    );
  }
}
