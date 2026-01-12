/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entities";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create.product.dto";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
    ) { }
    async getAll() {
        return await this.productRepository.find();
    }

    async createProduct(createProductDto: CreateProductDto) {
        const newProduct = this.productRepository.create(createProductDto);
        await this.productRepository.save(newProduct);
        return { message: "New product added to the database", NewProduct: newProduct };
    }
}
