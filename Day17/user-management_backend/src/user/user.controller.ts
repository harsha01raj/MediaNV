/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/auth/enum/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return {
      message: 'User successfully register',
      User: newUser
    }
  }
  
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return {
      message: "User Fetched successfully",
      Users: users
    }
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOne(id);
    return {
      message: `User fetched of this ${id} id`,
      User: user
    }

  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
    const updateUser = await this.userService.update(id, updateUserDto);
    return {
      message: 'User has been updated',
      updatedUser: updateUser
    }
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedUser = await this.userService.remove(id);

    return {
      message: "User has been deleted",
      deletedUser: deletedUser
    }
  }
}
