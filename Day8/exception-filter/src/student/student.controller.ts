/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseFilters } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';
import { HttpExceptionFilter } from 'src/fitlers/http-exception/http-exception.filter';

@Controller('student')
@UseFilters(HttpExceptionFilter)
export class StudentController {
    constructor(private readonly studentService: StudentService) { }
    @Get()
    displayAllStudent() {
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    displayById(@Param('id',ParseIntPipe) id: string) {
        return this.studentService.getStudentById(+id);
    }

    @Post()
    addStudent(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.createStudent(createStudentDto);
    }

    @Put(':id')
    updateStudent(@Param('id',ParseIntPipe) id: string, @Body() createStudentDto: CreateStudentDto) {
        return this.studentService.putStudent(+id, createStudentDto);
    }

    @Patch(':id')
    patchStudent(@Param('id',ParseIntPipe) id: string, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentService.patchStudent(+id, updateStudentDto);
    }

    @Delete(':id')
    deleteStudent(@Param('id',ParseIntPipe) id: string) {
        return this.studentService.deleteStudent(+id);
    }
}

