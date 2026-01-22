/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClassDto {
  @ApiProperty({
    description: "Name of the class",
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