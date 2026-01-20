/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private config: ConfigService,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, status, password } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    })
    if (existingUser) throw new ConflictException("User already exist in our database");
    const saltRound = Number(this.config.get('SALT_ROUND') ?? 10);

    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = this.userRepository.create({ username, email, status, lastLogin: new Date(), password: hashedPassword });
    return await this.userRepository.save(newUser);

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
      where: { id }
    })
    if (!user) throw new NotFoundException("User not found");
    const updatedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
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
