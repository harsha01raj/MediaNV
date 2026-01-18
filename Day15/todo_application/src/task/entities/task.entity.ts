/* eslint-disable prettier/prettier */
import { Users } from "src/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('task')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    task: string;

    @Column({ type: 'text',nullable:false })
    description: string;

    @Column({ default: false })
    status: boolean;

    @Column({name:'user_id'})
    userId: string;

    @ManyToOne(() => Users, (user) => user.tasks)
    @JoinColumn({name:'user_id'})
    user: Users;
}
