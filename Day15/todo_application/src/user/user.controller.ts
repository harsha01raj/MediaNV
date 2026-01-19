/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterUserDto } from "./dto/register-user.dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto/login-user.dto";
import { AuthService } from "src/auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import type { Request, Response } from "express";
import { Roles } from "src/auth/decorator/roles.decorator";
import { Role } from "src/auth/enums/role.enum";
import { RolesGuard } from "src/guards/RoleGuards/roles.guard";
import * as jwt from 'jsonwebtoken';
import { ConfigService } from "@nestjs/config";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  async register(@Body() register: RegisterUserDto) {
    const newUser = await this.userService.register(register);
    return {
      message: "New user hass been successfully register to our data base",
      NewUser: newUser,
    }
  }

  @Post('login')
  async login(@Body() login: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const { user, access_token } = await this.authService.verify(login);
    response.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });
    return { message: 'User successfully LoggedIn', user }
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

}
