/* eslint-disable prettier/prettier */
import { Student } from "src/student/entities/student.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('classes')
export class Class {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    class_name: string;

    @Column()
    section: string;

    @OneToMany(() => Student, student => student.classRoom)
    students: Student[];
}
