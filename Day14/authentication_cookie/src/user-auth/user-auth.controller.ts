/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, NotFoundException, BadRequestException, Res, UnauthorizedException, Req } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { RegisterUserDto } from './dto/register-user-auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user-auth.dto';
import { JwtService } from '@nestjs/jwt';
import type { Response, Request } from 'express';


@Controller('user-auth')
export class UserAuthController {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('register')
  async register(@Body() createUserAuthDto: RegisterUserDto) {
    const { name, email, password } = createUserAuthDto;
    const saltRound = Number(process.env.SALT_ROUND) || 10;

    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = {
      name,
      email,
      password: hashedPassword
    }

    // const createdUser=
    return { message: "User successfully register", newUser: await this.userAuthService.create(newUser) };
  }

  @Post('login')
  async login(@Body() loginUserAuthDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const { email, password } = loginUserAuthDto;

    const existingUser = await this.userAuthService.findOne(email);

    if (!existingUser) throw new NotFoundException("Email not found!! Please Register first");

    if (! await bcrypt.compare(password, existingUser.password)) throw new BadRequestException('Invalid password');
    const payload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email
    };
    const accessToken = await this.jwtService.signAsync(payload);

    response.cookie('jwt', accessToken, { httpOnly: true });
    return {
      message: "User successfully loggedIn",
      token: accessToken
    }
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      if (!cookie) throw new UnauthorizedException('No token found');

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) throw new UnauthorizedException();
      const { password, ...result } = data;

      return result;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  // @Get('user')
  // async user(@Req() request: Request) {
  //   const cookie = request.cookies['jwt'];
  //   console.log('Cookie:', cookie); // debug
  // }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: "User logout successfully"
    }
  }
}
