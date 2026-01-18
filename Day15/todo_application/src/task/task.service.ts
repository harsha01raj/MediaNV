/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    return await this.taskRepo.save(createTaskDto);
  }

  async findAll() {
    const allTask = await this.taskRepo.find({
      relations: ['user']
    });
    return allTask;
  }

  async findOne(id: string) {
    const userExist = await this.taskRepo.findOne({
      where: { id },
      relations: ['user']
    })
    if (!userExist) throw new NotFoundException("User not found from this id");

    return userExist;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepo.findOne({
      where: { id },
    });

    if (!task) throw new NotFoundException("Task not found");

    const updatedTask = Object.assign(task, updateTaskDto);
    return await this.taskRepo.save(updatedTask);

  }

  async remove(id: string) {
    const task = await this.taskRepo.findOne({
      where: { id },
    });

    if (!task) throw new NotFoundException('Task not found');

    await this.taskRepo.remove(task);

    return {
      message: 'Task deleted successfully',
    };
  }
}
