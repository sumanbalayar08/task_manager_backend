import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty({ message: 'Name required' })
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Valid email required' })
  email: string;

  @IsNotEmpty({ message: 'Password required' })
  @MinLength(6, { message: 'Password min 6 chars' })
  @IsString()
  password: string;
}

export class LoginDTO {
  @IsEmail({}, { message: 'Valid email required' })
  email: string;

  @IsNotEmpty({ message: 'Password required' })
  @IsString()
  password: string;
}

export interface AuthResponse {
  token?: string
}

export interface RegisterResponse {
  success: boolean
  message: string
}