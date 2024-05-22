import { IsArray, ArrayMinSize, ArrayMaxSize, IsInt } from 'class-validator';

export class BalanceInputDto {
    @IsArray()
    @ArrayMinSize(10)
    @ArrayMaxSize(10)
    @IsInt({ each: true })
    playersArray: number[];

    @IsArray()
    @ArrayMaxSize(10)
    @IsInt({ each: true })
    preferences1: number[];

    @IsArray()
    @ArrayMaxSize(10)
    @IsInt({ each: true })
    preferences2: number[];
}