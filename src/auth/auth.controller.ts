// src/auth/auth.controller.ts (Phiên bản đã sửa)
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
// ... các imports khác ...

@ApiTags('0.CORE.Auth') // 👈 Cấp 1: CORE, Cấp 2: Auth
@Controller('auth')
export class AuthController {
  // ... constructor ...

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký người dùng mới (admin/user)' })
  @ApiBody({ 
      // Giả định bạn có DTO cho Register. Nếu không, cần tạo DTO.
      type: Object, 
      description: 'Dữ liệu đăng ký', 
      examples: {
          a: { value: { username: "user_test", password: "123", role: "user" }, summary: "User thường" },
          b: { value: { username: "admin_test", password: "123", role: "admin" }, summary: "Admin" },
      }
  })
  @ApiResponse({ status: 201, description: 'Đăng ký thành công' })
  @ApiResponse({ status: 500, description: 'Lỗi server hoặc username đã tồn tại' })
  async register(@Body() registerDto: { username: string; password: string; role: string }) { 
      // ...
  }

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập và nhận JWT Token' })
  @ApiResponse({ status: 200, description: 'Trả về { accessToken, refreshToken, user }' })
  @ApiResponse({ status: 401, description: 'Sai username hoặc password' })
  async login(@Body() loginDto: { username: string; password: string }) { 
      // ...
  }
  

  @Post('refresh')
  @ApiOperation({ summary: 'Làm mới JWT Token' })
  @ApiResponse({ status: 200, description: 'Trả về { accessToken, refreshToken }' })
  @ApiResponse({ status: 401, description: 'Sai refresh token' })
  async refresh(@Body() refreshDto: { userId: string; refreshToken: string }) { 
      // ...
  }
}