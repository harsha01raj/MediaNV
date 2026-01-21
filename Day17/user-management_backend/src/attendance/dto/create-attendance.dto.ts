/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { IsDateString, IsEnum, IsString } from "class-validator";
import { Status } from "../enum/status.enum";


export class CreateAttendanceDto {
    @IsDateString()
    attendance_date: string;

    @IsEnum(Status)
    status: Status;

    @IsString()
    roll_no: string;
}
