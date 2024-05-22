import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsInt, IsPositive, IsString } from 'class-validator';

export class PlayerXMatchDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  playerId: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  matchId: number;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  team: number;

  @ApiProperty()
  @IsString()
  role: string;
}
