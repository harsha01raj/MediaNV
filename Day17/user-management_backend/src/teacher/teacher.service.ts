/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }
  async create(createTeacherDto: CreateTeacherDto) {
    const { subject, username } = createTeacherDto;

    const existingUser = await this.userRepo.findOne({
      where: { username }
    });

    if (!existingUser) throw new NotFoundException("User not exist with this username");

    const newTeacher = await this.teacherRepo.create({
      subject,
      user: existingUser
    });
    return await this.teacherRepo.save(newTeacher);
  }

  async findAll() {
    const teachers = await this.teacherRepo.find();
    if (!teachers.length) throw new NotFoundException('teachers not found table is empty');
    return teachers;
  }

  async findOne(username: string) {
    const teacher =await this.teacherRepo.findOne({
      where:{username}
    });
    
    return `This action returns a  teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
