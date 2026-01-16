/* eslint-disable no-constant-binary-expression */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto/register-user.dto';
import { Users } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    private readonly config: ConfigService,
  ) { }
  async register(register: RegisterUserDto) {
    const { name, email, password: plainPassword,role } = register;
    const existingUser = await this.userRepo.findOne({ where: { email }, });
    if (existingUser) throw new ConflictException("User already register in our database");
    const saltRound = Number(this.config.get<number>('SALT_ROUND')) ?? 10;
    const allowedRoles = [Role.USER];
    const finalRole = allowedRoles.includes(role)
    ? role
    : Role.USER;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
    const newUser = this.userRepo.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const savedUser = await this.userRepo.save(newUser);
    const { password, ...result } = savedUser;
    return result;
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepo.find();
  }
}
