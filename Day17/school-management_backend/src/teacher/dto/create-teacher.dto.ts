/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherDto {
  @ApiProperty({
    description: "Subject the teacher will handle",
    example: "Math",
  })
  @IsString()
  subject: string;

  @ApiProperty({
    description: "Username of the teacher (linked to User entity)",
    example: "mr_smith",
  })
  @IsString()
  username: string;
}