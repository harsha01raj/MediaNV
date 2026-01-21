/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepo: Repository<Attendance>,

    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) { }
  async create(createAttendanceDto: CreateAttendanceDto) {
    const { attendance_date, status, roll_no } = createAttendanceDto;

    const student = await this.studentRepo.findOne({
      where: { roll_no },
    });

    if (!student) {
      throw new NotFoundException(
        'Your given roll no does not exist in our database',
      );
    }

    const existingAttendance = await this.attendanceRepo.findOne({
      where: {
        student: { id: student.id },
        attendance_date: new Date(attendance_date),
      },
    });

    if (existingAttendance) {
      throw new ConflictException(
        'Attendance already marked for this student',
      );
    }

    const attendance = this.attendanceRepo.create({
      attendance_date: new Date(attendance_date),
      status,
      student,
    });

    return await this.attendanceRepo.save(attendance);
  }

  async findAll() {
    const attendence = await this.attendanceRepo.find();
    if (!attendence.length) throw new NotFoundException("Attendance not found");
    return attendence;
  }

  async findByRollNo(roll_no: string, date?: string) {
    if (!roll_no) {
      throw new BadRequestException('roll_no is required');
    }

    const where: any = {
      student: { roll_no },
    };

    if (date) {
      where.attendance_date = new Date(date);
    }

    const attendance = await this.attendanceRepo.find({
      where,
      order: { attendance_date: 'DESC' },
    });

    if (!attendance.length) {
      throw new NotFoundException('No attendance found');
    }

    return attendance;
  }

  async updateByRollNoOrDate(updateAttendanceDto: UpdateAttendanceDto, roll_no: string, date: string) {
    if (!roll_no && !date) throw new BadRequestException('Either roll_no or date must be provided for update');

    if (!roll_no || !date) {
      throw new BadRequestException('roll_no and date are required to update attendance');
    }

    const attendance = await this.attendanceRepo.findOne({
      where: {
        student: { roll_no },
        attendance_date: new Date(date),
      },
    });
    if (!attendance) throw new NotFoundException('No attendance found for update');

    const updateRecords = Object.assign(attendance, updateAttendanceDto);

    return await this.attendanceRepo.save(updateRecords);
  }
}
