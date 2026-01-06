/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsInt, IsString } from "class-validator";

export class CreateProductsDto {
    @IsString()
    name: string;
    @IsInt()
    price: number;
}
