/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/await-thenable */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll() {
    return await this.studentService.findAll();
  }

  @Get('roll/:roll_no')
  async findOne(@Param('roll_no') roll_no: string) {
    return await this.studentService.findOne(roll_no);
  }

  @Patch('roll/:roll_no')
  async update(@Param('roll_no') roll_no: string, @Body() updateStudentDto: UpdateStudentDto) {
    return await this.studentService.update(roll_no, updateStudentDto);
  }

  @Delete('roll/:roll_no')
  async remove(@Param('roll_no') roll_no: string) {
    return await this.studentService.remove(roll_no);
  }
}
