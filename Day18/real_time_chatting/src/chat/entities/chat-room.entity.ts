/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ChatRoom')
export class ChatRoom{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;
}