/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMarkDto {
  @ApiProperty({
    description: "Subject name for which marks are being added",
    example: "Math",
  })
  @IsString()
  subject: string;

  @ApiProperty({
    description: "Marks obtained by the student",
    example: 85,
  })
  @IsInt()
  marks: number;

  @ApiProperty({
    description: "Roll number of the student",
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  roll_no: number; // student's roll number
}