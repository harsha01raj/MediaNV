/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'text'})
    name:string;

    @Column({type:'text',unique:true})
    email:string;

    
}
