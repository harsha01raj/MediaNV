/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/await-thenable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMember } from './entities/chat-member.entity';
import { ChatMessage } from './entities/chat-message.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatMessage)
        private messageRepo: Repository<ChatMessage>,

        @InjectRepository(ChatMember)
        private memberRepo: Repository<ChatMember>,
    ) { }


    async addUserToRoom(userId: string, roomId: string) {
        const exists = await this.memberRepo.findOne({
            where: { userId, roomId },
        })

        if (!exists) {
            const member = await this.memberRepo.create({ userId, roomId });
            await this.memberRepo.save(member);
        }
    }

    async saveMessage(data) {
        const message = this.messageRepo.create(data);
        return this.messageRepo.save(message);
    }

    async getRoomMessages(roomId: string) {
        return this.messageRepo.find({
            where: { roomId },
            order: { createdAt: 'ASC' },
        });
    }
}
