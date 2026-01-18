/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsBoolean, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    task: string;

    @IsString()
    description: string;

    @IsBoolean()
    status: boolean;
}
