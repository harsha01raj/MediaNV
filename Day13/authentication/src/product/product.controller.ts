/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create.product.dto';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
    constructor(private readonly productServices: ProductService) { }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productServices.createProduct(createProductDto);
    }

    @Get()
    allProduct() {
        return this.productServices.getAll();
    }

}
