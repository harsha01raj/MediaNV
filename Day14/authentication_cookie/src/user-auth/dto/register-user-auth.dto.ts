/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from "class-validator";

export class RegisterUserDto {
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsString()
    password:string;
}
