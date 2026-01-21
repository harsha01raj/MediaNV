/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }

  @Post()
  async create(@Body() createClassDto: CreateClassDto) {
    const newClass = await this.classesService.create(createClassDto);
    return {
      message: 'Class successfully  created',
      Class: newClass
    }
  }

  @Get()
  async findAll() {
    const classes = await this.classesService.findAll();
    return {
      message: 'Class fetched successfully',
      class: classes
    }
  }

  @Get(':classname')
  async findOne(@Param('classname') classname: string) {
    const existingClass = await this.classesService.findOne(classname);
    return {
      message: 'Class fetched successfully',
      Classes: existingClass
    }
  }

  @Patch(':classname')
  async update(@Param('classname') classname: string, @Body() updateClassDto: UpdateClassDto) {
    const classes = await this.classesService.update(classname, updateClassDto);
    return {
      message: 'Class updated successfully',
      UpdatedClass: classes
    }
  }

  @Delete(':classname')
  async remove(@Param('classname') classname: string) {
    const classes = await this.classesService.remove(classname);
    return {
      message: 'Class deleted successfully',
      DeletedClass: classes
    }
  }
}
