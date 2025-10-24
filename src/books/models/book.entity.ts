import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ required: true, unique: true})
  name: string;

  @Prop()
  author: string;
  
  @Prop()
  description: string;

  @Prop()
  year_of_publication: number;

  @Prop()
  publisher: string;
  
  @Prop({ require: true })
  authorId: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
