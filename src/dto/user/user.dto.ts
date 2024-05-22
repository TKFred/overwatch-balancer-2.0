import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    passHash: string;

    @IsOptional()
    registrationCode?: number;
}