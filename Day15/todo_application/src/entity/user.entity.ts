/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */

import { Role } from "src/auth/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users_table")
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    email: string;

    @Column({ type: 'text', nullable: false, select: false })
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;
}