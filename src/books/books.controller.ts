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
  
  import { JwtStrategy } from '../auth/entities/jwt.strategy';
  import { RolesGuard } from '../common/guards/role.guard';
  import { SetMetadata } from '@nestjs/common';
  const Roles = (...roles: string[]) => SetMetadata('roles', roles);
  
  @Controller('books')
  @UseGuards(JwtStrategy, RolesGuard)
  export class BooksController {
    constructor(private readonly bookService: BooksService) {}
  
     // 1️⃣ GET - Lấy danh sách tất cả sách (ai cũng có thể xem)
    @Get()
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
    @Roles('admin' as Role)
    create(@Body() createBookDto: CreateBookDto) {
      return this.bookService.create(createBookDto);
    }
  
    // 4️⃣ PUT - Chỉ admin được phép cập nhật
    @Put(':id')
    @Roles('admin' as Role)
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
      return this.bookService.update(id, updateBookDto);
    }
  
    // 5️⃣ DELETE - Chỉ admin được phép xóa
    @Delete(':id')
    @Roles('admin' as Role)
    delete(@Param('id') id: string) {
      return this.bookService.delete(id);
    }
  }
  