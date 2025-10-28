import { 
  Controller, 
  Get, 
  Put, 
  Query, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  UseGuards
} from '@nestjs/common'; 
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create_categories.dto';
import { UpdateCategoryDto } from './dtos/update_categories.dto';
type Role = 'admin' | 'user';

import { JwtStrategy } from '../auth/entities/jwt.strategy';
import { RolesGuard } from '../common/guards/role.guard';
// Removed erroneous import of Roles; assuming Roles is not exported from role.guard.
// If you have your own Roles decorator, import from correct location, otherwise remove.
import { SetMetadata } from '@nestjs/common';
const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller('categories')
@UseGuards(JwtStrategy, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // 1. GET - Xem danh sách (Cả admin và user đều được, không cần @Roles)
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.categoriesService.findAll(Number(page) || 1, Number(limit) || 5);
  }

  // 2. GET - Xem danh sách Active (Cả admin và user đều được)
  @Get('active')
  findActiveCategories() {
    return this.categoriesService.findActiveCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @Roles('admin' as Role) // 👈 Yêu cầu vai trò 'admin'
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  @Roles('admin' as Role) 
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles('admin' as Role)
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}