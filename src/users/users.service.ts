import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.entity';
import { Model, Document } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User & Document>) {}

  async findAll(page: number = 1, limit: number = 5): Promise<{ data: (User & Document)[]; total: number; page: number; limit: number; }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.userModel.find().skip(skip).limit(limit).exec(),
      this.userModel.countDocuments().exec(),
    ]);
    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<(User & Document) | null> {
    return this.userModel.findById(id).exec();
  }

  async create(userData: CreateUserDto): Promise<User & Document> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async update(id: string, updateData: UpdateUserDto): Promise<(User & Document) | null> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<(User & Document) | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async findActiveUsers(): Promise<(User & Document)[]> {
    return this.userModel.find({ isFlag: true }).exec();
  }

  async findByUsername(username: string): Promise<(User & Document) | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<(User & Document) | null> {
    return this.userModel.findById(id).exec();
  }
}
