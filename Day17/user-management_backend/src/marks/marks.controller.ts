/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarksService } from './marks.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';

@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) { }

  @Post()
  async create(@Body() createMarkDto: CreateMarkDto) {
    return await this.marksService.create(createMarkDto);
  }

  @Get()
  async findAll() {
    return await this.marksService.findAll();
  }

  @Get('roll/:roll_no')
  async findOne(@Param('roll_no') roll_no: string) {
    return await this.marksService.findOne(roll_no);
  }

  @Patch('roll/:roll_no')
  async update(@Param('roll_no') roll_no: string, @Body() updateMarkDto: UpdateMarkDto) {
    return await this.marksService.update(roll_no, updateMarkDto);
  }

  @Delete('roll/:roll_no')
  async remove(@Param('roll_no') roll_no: string) {
    return await this.marksService.remove(roll_no);
  }
}
