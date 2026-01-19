/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async getTasks(@Query('completed') completed?: string) {
    let isCompleted: boolean | undefined;
    if (completed === 'true') isCompleted = true;
    else if (completed === 'false') isCompleted = false;

    return this.taskService.findTasks(isCompleted);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOne(id);
    return {
      message: "Task fetched from the given id",
      User: task
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
