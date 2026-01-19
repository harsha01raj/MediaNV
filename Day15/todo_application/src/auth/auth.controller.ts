/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import * as jwt from 'jsonwebtoken';
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(private readonly config: ConfigService) { }

    @Get('me')
    getMe(@Req() req: Request, @Res() res: Response) {
        const token = req.cookies?.access_token;
        // console.log('Raw cookie header:', req.headers.cookie);
        // console.log('Parsed cookies:', req.cookies);

        // console.log("Token:", token);
        if (!token) {
            return res.status(401).json({ authenticated: false });
        }

        try {
            const decoded = jwt.verify(
                token,
                this.config.get<string>('JWT_SECRET')!,
            );

            return res.json({ authenticated: true, user: decoded });
        } catch {
            return res.status(401).json({ authenticated: false });
        }
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            path: '/',
        });

        return { message: 'Logged out successfully' };
    }

}