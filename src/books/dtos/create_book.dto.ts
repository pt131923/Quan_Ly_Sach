import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateBookDto {
    @ApiProperty({ example: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Nguyễn Nhật Ánh' })
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty({ example: 2010, minimum: 1000, maximum: 2100 })
    @IsInt()
    @Min(1000)
    @Max(2100)
    year_of_publication: number;

    @ApiProperty({ example: 'NXB Trẻ' })
    @IsString()
    @IsNotEmpty()
    publisher: string;

    @ApiPropertyOptional({ example: 'Tiểu thuyết thiếu nhi nổi tiếng' })
    @IsString()
    @IsOptional()
    description?: string;
}