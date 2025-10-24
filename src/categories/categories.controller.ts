import { Controller, Get, Put, Query, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create_categories.dto';
import { UpdateCategoryDto } from './dtos/update_categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.categoriesService.findAll(Number(page) || 1, Number(limit) || 5);
  }

  @Get('active')
  findActiveCategories() {
    return this.categoriesService.findActiveCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}

