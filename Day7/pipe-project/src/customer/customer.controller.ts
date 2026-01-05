/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer/update-customer';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerServices: CustomerService) { }

    @Get()
    display() {
        return this.customerServices.getAllCustomer();
    }

    @Get(':id')
    displayById(@Param('id', ParseIntPipe) id: string) {
        return this.customerServices.getCustomerById(Number(id));
    }

    @Post()
    createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerServices.createCustomer(createCustomerDto);
    }

    @Put(':id')
    updateCustomer(@Param('id', ParseIntPipe) id: string, @Body() createCustomerDto: CreateCustomerDto) {
        return this.customerServices.updateData(+id, createCustomerDto);
    }


    @Patch(':id')
    patchCustomer(@Param('id',ParseIntPipe) id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
        return this.customerServices.patchData(+id, updateCustomerDto);
    }

    @Delete(':id')
    deleteCustomer(@Param('id',ParseIntPipe) id: string) {
        return this.customerServices.deleteData(+id);
    }

}
