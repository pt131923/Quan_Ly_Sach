import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'; // 👈 Thêm decorators Swagger
import { AuthService } from './auth.service';
import { JwtStrategy } from './entities/jwt.strategy';


@ApiTags('Authentication') // 👈 Nhóm các API trong Swagger UI
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: JwtStrategy })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 500 })
  async register(@Body() registerDto: { username: string; password: string; role: string }) { 
    return this.authService.register(
      registerDto.username, 
      registerDto.password, 
      registerDto.role
    );
  }

  @Post('login')
  @ApiBody({ type: JwtStrategy })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  async login(@Body() loginDto: { username: string; password: string }) { 
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @Post('refresh')
  @ApiBody({ type: JwtStrategy })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  async refresh(@Body() refreshDto: { userId: string; refreshToken: string }) {
    return this.authService.refreshToken(refreshDto.userId, refreshDto.refreshToken);
  }
}