import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SigninRequestDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'This field must be a valid email' })
  @ApiProperty()
  readonly email: string;
  @IsString({ message: 'Password must contain valid characters' })
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty()
  password: string;
}

export class SigninResponseDto {
  constructor(email, token, role, permissions) {
    this.email = email;
    this.token = token;
    this.role = role;
    this.permissions = permissions;
  }
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly token: string;
  @ApiProperty()
  readonly role: string;
  @ApiProperty()
  readonly permissions: string;
}
