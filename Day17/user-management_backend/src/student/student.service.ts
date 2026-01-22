/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Class } from 'src/classes/entities/class.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Class)
    private readonly classRepo: Repository<Class>,
  ) { }
  async create(createStudentDto: CreateStudentDto) {
    const { roll_no, username, class_name, section } = createStudentDto;

    const existingStudent = await this.studentRepo.findOne({
      where: {
        roll_no,
        classRoom: {
          class_name,
          section
        },
      },
      relations: ['classRoom'],
    });

    if (existingStudent) throw new ConflictException("Student already exist with this roll no in our da");

    const user = await this.userRepo.findOne({
      where: { username }
    })

    if (!user) throw new NotFoundException("The given username is not exist in our database");

    const classes = await this.classRepo.findOne({
      where: { class_name, section }
    })

    if (!classes) throw new NotFoundException("The given class name is not found in our database");

    const newStudent = this.studentRepo.create({
      roll_no,
      user,
      classRoom: classes
    })
    return await this.studentRepo.save(newStudent);
  }

  async findAll() {
    const students = await this.studentRepo.find({
      relations: ['user', 'classRoom'],
    });
    if (!students.length) throw new NotFoundException("Students not found student table is empty");
    return students;
  }

  async findOne(roll_no: number) {
    const student = await this.studentRepo.findOne({
      where: { roll_no },
      relations: ['user', 'classRoom'],
    })
    if (!student) throw new NotFoundException("Student not found with this roll_no");
    return student;
  }

  async update(roll_no: number, updateStudentDto: UpdateStudentDto) {
    const existingStudent = await this.studentRepo.findOne({
      where: { roll_no }
    });

    if (!existingStudent) throw new NotFoundException("The Student is not available in our database with this roll_no");

    Object.assign(existingStudent, updateStudentDto);
    return this.studentRepo.save(existingStudent);
  }

  async remove(roll_no: number) {
    const student = await this.studentRepo.findOne({
      where: { roll_no },
    });

    if (!student) {
      throw new NotFoundException('Student not found with the given roll no');
    }

    return await this.studentRepo.remove(student);

  }
}
