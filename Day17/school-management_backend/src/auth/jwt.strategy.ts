/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy as JwtStrategyBase } from 'passport-jwt';
import { cookieExtractor } from "./cookie-extractor";
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase) {
    constructor(private config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: config.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        console.log(payload)
        return { payload };
    }
}