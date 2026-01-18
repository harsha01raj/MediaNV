/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    AuthModule,
    TaskModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
