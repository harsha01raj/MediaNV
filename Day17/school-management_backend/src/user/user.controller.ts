/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enum/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Users')
@ApiCookieAuth('token')          // for cookie-based auth if needed
@ApiCookieAuth('refresh_token')  // optional
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return {
      message: 'User successfully registered',
      User: newUser,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    const users = await this.userService.findAll();
    return {
      message: 'Users fetched successfully',
      Users: users,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiParam({ name: 'id', type: String, description: 'UUID of the user', example: '6733b350-4926-44aa-9f97-1fdb15631131' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOne(id);
    return {
      message: `User fetched of this ${id} id`,
      User: user,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiParam({ name: 'id', type: String, description: 'UUID of the user', example: '6733b350-4926-44aa-9f97-1fdb15631131' })
  @ApiBody({ type: UpdateUserDto })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
    const updateUser = await this.userService.update(id, updateUserDto);
    return {
      message: 'User has been updated',
      updatedUser: updateUser,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiParam({ name: 'id', type: String, description: 'UUID of the user', example: '6733b350-4926-44aa-9f97-1fdb15631131' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedUser = await this.userService.remove(id);
    return {
      message: 'User has been deleted',
      deletedUser: deletedUser,
    };
  }
}