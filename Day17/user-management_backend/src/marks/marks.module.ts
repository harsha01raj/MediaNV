/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { MarksController } from './marks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';
import { Student } from 'src/student/entities/student.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Mark,Student])
  ],
  controllers: [MarksController],
  providers: [MarksService],
})
export class MarksModule {}
