/* eslint-disable prettier/prettier */
import { Attendance } from "src/attendance/entities/attendance.entity";
import { Class } from "src/classes/entities/class.entity";
import { Mark } from "src/marks/entities/mark.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  roll_no: number;

  @OneToOne(() => User, user => user.student, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Class, cls => cls.students, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  classRoom: Class; // renamed from `class`

  @OneToMany(() => Attendance, attendance => attendance.student)
  attendances: Attendance[];

  @OneToMany(() => Mark, mark => mark.student)
  marks: Mark[]; // fixed singular -> array
}