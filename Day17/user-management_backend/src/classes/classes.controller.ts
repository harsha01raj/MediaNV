/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';

@ApiTags('Classes')
@ApiCookieAuth('token')          // for cookie-based auth if needed
@ApiCookieAuth('refresh_token')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new class' })
  @ApiBody({ type: CreateClassDto })
  async create(@Body() createClassDto: CreateClassDto) {
    const newClass = await this.classesService.create(createClassDto);
    return {
      message: 'Class successfully created',
      Class: newClass,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Get()
  @ApiOperation({ summary: 'Get all classes' })
  async findAll() {
    const classes = await this.classesService.findAll();
    return {
      message: 'Class fetched successfully',
      class: classes,
    };
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @Get(':classname')
  @ApiOperation({ summary: 'Get a class by class name' })
  @ApiParam({ name: 'classname', type: String, description: 'Name of the class' })
  async findOne(@Param('classname') classname: string) {
    const existingClass = await this.classesService.findOne(classname);
    return {
      message: 'Class fetched successfully',
      Classes: existingClass,
    };
  }
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Patch(':classname')
  @ApiOperation({ summary: 'Update a class by class name' })
  @ApiParam({ name: 'classname', type: String, description: 'Name of the class' })
  @ApiBody({ type: UpdateClassDto })
  async update(@Param('classname') classname: string, @Body() updateClassDto: UpdateClassDto) {
    const classes = await this.classesService.update(classname, updateClassDto);
    return {
      message: 'Class updated successfully',
      UpdatedClass: classes,
    };
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Delete(':classname')
  @ApiOperation({ summary: 'Delete a class by class name' })
  @ApiParam({ name: 'classname', type: String, description: 'Name of the class' })
  async remove(@Param('classname') classname: string) {
    const classes = await this.classesService.remove(classname);
    return {
      message: 'Class deleted successfully',
      DeletedClass: classes,
    };
  }
}