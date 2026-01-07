/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto/update-user.dto';
import { User } from 'src/interfaces/user/user.interface';

@Injectable()
export class UserService {
    private users: User[] = [];

    getAllUser(): User[] {
        return this.users;
    }


    getUserById(id: number): User {
        const user = this.users.find((s) => s.id = id);
        if (!user) throw new NotFoundException("User not found");
        return user;
    }

    postUser(createUserDto: CreateUserDto): User {
        const newUser = {
            id: Date.now(),
            ...createUserDto,
        }
        this.users.push(newUser);
        return newUser;
    }

    putUser(id: number, createUserDto: CreateUserDto): User {
        const index = this.users.findIndex((s) => s.id === id);
        if (index === -1) throw new NotFoundException("User not found");

        this.users[index] = {
            id,
            ...createUserDto,
        }
        return this.users[index];
    }

    patchUser(id: number, updateUserDto: UpdateUserDto): User {
        const index = this.users.findIndex((s) => s.id === id);
        if (index === -1) throw new NotFoundException("User not found");

        this.users[index] = {
            ...this.users[index], ...updateUserDto,
        }
        return this.users[index];
    }

    deleteUser(id: number): User[] {
        const index = this.users.findIndex((s) => s.id === id);
        if (index === -1) throw new NotFoundException("User not found");

        const deletedUser = this.users.splice(index, 1);
        return deletedUser;
    }
}
