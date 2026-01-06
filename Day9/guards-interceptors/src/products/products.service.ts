/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from './interface/products/products.interface';
import { CreateProductsDto } from './dto/create-products.dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto/update-products.dto';

@Injectable()
export class ProductsService {
    private products: Products[] = [];

    getAllProducts(): Products[] {
        return this.products;
    }

    getProductsById(id: number): Products {
        const data = this.products.find((s) => s.id == id);
        if (!data) throw new NotFoundException('Product not found for the given id');
        return data;
    }

    createProduct(createProductsDto: CreateProductsDto): Products {
        const newProduct: Products = {
            id: Date.now(),
            ...createProductsDto,
        };
        this.products.push(newProduct);
        return newProduct;
    }

    updateByPutProduct(id: number, createProductsDto: CreateProductsDto): any {
        const index = this.products.findIndex((s) => s.id === id);
        if (index == -1) throw new NotFoundException("Product not found for the given id");
        this.products[index] = { id, ...createProductsDto };

        return { message: 'Your product has been updated with put method', Updatedproduct: this.products[index] };
    }

    updateByPatchProduct(id: number, updateProductsDto: UpdateProductsDto): any {
        const index = this.products.findIndex((s) => s.id === id);
        if (index == -1) throw new NotFoundException("Product not found for the given id");
        this.products[index] = {
            ...this.products[index],
            ...updateProductsDto,
        }

        return { message: 'Your product has been updated with patch method', Updatedproduct: this.products[index] };
    }

    deleteProduct(id: number): any {
        const index = this.products.findIndex((s) => s.id === id);
        if (index == -1) throw new NotFoundException("Product not found for the given id");
        const deletedProduct = this.products.splice(index, 1);
        return { message: 'Your product has been deleted', Product: deletedProduct };
    }
}
