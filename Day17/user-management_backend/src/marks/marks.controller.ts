/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MarksService } from './marks.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';

@ApiTags('Marks')
@ApiCookieAuth('token')          // for cookie-based auth if needed
@ApiCookieAuth('refresh_token')
@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) { }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Post()
  @ApiOperation({ summary: 'Add marks for a student' })
  @ApiBody({ type: CreateMarkDto })
  async create(@Body() createMarkDto: CreateMarkDto) {
    const marks = await this.marksService.create(createMarkDto);
    return {
      message: 'Mark is added successfully',
      Marks: marks,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.USER)
  @Get()
  @ApiOperation({ summary: 'Get all marks' })
  async findAll() {
    const marks = await this.marksService.findAll();
    return {
      message: 'All marks fetched successfully',
      Marks: marks,
    };
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.USER)
  @Get('roll/:roll_no')
  @ApiOperation({ summary: 'Get marks for a student by roll number' })
  @ApiParam({ name: 'roll_no', type: Number, description: 'Roll number of the student', example: 1 })
  async findOne(@Param('roll_no', ParseIntPipe) roll_no: number) {
    const marks = await this.marksService.findOne(roll_no);
    return {
      message: 'Mark fetched successfully for the given user',
      Marks: marks,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Patch('roll/:roll_no')
  @ApiOperation({ summary: 'Update marks for a student by roll number' })
  @ApiParam({ name: 'roll_no', type: Number, description: 'Roll number of the student', example: 1 })
  @ApiBody({ type: UpdateMarkDto })
  async update(@Param('roll_no', ParseIntPipe) roll_no: number, @Body() updateMarkDto: UpdateMarkDto) {
    const marks = await this.marksService.update(roll_no, updateMarkDto);
    return {
      message: 'Mark is updated successfully for the given roll no',
      Marks: marks,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Delete('roll/:roll_no')
  @ApiOperation({ summary: 'Delete marks for a student by roll number' })
  @ApiParam({ name: 'roll_no', type: Number, description: 'Roll number of the student', example: 1 })
  async remove(@Param('roll_no', ParseIntPipe) roll_no: number) {
    const marks = await this.marksService.remove(roll_no);
    return {
      message: 'Mark is deleted successfully for the given roll no',
      Marks: marks,
    };
  }
}