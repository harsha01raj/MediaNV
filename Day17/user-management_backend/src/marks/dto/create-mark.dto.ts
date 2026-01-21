/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsInt, IsString } from "class-validator";

export class CreateMarkDto {
    @IsString()
    subject: string;

    @IsInt()
    marks: number;

    @IsString()
    roll_no: string;//student's roll number
}
