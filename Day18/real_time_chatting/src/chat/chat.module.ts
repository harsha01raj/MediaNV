/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './entities/chat-room.entity';
import { ChatMember } from './entities/chat-member.entity';
import { ChatMessage } from './entities/chat-message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatRoom, ChatMember, ChatMessage
    ]),
  ],
  providers: [ChatGateway, ChatService]
})
export class ChatModule { }
