import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePlayerDto {
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
