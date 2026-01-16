/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { StringValue } from 'ms'
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth.startegy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<StringValue>('JWT_EXPIRES_IN') ?? '1d',
        },
      }),
    }),
    PassportModule.register({defaultStrategy:'jwt'}),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [],
  exports: [AuthService, JwtModule],
})
export class AuthModule { }
