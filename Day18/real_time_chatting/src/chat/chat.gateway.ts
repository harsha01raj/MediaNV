/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prettier/prettier */
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { JoinRoomDto } from './dto/join-room.dto';
import { Server,Socket } from 'socket.io';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) { }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.roomId);
    await this.chatService.addUserToRoom(
      data.userId,
      data.roomId,
    );

    this.server.to(data.roomId).emit('userJoined', {
      userId: data.userId,
    });
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() data: SendMessageDto) {
    const message = await this.chatService.saveMessage(data);
    this.server.to(data.roomId).emit('newMessage', message);
  }


  @SubscribeMessage('typing')
  handleTyping(@MessageBody() data: { roomId: string; userId: string }) {
    this.server.to(data.roomId).emit('typing', data.userId);
  }
}
