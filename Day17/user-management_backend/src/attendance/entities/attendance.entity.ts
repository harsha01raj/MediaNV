/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enum/status.enum";
import { Student } from "src/student/entities/student.entity";

@Entity('attendance')
export class Attendance {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: Date })
    attendance_date: Date;

    @Column({
        type: 'enum',
        enum: Status,
        nullable: true,
        default: Status.PRESENT,
    })
    status: Status;

    @ManyToOne(() => Student, student => student.attendances, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    student: Student;
}
