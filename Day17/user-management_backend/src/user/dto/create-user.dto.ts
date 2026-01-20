/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {  IsEmail, IsIn, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsIn(['active', 'inactive'], { message: 'status must be active or inactive' })
    @IsOptional()
    status: string;

    @IsString()
    password: string;
}
