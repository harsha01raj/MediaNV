/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('user_auth')
export class UserAuth {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name:string;
    @Column({ unique: true, nullable: false })
    email: string;
    @Column()
    password: string;
}
