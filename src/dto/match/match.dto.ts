import { PlayerXMatch } from '@entities/player-x-match.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsInt, IsPositive, IsString, IsArray, ArrayMinSize, ArrayMaxSize, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { PlayerXMatchDto } from '../player-x-match/player-x-match.dto';

export class MatchDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  winner: number;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  ratingChange: number;

  @ApiProperty({
    type: PlayerXMatch,
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(10)
  @ArrayMaxSize(10)
  @IsNotEmpty()
  @Type(() => PlayerXMatchDto)
  playerXMatch: PlayerXMatchDto[];
}
