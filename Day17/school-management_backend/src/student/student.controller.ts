/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';

@ApiTags('Students')
@ApiCookieAuth('token')          // for cookie-based auth if needed
@ApiCookieAuth('refresh_token')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  @ApiBody({ type: CreateStudentDto })
  async create(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentService.create(createStudentDto);
    return {
      message: 'Student successfully created',
      Student: student,
    };
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.USER)
  @Get()
  @ApiOperation({ summary: 'Fetch all students' })
  async findAll() {
    const student = await this.studentService.findAll();
    return {
      message: 'Students fetched successfully',
      Students: student,
    };
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Get('roll/:roll_no')
  @ApiOperation({ summary: 'Fetch a student by roll number' })
  @ApiParam({ name: 'roll_no', type: Number, description: 'Roll number of the student', example: 1 })
  async findOne(@Param('roll_no', ParseIntPipe) roll_no: number) {
    const student = await this.studentService.findOne(roll_no);
    return {
      message: 'Student fetched successfully',
      Student: student,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Patch('roll/:roll_no')
  @ApiOperation({ summary: 'Update a student by roll number' })
  @ApiParam({ name: 'roll_no', type: Number, description: 'Roll number of the student', example: 1 })
  @ApiBody({ type: UpdateStudentDto })
  async update(@Param('roll_no', ParseIntPipe) roll_no: number, @Body() updateStudentDto: UpdateStudentDto) {
    const student = await this.studentService.update(roll_no, updateStudentDto);
    return {
      message: 'Student successfully updated',
      UpdatedStudent: student,
    };
  }

  @UseGuards(JwtAuthGuard,RoleGuard)
  @Roles(Role.ADMIN,Role.TEACHER)
  @Patch("id/:id")
  @ApiOperation({ summary: 'Update a student by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Id of the student', example: 1 })
  @ApiBody({ type: UpdateStudentDto })
  async updateById(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    const student = await this.studentService.updateByid(id, updateStudentDto);
    return {
      message: 'Student successfully updated',
      UpdatedStudent: student,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Delete('roll/:roll_no')
  @ApiOperation({ summary: 'Delete a student by roll number' })
  @ApiParam({ name: 'roll_no', type: Number, description: 'Roll number of the student', example: 1 })
  async remove(@Param('roll_no', ParseIntPipe) roll_no: number) {
    const student = await this.studentService.remove(roll_no);
    return {
      message: 'Student deleted successfully',
      DeletedStudent: student,
    };
  }
}