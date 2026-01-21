/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch,Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    const attendance= await this.attendanceService.create(createAttendanceDto);
    return{
      message:'Attendance successfully created',
      Attendance:attendance
    }
  }

  @Get()
  async findAll() {
    const attendance= await this.attendanceService.findAll();
    return{
      message:'Attendance fetched successfully',
      fetchedAttendance:attendance
    }
  }

  @Get()
  async findAttendance(
    @Query('roll_no') roll_no: string,
    @Query('date') date?: string,
  ) {
    const attendance= await this.attendanceService.findByRollNo(roll_no, date);
    return{
      message:'Attendance fetched successfully',
      fetchAttendance:attendance
    }
  }

  @Patch()
  async updateAttendance(
    @Query('roll_no') roll_no: string,
    @Query('date') date: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    const updatedAttendance= await this.attendanceService.updateByRollNoOrDate(
      updateAttendanceDto,
      roll_no,
      date,
    );
    return{
      message:'Attendance updated successfully',
      UpdateAttendance:updatedAttendance
    }
  }
}
