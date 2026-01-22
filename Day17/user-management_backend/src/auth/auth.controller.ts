/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import express from 'express';
import { ConfigService } from '@nestjs/config';
import ms, { StringValue } from 'ms';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private config: ConfigService,
  ) { }

  @Post('login')
  @ApiOperation({ summary: 'Login user and set access + refresh token in cookies' })
  @ApiBody({ type: LoginDto })
  async login(
    @Body() login: LoginDto,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    const { user, token, refreshToken } = await this.authService.login(login);

    // Set access token cookie
    response.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      maxAge: ms(this.config.getOrThrow<string>('ACCESS_TOKEN_EXPIRE_IN') as StringValue),
    });

    // Set refresh token cookie
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      maxAge: ms(this.config.getOrThrow<string>('REFRESH_TOKEN_EXPIRE_IN') as StringValue),
    });

    return {
      message: 'User successfully logged in',
      Access_Token: token,
      Refresh_Token: refreshToken,
      User: user,
    };
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token using refresh_token cookie' })
  async refresh(
    @Req() req: express.Request,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) throw new UnauthorizedException('Refresh token missing');

    const newAccessToken = await this.authService.refreshAccessToken(refreshToken);

    response.cookie('token', newAccessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });

    return { message: 'Access token refreshed successfully' };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user and clear token cookies' })
  logout(@Res({ passthrough: true }) response: express.Response) {
    response.clearCookie('token');
    response.clearCookie('refresh_token');

    return { message: 'Logged out successfully' };
  }
}