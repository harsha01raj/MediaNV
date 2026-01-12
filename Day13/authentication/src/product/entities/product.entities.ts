/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text' })
    name: string;
    @Column({ type: 'numeric' })
    price: number;

}