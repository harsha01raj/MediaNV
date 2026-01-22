/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import ms, { StringValue } from 'ms'
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
    private config: ConfigService
  ) { }
  async login(login: LoginDto) {
    const { email, password } = login;

    const user = await this.userRepo.findOne({
      where: { email }
    });

    if (!user) throw new NotFoundException('User not found!!');

    if (!await bcrypt.compare(password, user.password)) throw new BadRequestException("Invalid password");

    const token = await this.jwtService.signAsync({ user }, { expiresIn: this.config.get<string>('ACCESS_TOKEN_EXPIRE_IN') as StringValue });

    const refreshToken = await this.jwtService.signAsync({ user }, { expiresIn: this.config.get<string>('REFRESH_TOKEN_EXPIRE_IN') as StringValue });

    return { user, token, refreshToken };
  }


  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken);
      return await this.jwtService.signAsync({
        payload
      }, { expiresIn: ms(this.config.get<string>('ACCESS_TOKEN_EXPIRE_IN') as StringValue) },)
    } catch {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }
}
