import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dtos/create_author.dto';
import { UpdateAuthorDto } from './dtos/update_author.dto';

@Controller('authors')
@ApiTags('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
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
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Patch(':id')
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
  remove(@Param('id') id: string) {
    return this.authorsService.delete(id);
  }
}