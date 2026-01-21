/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class CreateTeacherDto {
    @IsString()
    subject: string;

    @IsString()
    username: string;
}
