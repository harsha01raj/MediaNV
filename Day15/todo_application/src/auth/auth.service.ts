/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/user.entity';
import { LoginUserDto } from 'src/user/dto/login-user.dto/login-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepo: Repository<Users>,
        private readonly jwtService: JwtService,
    ) { }
    async verify(login: LoginUserDto) {
        const { email, password } = login;

        const user = await this.userRepo.findOne({
            where: { email },
            select: ['id', 'name', 'email', 'password'], // include password for comparison
        });

        if (!user) throw new NotFoundException("User is not registered in our database!! Please register first");
        // console.log(user);
        if (! await bcrypt.compare(password, user.password)) throw new BadRequestException("Invalid password");
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role, 
        };
        const access_token = await this.jwtService.signAsync(payload);
        const { password: _, ...result } = user;
        return {
            Message: "User has successfully logged In",
            user: result,
            access_token: access_token
        }

    }
}
