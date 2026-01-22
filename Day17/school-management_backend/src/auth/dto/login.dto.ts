/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        description: "Email address of the user",
        example: "john@school.edu",
    })
    @IsString()
    email: string;

    @ApiProperty({
        description: "Password of the user",
        example: "Admin@123",
    })
    @IsString()
    password: string;
}