/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Exclude } from "class-transformer";
import { Role } from "src/auth/enum/role.enum";
import { Student } from "src/student/entities/student.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";

import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: 'inactive' })
    status: string;

    @Column({ type: 'timestamp', nullable: true })
    lastLogin: Date;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role;

    @Exclude()
    @Column()
    password: string;

    @OneToOne(() => Student, student => student.user)
    student: Student;

    @OneToOne(() => Teacher, teacher => teacher.user)
    teacher: Teacher;
}
