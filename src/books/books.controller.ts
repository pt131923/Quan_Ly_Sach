import {
    Controller,
    Get,
    Put,
    Query,
    Post,
    Body,
    Param,
    Delete,
    UseGuards
  } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create_book.dto';
import { UpdateBookDto } from './dtos/update_book.dto';
type Role = 'admin' | 'user';

import { RolesGuard } from '../common/guards/role.guard';
import { SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller('books')
@ApiTags('books')
export class BooksController {
    constructor(private readonly bookService: BooksService) {}
  
     // 1️⃣ GET - Lấy danh sách tất cả sách (ai cũng có thể xem)
    @Get()
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 5 })
    findAll(@Query('page') page: number, @Query('limit') limit: number) {
      return this.bookService.findAll(Number(page) || 1, Number(limit) || 5);
    }
  
    // 2️⃣ GET - Lấy chi tiết 1 sách theo ID
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.bookService.findOne(id);
    }
  
    // 3️⃣ POST - Chỉ admin mới có thể tạo mới sách
    @Post()
    @ApiHeader({ name: 'x-api-token', required: true, description: 'Token API của đại lý' })
    @ApiHeader({ name: 'x-api-password', required: true, description: 'Mật khẩu API của đại lý' })
    @ApiHeader({ name: 'x-api-account', required: true, description: 'Tài khoản API của đại lý' })
    @ApiBody({
      description: 'Mẫu tạo sách',
      type: CreateBookDto,
      examples: {
        default: {
          value: {
            name: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh',
            author: 'Nguyễn Nhật Ánh',
            year_of_publication: 2010,
            publisher: 'NXB Trẻ',
            description: 'Tiểu thuyết thiếu nhi nổi tiếng'
          }
        }
      }
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin' as Role)
    create(@Body() createBookDto: CreateBookDto) {
      return this.bookService.create(createBookDto);
    }
  
    // 4️⃣ PUT - Chỉ admin được phép cập nhật
    @Put(':id')
    @ApiHeader({ name: 'x-api-token', required: true, description: 'Token API của đại lý' })
    @ApiHeader({ name: 'x-api-password', required: true, description: 'Mật khẩu API của đại lý' })
    @ApiHeader({ name: 'x-api-account', required: true, description: 'Tài khoản API của đại lý' })
    @ApiBody({
      description: 'Mẫu cập nhật sách',
      type: UpdateBookDto,
      examples: {
        default: {
          value: {
            name: 'Mắt Biếc',
            author: 'Nguyễn Nhật Ánh',
            year_of_publication: 2019,
            publisher: 'NXB Trẻ',
            description: 'Mô tả cập nhật'
          }
        }
      }
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin' as Role)
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
      return this.bookService.update(id, updateBookDto);
    }
  
    // 5️⃣ DELETE - Chỉ admin được phép xóa
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin' as Role)
    delete(@Param('id') id: string) {
      return this.bookService.delete(id);
    }
  }
  