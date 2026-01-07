/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsPhoneNumber, IsString } from "class-validator";
import { UserRole } from "src/enum/user-role.enum";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsEnum(UserRole, {
        message: 'role must be admin, user, or manager',
    })
    role: UserRole;

    @ApiProperty()
    @IsPhoneNumber('IN', { message: 'Phone number must be a valid Indian number' })
    phone: string;

}
