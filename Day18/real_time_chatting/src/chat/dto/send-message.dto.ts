/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class SendMessageDto {
    @IsString()
    roomId: string;

    @IsString()
    senderId: string;

    @IsString()
    content: string;
}