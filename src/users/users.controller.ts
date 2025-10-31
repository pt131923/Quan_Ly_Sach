import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
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
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
