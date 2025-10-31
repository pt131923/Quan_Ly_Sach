import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/role.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiHeader({ name: 'x-api-createAt', required: true, description: 'Ngày tạo' })
  @ApiHeader({ name: 'x-api-name', required: true, description: 'Tên người dùng' })
  @ApiHeader({ name: 'x-api-avatar', required: true, description: 'Ảnh đại diện' })
  @ApiHeader({ name: 'x-api-username', required: true, description: 'Tên đăng nhập' })
  @ApiHeader({ name: 'x-api-password', required: true, description: 'Mật khẩu' })
  @ApiHeader({ name: 'x-api-isFlag', required: true, description: 'Trạng thái' })
  @ApiHeader({ name: 'x-api-role', required: true, description: 'Vai trò' })
  @ApiBody({
    description: 'Mẫu tạo người dùng',
    type: CreateUserDto,
    examples: {
      default: {
        value: {
          createAt: '2025-10-30T10:00:00.000Z',
          name: 'Nguyễn Văn A',
          avatar: 'https://example.com/avatar.png',
          username: 'admin01',
          password: 'P@ssw0rd!',
          isFlag: true,
          role: 'admin'
        }
      }
    }
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 5 })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({ name: 'x-api-name', required: true, description: 'Tên người dùng' })
  @ApiHeader({ name: 'x-api-avatar', required: true, description: 'Ảnh đại diện' })
  @ApiHeader({ name: 'x-api-username', required: true, description: 'Tên đăng nhập' })
  @ApiHeader({ name: 'x-api-password', required: true, description: 'Mật khẩu' })
  @ApiHeader({ name: 'x-api-isFlag', required: true, description: 'Trạng thái' })
  @ApiHeader({ name: 'x-api-refreshToken', required: true, description: 'Refresh token' })
  @ApiBody({
    description: 'Mẫu cập nhật người dùng',
    type: UpdateUserDto,
    examples: {
      default: {
        value: {
          name: 'Nguyễn Văn B',
          avatar: 'https://example.com/avatar-new.png',
          username: 'user02',
          password: 'NewP@ssw0rd',
          isFlag: false,
          refreshToken: 'refresh-token-string'
        }
      }
    }
  })
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
