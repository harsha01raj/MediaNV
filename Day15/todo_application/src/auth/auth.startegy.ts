/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { cookieExtractor } from "./cookie-extractor";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private config: ConfigService) {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret) {
            throw new Error('JWT_SECRET is not defined in .env');
        }

        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    async validate(payload: any) {
        // console.log(payload);
        return payload;
    }
}