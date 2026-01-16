/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/auth/enums/role.enum";

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    role:Role;
}
