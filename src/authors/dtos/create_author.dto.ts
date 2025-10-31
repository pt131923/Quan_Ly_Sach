import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
    @ApiProperty({ example: 'Nguyễn Nhật Ánh', description: 'Tên tác giả' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Nhà văn Việt Nam nổi tiếng với truyện thiếu nhi', description: 'Tiểu sử ngắn' })
    @IsString()
    @IsNotEmpty()
    bio: string;

    @ApiProperty({ example: '1955-05-07', description: 'Ngày sinh theo ISO-8601 (YYYY-MM-DD)' })
    @IsDateString()
    date_of_birth: Date;

    @ApiProperty({ example: 'author@example.com', description: 'Email liên hệ' })
    @IsEmail()
    email: string;
}