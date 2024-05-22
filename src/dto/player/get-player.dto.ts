import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNumber, IsOptional, IsPositive, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPlayerDto {
  @ApiPropertyOptional({
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @ApiPropertyOptional({
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit?: number = 10;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  id: number;

  @ApiProperty()
  @IsString()
  battleTag: string;

  @ApiProperty()
  @IsNumber()
  tankRating: number;

  @ApiProperty()
  @IsNumber()
  dpsRating: number;

  @ApiProperty()
  @IsNumber()
  supportRating: number;

  @ApiPropertyOptional()
  @IsNumber()
  matchesCount?: number | null;

  @ApiProperty()
  @IsString()
  rolesMask: string;
}
