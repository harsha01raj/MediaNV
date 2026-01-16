/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Request } from "express";

export const cookieExtractor=(req:Request):string |null=> {
    return req?.cookies?.access_token||null;
}