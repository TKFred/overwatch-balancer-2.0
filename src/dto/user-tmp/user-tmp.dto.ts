import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserTmpDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    registrationCode?: number;
}