/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher,User]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule { }
