/* eslint-disable prettier/prettier */
import { CreateStudentDto } from "../create-student.dto/create-student.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateStudentDto extends PartialType(CreateStudentDto) { }
