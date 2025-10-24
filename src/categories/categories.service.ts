import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './models/category.entity';
import { CreateCategoryDto } from './dtos/create_categories.dto';
import { UpdateCategoryDto } from './dtos/update_categories.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

  async findAll(page: number = 1, limit: number = 5): Promise<{ data: Category[]; total: number; page: number; limit: number; }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.categoryModel.find().skip(skip).limit(limit).exec(),
      this.categoryModel.countDocuments().exec(),
    ]);
    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Category | null> {
    return this.categoryModel.findById(id).exec();
  }

  async create(categoryData: CreateCategoryDto): Promise<Category> {
    const category = new this.categoryModel(categoryData);
    return category.save();
  }

  async update(id: string, updateData: UpdateCategoryDto): Promise<Category | null> {
    return this.categoryModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<Category | null> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }

  async findActiveCategories(): Promise<Category[]> {
    return this.categoryModel.find({ status: true }).exec();
  }
}
