/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class CreateClassDto {
    @IsString()
    class_name: string;

    @IsString()
    section: string;
}
