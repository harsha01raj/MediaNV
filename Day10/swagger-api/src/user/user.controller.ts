/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto/create-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { };

    @Get()
    displayUser() {
        return { message: "User from data base", Users: this.userService.getAllUser() };
    }

    @Get(':id')
    displayUserById(@Param('id', ParseIntPipe) id: number) {
        return { message: "User of given id", User: this.userService.getUserById(id) };
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return { message: "User Added successfully!!", User: this.userService.postUser(createUserDto) };
    }

    @Put(':id')
    putUser(@Param('id', ParseIntPipe) id: number, @Body() createUserDto: CreateUserDto) {
        return { message: "You User has been Updated with put method...", User: this.userService.putUser(id, createUserDto) };
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return { message: "Your user has been deleted successfully", DeletedUser: this.userService.deleteUser(id) };
    }
}
