/* eslint-disable prettier/prettier */
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('teacher')
export class Teacher {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    subject: string;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
}
