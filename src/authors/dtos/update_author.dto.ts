import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateAuthorDto{
    @ApiPropertyOptional({ example: 'Nguyễn Nhật Ánh' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ example: 'Tác giả của nhiều tác phẩm thiếu nhi kinh điển' })
    @IsString()
    @IsOptional()
    bio?: string;

    @ApiPropertyOptional({ example: '1955-05-07' })
    @IsDateString()
    @IsOptional()
    date_of_birth?: Date;

    @ApiPropertyOptional({ example: 'author@example.com' })
    @IsEmail()
    @IsOptional()
    email?: string;
}