import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './models/author.entity';
import { CreateAuthorDto } from './dtos/create_author.dto';
import { UpdateAuthorDto } from './dtos/update_author.dto';

@Injectable()
export class AuthorsService {
    constructor(@InjectModel(Author.name) private readonly authorModel: Model<Author> ) {}

    async findAll(page: number = 1, limit: number = 5): Promise<{ data: Author[]; total: number; page: number; limit: number; }> {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.authorModel.find().skip(skip).limit(limit).exec(),
            this.authorModel.countDocuments().exec(),
        ]);
        return { data, total, page, limit };
    }

    async findOne(id: string): Promise<Author | null> {
        return this.authorModel.findById(id).exec();
    }

    async create(authorData: CreateAuthorDto): Promise<Author> {
        const author = new this.authorModel(authorData);
        return author.save();
    }

    async update(id: string, updateData: UpdateAuthorDto): Promise<Author | null> {
        return this.authorModel.findByIdAndUpdate(id, updateData, {new: true}).exec();
    }

    async delete(id: string): Promise<Author | null> {
        return this.authorModel.findByIdAndDelete(id).exec();
    }
}