import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dtos/create_author.dto';
import { UpdateAuthorDto } from './dtos/update_author.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/role.guard';

@Controller('authors')
@ApiTags('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiHeader({ name: 'x-api-name', required: true, description: 'Tên tác giả' })
  @ApiHeader({ name: 'x-api-bio', required: true, description: 'Mô tả tác giả' })
  @ApiHeader({ name: 'x-api-date_of_birth', required: true, description: 'Ngày sinh tác giả' })
  @ApiHeader({ name: 'x-api-email', required: true, description: 'Email tác giả' })
  @ApiBody({
    description: 'Mẫu tạo tác giả',
    type: CreateAuthorDto,
    examples: {
      default: {
        value: {
          name: 'Nguyễn Nhật Ánh',
          bio: 'Nhà văn Việt Nam nổi tiếng với truyện thiếu nhi',
          date_of_birth: '1955-05-07',
          email: 'author@example.com'
        }
      }
    }
  })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }
  
  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 5 })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiHeader({ name: 'x-api-name', required: true, description: 'Tên tác giả' })
  @ApiHeader({ name: 'x-api-bio', required: true, description: 'Mô tả tác giả' })
  @ApiHeader({ name: 'x-api-date_of_birth', required: true, description: 'Ngày sinh tác giả' })
  @ApiHeader({ name: 'x-api-email', required: true, description: 'Email tác giả' })
  @ApiBody({
    description: 'Mẫu cập nhật tác giả',
    type: UpdateAuthorDto,
    examples: {
      default: {
        value: {
          name: 'Nguyễn Nhật Ánh',
          bio: 'Tác giả của nhiều tác phẩm thiếu nhi kinh điển',
          date_of_birth: '1955-05-07',
          email: 'author@example.com'
        }
      }
    }
  })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.authorsService.delete(id);
  }
}