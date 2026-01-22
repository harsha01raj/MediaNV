/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto {
  @ApiProperty({
    description: "Roll number of the student",
    example: 1,
  })
  @IsInt()
  roll_no: number;

  @ApiProperty({
    description: "Username of the student (linked to User entity)",
    example: "john_doe",
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: "Class name of the student",
    example: "class10",
  })
  @IsString()
  class_name: string;

  @ApiProperty({
    description: "Section of the class",
    example: "A",
  })
  @IsString()
  section: string;
}