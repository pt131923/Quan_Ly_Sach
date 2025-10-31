import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @ApiPropertyOptional({ example: '2025-10-30T10:00:00.000Z' })
    @IsDateString()
    @IsOptional()
    createAt?: Date;

    @ApiPropertyOptional({ example: 'Nguyễn Văn B' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ example: 'https://example.com/avatar-new.png' })
    @IsString()
    @IsOptional()
    avatar?: string;

    @ApiPropertyOptional({ example: 'user02' })
    @IsString()
    @IsOptional()
    username?: string;

    @ApiPropertyOptional({ example: 'NewP@ssw0rd', minLength: 6 })
    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;

    @ApiPropertyOptional({ example: false })
    @IsBoolean()
    @IsOptional()
    isFlag?: boolean;

    @ApiPropertyOptional({ example: 'refresh-token-string' })
    @IsString()
    @IsOptional()
    refreshToken?: string;
}
