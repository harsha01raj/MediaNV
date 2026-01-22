/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
@ApiTags('Teachers')
@ApiCookieAuth('token')          // for cookie-based auth if needed
@ApiCookieAuth('refresh_token')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Add a new teacher' })
  @ApiBody({ type: CreateTeacherDto })
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    const newTeacher = await this.teacherService.create(createTeacherDto);
    return {
      message: 'Teacher added successfully',
      NewTeacher: newTeacher,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Get()
  @ApiOperation({ summary: 'Fetch all teachers' })
  async findAll() {
    const teachers = await this.teacherService.findAll();
    return {
      message: 'Teachers data fetched successfully',
      Teachers: teachers,
    };
  }


  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Get(':username')
  @ApiOperation({ summary: 'Get teacher by username' })
  @ApiParam({ name: 'username', type: String, description: 'Username of the teacher', example: 'mr_smith' })
  async findOne(@Param('username') username: string) {
    const teacher = await this.teacherService.findOne(username);
    return {
      message: 'Teacher data fetched successfully',
      Teacher: teacher,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Patch(':username')
  @ApiOperation({ summary: 'Update teacher by username' })
  @ApiParam({ name: 'username', type: String, description: 'Username of the teacher', example: 'mr_smith' })
  @ApiBody({ type: UpdateTeacherDto })
  async update(@Param('username') username: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teacherService.update(username, updateTeacherDto);
    return {
      message: 'Teacher data updated successfully',
      UpdatedTeacher: teacher,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Delete(':username')
  @ApiOperation({ summary: 'Delete teacher by username' })
  @ApiParam({ name: 'username', type: String, description: 'Username of the teacher', example: 'mr_smith' })
  async remove(@Param('username') username: string) {
    const teacher = await this.teacherService.remove(username);
    return {
      message: 'Teacher deleted successfully',
      DeletedTeacher: teacher,
    };
  }
}