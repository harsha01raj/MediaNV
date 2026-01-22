/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Patch, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';


@ApiTags('Attendance')
@ApiCookieAuth('token')          // for cookie-based auth if needed
@ApiCookieAuth('refresh_token')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Post()
  @ApiOperation({ summary: 'Create attendance record' })
  @ApiBody({ type: CreateAttendanceDto })
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    const attendance = await this.attendanceService.create(createAttendanceDto);
    return {
      message: 'Attendance successfully created',
      Attendance: attendance,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Get('all')
  @ApiOperation({ summary: 'Get all attendance records' })
  async findAll() {
    const attendance = await this.attendanceService.findAll();
    return {
      message: 'Attendance fetched successfully',
      fetchedAttendance: attendance,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Get()
  @ApiOperation({ summary: 'Get attendance by roll number and optional date' })
  @ApiQuery({ name: 'roll_no', type: Number, required: true, example: 1 })
  @ApiQuery({ name: 'date', type: String, required: false, example: '2026-01-22' })
  async findAttendance(
    @Query('roll_no', ParseIntPipe) roll_no: number,
    @Query('date') date?: string,
  ) {
    const attendance = await this.attendanceService.findByRollNo(roll_no, date);
    return {
      message: 'Attendance fetched successfully',
      fetchAttendance: attendance,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Patch()
  @ApiOperation({ summary: 'Update attendance by roll number and date' })
  @ApiQuery({ name: 'roll_no', type: Number, required: true, example: 1 })
  @ApiQuery({ name: 'date', type: String, required: true, example: '2026-01-22' })
  @ApiBody({ type: UpdateAttendanceDto })
  async updateAttendance(
    @Query('roll_no', ParseIntPipe) roll_no: number,
    @Query('date') date: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    const updatedAttendance = await this.attendanceService.updateByRollNoOrDate(
      updateAttendanceDto,
      roll_no,
      date,
    );
    return {
      message: 'Attendance updated successfully',
      UpdateAttendance: updatedAttendance,
    };
  }
}