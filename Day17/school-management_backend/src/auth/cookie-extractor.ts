/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Request } from "express";

export const cookieExtractor = (req: any): string | null => {
    return req?.cookies?.token || null;
}