/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ChatMember")
export class ChatMember{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    roomId:string;

    @Column()
    userId:string;
}