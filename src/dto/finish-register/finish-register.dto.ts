import { IsNotEmpty, IsNumber } from 'class-validator';

export class FinishRegisterDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    code: number;
}