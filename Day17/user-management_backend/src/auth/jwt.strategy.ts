/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy as JwtStrategyBase } from 'passport-jwt';
import { cookieExtractor } from "./cookie-extractor";

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase) {
    constructor(private config: ConfigService) {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: config.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        console.log(payload)
        return { payload };
    }
}