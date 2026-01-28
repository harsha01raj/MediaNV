/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class JoinRoomDto {
    @IsString()
    roomId: string;

    @IsString()
    userId: string;
}