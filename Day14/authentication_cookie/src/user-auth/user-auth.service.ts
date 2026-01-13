/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user-auth.dto';
import { Repository } from 'typeorm';
import { UserAuth } from './entities/user-auth.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userRepository: Repository<UserAuth>,
  ) { }
  async create(createUserAuthDto: RegisterUserDto): Promise<UserAuth> {
    const { email } = createUserAuthDto;
    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) throw new ConflictException("Email already exist in our database");

    return this.userRepository.save(createUserAuthDto);
  }

  async findOne(email: string): Promise<UserAuth | null> {
    return this.userRepository.findOne({ where: { email } });
  }

}
