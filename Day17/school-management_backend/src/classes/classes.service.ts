/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ConflictException, Delete, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepo: Repository<Class>,
  ) { }

  async create(createClassDto: CreateClassDto) {
    const { class_name, section } = createClassDto;

    const existClass = await this.classRepo.findOne({
      where: {
        class_name,
        section,
      }
    });

    if (existClass) throw new ConflictException('This class is already exist in our database');

    const newClass = this.classRepo.create({
      class_name,
      section
    })

    return await this.classRepo.save(newClass)
  }

  async findAll() {
    const classes = await this.classRepo.find({
      //relations:[]
    });
    if (!classes) throw new NotFoundException("Classes not found in our data base");
    return classes;
  }

  async findOne(classname: string) {
    const classes = await this.classRepo.find({
      where: {
        class_name: classname,
      }
    })
    if (!classes.length) throw new NotFoundException("Class not found");
    return classes;
  }

  async update(classname: string, updateClassDto: UpdateClassDto) {
    const existingClass = await this.classRepo.findOne({
      where: {
        class_name: classname
      }
    });

    if (!existingClass) throw new NotFoundException("class ");

    const updatedClass = Object.assign(existingClass, updateClassDto);

    return updatedClass;
  }

  async remove(classname: string) {
    const deletedClass = await this.classRepo.delete({ class_name: classname });
    if (!deletedClass) throw new NotFoundException("Class not found");
    return {deletedClass};
  }
}


