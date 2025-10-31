import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateBookDto {
    @ApiPropertyOptional({ example: 'Mắt Biếc' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ example: 'Nguyễn Nhật Ánh' })
    @IsString()
    @IsOptional()
    author?: string;

    @ApiPropertyOptional({ example: 2019, minimum: 1000, maximum: 2100 })
    @IsInt()
    @Min(1000)
    @Max(2100)
    @IsOptional()
    year_of_publication?: number;

    @ApiPropertyOptional({ example: 'NXB Trẻ' })
    @IsString()
    @IsOptional()
    publisher?: string;

    @ApiPropertyOptional({ example: 'Mô tả cập nhật' })
    @IsString()
    @IsOptional()
    description?: string;
}