/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Exclude } from "class-transformer";
import { Role } from "src/auth/enum/role.enum";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
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
}
