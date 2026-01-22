/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Student } from 'src/student/entities/student.entity';
import { Attendance } from './entities/attendance.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Teacher,Student,Attendance])
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
