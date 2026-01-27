/* eslint-disable prettier/prettier */
import { IsOptional, IsInt, IsUUID } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateStudentDto {
  @ApiPropertyOptional({
    description: "Updated roll number of the student",
    example: 5,
  })
  @IsOptional()
  @IsInt()
  roll_no?: number;

  @ApiPropertyOptional({
    description: "New class id for the student",
    example: "74b7c745-0e53-424f-83b7-edffe56abf02",
  })
  @IsOptional()
  @IsUUID()
  classId?: string;
}