/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;
}