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

import { RolesGuard } from '../common/guards/role.guard';
import { SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // 1. GET - Xem danh sách (Cả admin và user đều được, không cần @Roles)
  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 5 })
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
  @ApiHeader({ name: 'x-api-token', required: true, description: 'Token API của đại lý' })
  @ApiHeader({ name: 'x-api-password', required: true, description: 'Mật khẩu API của đại lý' })
  @ApiHeader({ name: 'x-api-account', required: true, description: 'Tài khoản API của đại lý' })
  @ApiBody({
    description: 'Mẫu tạo thể loại',
    type: CreateCategoryDto,
    examples: {
      default: {
        value: {
          name: 'Thiếu nhi',
          description: 'Sách dành cho lứa tuổi thiếu nhi',
          status: true
        }
      }
    }
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin' as Role) // 👈 Yêu cầu vai trò 'admin'
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  @ApiHeader({ name: 'x-api-token', required: true, description: 'Token API của đại lý' })
  @ApiHeader({ name: 'x-api-password', required: true, description: 'Mật khẩu API của đại lý' })
  @ApiHeader({ name: 'x-api-account', required: true, description: 'Tài khoản API của đại lý' })
  @ApiBody({
    description: 'Mẫu cập nhật thể loại',
    type: UpdateCategoryDto,
    examples: {
      default: {
        value: {
          name: 'Văn học',
          description: 'Thể loại văn học nói chung',
          status: false
        }
      }
    }
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin' as Role) 
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin' as Role)
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}