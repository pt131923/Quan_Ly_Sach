import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {

    @Prop()
    avatar: string;

    @Prop()
    createAt: Date;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    isFlag: boolean;

    @Prop({ default: null })
    refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);


