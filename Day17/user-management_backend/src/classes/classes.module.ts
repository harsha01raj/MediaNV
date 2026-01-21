/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Student } from 'src/student/entities/student.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Class,Student])
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
