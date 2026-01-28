/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ChatMessage')
export class ChatMessage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    roomId: string;

    @Column()
    senderId: string;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;
}