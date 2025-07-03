import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Creates a new user with a hashed password. Optionally accepts a role. Returns an access token and user details.',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'c29f8e2f-4bb1-4c6f-a0d1-2b96b5017b87',
          user_name: 'samer',
          email: 'test@example.com',
          role: 'user',
          createdAt: '2025-07-02T20:10:15.000Z',
          updatedAt: '2025-07-02T20:10:15.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input (validation failed)',
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login with email and password',
    description:
      'Authenticates a user and returns a JWT token if credentials are valid.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'c29f8e2f-4bb1-4c6f-a0d1-2b96b5017b87',
          user_name: 'samer',
          email: 'test@example.com',
          role: 'user',
          createdAt: '2025-07-02T20:10:15.000Z',
          updatedAt: '2025-07-02T20:10:15.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials (wrong email or password)',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
