import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  user_name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
