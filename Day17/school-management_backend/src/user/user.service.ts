/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Student } from 'src/student/entities/student.entity';
import { Role } from 'src/auth/enum/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private config: ConfigService,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, status, password } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    })
    if (existingUser) throw new ConflictException("User already exist in our database");
    const saltRound = Number(this.config.get('SALT_ROUND') ?? 10);

    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = this.userRepository.create({ username, email, status, lastLogin: new Date(), password: hashedPassword });
    return await this.userRepository.save(newUser);
    console.log(newUser);
    return newUser;

  }

  async findAll(): Promise<User[]> {

    const users = await this.userRepository.find();
    if (!users) throw new NotFoundException("User table is empty!!");
    return users;

  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id }
    })
    if (!user) throw new NotFoundException("User not found!!!");
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['student', 'teacher'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const oldRole = user.role;

    // update user fields
    Object.assign(user, updateUserDto);
    const savedUser = await this.userRepository.save(user);

    // 🔁 ROLE CHANGE SIDE EFFECTS
    if (oldRole !== savedUser.role) {

      // USER → STUDENT
      if (savedUser.role === Role.STUDENT && !user.student) {
        const student = this.studentRepository.create({
          roll_no: 0,           // default
          user: savedUser,      // ✅ relation
        });

        await this.studentRepository.save(student);
      }

      // USER → TEACHER
      if (savedUser.role === Role.TEACHER && !user.teacher) {
        const teacher = this.teacherRepository.create({
          subject: 'Not Assigned',
          user: savedUser,      // ✅ relation
        });

        await this.teacherRepository.save(teacher);
      }
    }

    return savedUser;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: { id }
    })
    if (!user) throw new NotFoundException("User not found");
    await this.userRepository.delete(id);
    return user;
  }
}
