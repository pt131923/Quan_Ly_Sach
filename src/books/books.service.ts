import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { Book } from './models/book.entity';
import { CreateBookDto } from './dtos/create_book.dto';
import { UpdateBookDto } from './dtos/update_book.dto';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) {}

    async findAll(page: number = 1, limit: number = 5): Promise<{ data: Book[]; total: number; page: number; limit: number; }> {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.bookModel.find().skip(skip).limit(limit).exec(),
            this.bookModel.countDocuments().exec(),
        ]);
        return { data, total, page, limit };
    }

    async findOne(id:string){
        return this.bookModel.findById(id).exec();
    }

    async create(bookData: CreateBookDto) {
        const existing = await this.bookModel.findOne({ name: bookData.name });
        if (existing) {
            throw new ConflictException('Tên sách đã tồn tại!');
        }
        const book = new this.bookModel(bookData);

        return book.save();
        }

    async update(id:string, updateData: UpdateBookDto){
        return this.bookModel.findByIdAndUpdate(id, updateData, {new: true});
    }

    async delete(id: string){
        return this.bookModel.findByIdAndDelete(id);
    }
}
