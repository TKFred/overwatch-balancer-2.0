import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendMailDto {
    @IsNotEmpty()
    @IsString()
    to: string;

    @IsString()
    @IsOptional()
    subject?: string;

    @IsString()
    @IsOptional()
    text?: string;

    @IsString()
    @IsOptional()
    html?: string;
}