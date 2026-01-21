/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString } from "class-validator";

export class CreateStudentDto {
    @IsString()
    roll_no: string;

    @IsString()
    username: string;

    @IsString()
    class_name: string;

    @IsString()
    section:string;
}
