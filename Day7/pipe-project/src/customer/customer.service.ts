/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './interface/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer/update-customer';

@Injectable()
export class CustomerService {
    private customer: Customer[] = [];
    //getall
    getAllCustomer(): Customer[] {
        return this.customer;
    }

    //getById
    getCustomerById(id: number): Customer {
        const student = this.customer.find((s) => s.id == id);
        if (!student) throw new NotFoundException("Student not found");
        return student;
    }

    //Post data
    createCustomer(createCustomerDto: CreateCustomerDto): Customer {
        const newCustomer = {
            id: Date.now(),
            ...createCustomerDto,
        };
        this.customer.push(newCustomer);
        return newCustomer;
    }

    //Put Data
    updateData(id: number, createCustomerDto: CreateCustomerDto): Customer {
        const index = this.customer.findIndex((s) => s.id === id);
        if (index == -1) throw new NotFoundException("Data not found");
        this.customer[index] = { id, ...createCustomerDto };
        return this.customer[index];
    }

    //Patch data
    patchData(id: number, updateCustomerDto: UpdateCustomerDto): Customer {
        const index = this.customer.findIndex((s) => s.id == id);
        if (index == -1) throw new NotFoundException("Data not found");
        const updatedCustomer = {
            ...this.customer[index],
            ...updateCustomerDto
        }
        this.customer[index] = updatedCustomer;
        return updatedCustomer;
    }

    //Delete data

    deleteData(id: number): Customer {
        const index = this.customer.findIndex((s) => s.id == id);
        if (index == -1) throw new NotFoundException("Data not found");

        const deletedCustomer = this.customer.splice(index, 1);

        return deletedCustomer[0];
    }


}
