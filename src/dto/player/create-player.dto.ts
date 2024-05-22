import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreatePlayerDto {
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

  @ApiProperty()
  @IsString()
  rolesMask: string;
}
