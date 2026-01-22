/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { IsDateString, IsEnum, IsInt, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Status } from "../enum/status.enum";

export class CreateAttendanceDto {
  
  @ApiProperty({
    description: "Date of the attendance in ISO 8601 format",
    example: "2026-01-22",
  })
  @IsDateString()
  attendance_date: string;

  @ApiPropertyOptional({
    description: "Attendance status of the student",
    enum: Status,
    example: Status.PRESENT,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({
    description: "Roll number of the student",
    example: 1,
  })
  @IsInt()
  roll_no: number;
}