import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiPropertyOptional({ example: '2025-10-30T10:00:00.000Z', description: 'Ngày tạo ISO-8601' })
    @IsDateString()
    @IsOptional()
    createAt?: Date;

    @ApiPropertyOptional({ example: 'Nguyễn Văn A' })
    @IsString()
    @IsOptional()
    name?: string;          

    @ApiPropertyOptional({ example: 'https://example.com/avatar.png' })
    @IsString()
    @IsOptional()
    avatar?: string;

    @ApiProperty({ example: 'admin01' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'P@ssw0rd!', minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiPropertyOptional({ example: true })
    @IsBoolean()
    @IsOptional()
    isFlag?: boolean;

    @ApiProperty({ example: 'admin', description: 'Phân quyền: admin | user' })
    @IsString()
    @IsNotEmpty()
    role : string;
}
