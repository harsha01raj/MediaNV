/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark)
    private readonly markRepo: Repository<Mark>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) { }
  async create(createMarkDto: CreateMarkDto) {
    const { subject, marks, roll_no } = createMarkDto;

    const student = await this.studentRepo.findOne({
      where: { roll_no }
    });

    if (!student) throw new NotFoundException("Student not found of this roll_no");

    const newMark = this.markRepo.create({
      subject,
      marks,
      student,
    })
    return await this.markRepo.save(newMark);
  }

  async findAll() {
    const marks = await this.markRepo.find();
    if (!marks.length) throw new NotFoundException("Marks are not available to our database");
    return marks;
  }

  async findOne(roll_no: string) {
    const mark = await this.studentRepo.findOne({
      where: { roll_no },
      relations: ['marks'],
    });

    if (!mark) throw new NotFoundException("Marks for given roll no is not available");

    return mark;
  }

  async update(roll_no: string, updateMarkDto: UpdateMarkDto) {
    const student = await this.studentRepo.findOne({
      where: { roll_no },
    });

    if (!student) throw new NotFoundException('Student not found');

    const mark = student.marks.find(
      m => m.subject === updateMarkDto.subject,
    );
    if (!mark) throw new NotFoundException('Subject not found');

    if (updateMarkDto.marks === undefined) {
      throw new BadRequestException('Marks is required');
    }
    mark.marks = updateMarkDto.marks;
    return await this.markRepo.save(mark);
  }

  async remove(roll_no: string) {
    const student = await this.studentRepo.findOne({
      where: { roll_no },
      relations: ['marks'],
    });

    if (!student) throw new NotFoundException('Student not found');

    const deletedMarks = await this.markRepo.delete({ student: { id: student.id } })
    return deletedMarks;
  }
}
