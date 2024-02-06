import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'This field must be a valid email' })
  @ApiProperty()
  readonly email: string;
  @IsString({ message: 'Password must be a string.' })
  @MinLength(4, { message: 'Password must be between 4 - 12 characters' })
  @MaxLength(12, { message: 'Password must be between 4 - 12 characters' })
  @ApiProperty()
  password: string;
}
