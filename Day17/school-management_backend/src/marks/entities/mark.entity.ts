/* eslint-disable prettier/prettier */
import { Student } from "src/student/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('marks')
export class Mark {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    subject: string;

    @Column()
    marks: number;

    @ManyToOne(()=>Student,student=>student.marks,{onDelete:'CASCADE'})
    @JoinColumn()
    student:Student;
}
