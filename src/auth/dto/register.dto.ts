import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'src/users/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'samer' })
  @IsNotEmpty()
  user_name: string;

  @ApiProperty({ example: 'test@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.ADMIN })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
