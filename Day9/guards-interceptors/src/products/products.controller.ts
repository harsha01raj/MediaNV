/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-products.dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto/update-products.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('products')
@UseFilters(HttpExceptionFilter)//From this way we can add filter globally
@UseGuards(AuthGuard)
export class ProductsController {
    constructor(private readonly productService: ProductsService) { };

    @Get()
    getAllProduct() {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.productService.getProductsById(+id);
    }

    @Post()
    createProduct(@Body() createProductsDto: CreateProductsDto) {
        return this.productService.createProduct(createProductsDto);
    }

    @Put(':id')
    updateProductByPut(@Param('id', ParseIntPipe) id: number, @Body() createProductsDto: CreateProductsDto) {
        return this.productService.updateByPutProduct(id, createProductsDto);
    }

    @Patch(':id')
    updateProductByPatch(@Param('id', ParseIntPipe) id: number, @Body() updateProductsDto: UpdateProductsDto) {
        return this.productService.updateByPatchProduct(id, updateProductsDto);
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.deleteProduct(id);
    }
}
