/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { User } from 'src/user/entities/user.entity';
import { Class } from 'src/classes/entities/class.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Student,User,Class,Attendance])
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
