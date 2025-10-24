import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose } from 'mongoose';
import { Book } from '../../books/models/book.entity';

@Schema({ timestamps: true })
export class Author extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    bio: string;
    
    @Prop()
    date_of_birth: Date;

    @Prop() 
    email: string;

    @Prop({ type: [{ type: 'ObjectId', ref: 'Book' }] })
    books: Book[];

} 

export const AuthorSchema = SchemaFactory.createForClass(Author);