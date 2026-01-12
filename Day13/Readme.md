Define entities and relationships:-
In NestJS with TypeORM, entites and relationships describe how your database tables are structured and how they are connected to each other.

What is an Entity?
An Entity is a class that represents a database table.
. Each class -> one table
. Each property -> one column
. Decorated with @Entity()

Examples: Product Entity

import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column('decimal')
    price:number;

    @Column({default:true})
    isAvailable:boolean;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;
}


*. What are Relationships?
Relationships define how tables are linked with each other using foreign keys.

TypeORM supports:
. OneTOOne
. OneToMany
. ManyToOne
. ManyToMany

One-to-Many & Many-to-One(Most Common)

Example: Category , Products

Category Entity

@Entity('categories')
export class CategoryEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToMany(()=>ProductEntity, product=>product.categroy)
    products: ProductEntity[];
}


Product Entity

@Entity('products')
export class ProductEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @ManyToOne(()=>CategoryEntity, category=>category.products)
    category:CategoryEntity;
}

Meaning:

. One Category -> many Products
. Each Product -> belongs to one Category
. Foreign key(categoryId) is stored in products table


One-to-One Relationship
Example:User,Profile

@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @OneToOne(()=>ProfileEntity)
    @JoinColumn()
    profile:ProfileEntity;
}

@Entity('profiles')
export class ProfileEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    bio:string;
}

One user has one profile.

Many-to-Many Relationship
example: Product <->Order

@Entity('orders')
export class OrderEntity{
    @PrimaryGeneatedColumn()
    id:number;

    @ManyToMany(()=>ProductEntity)
    @JoinTable()
    products:ProductEntity[];
}

@Entity('products')
export class ProductEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToMany(()=>OrderEntity,order=>order.products)
    orders:OrderEntity[];
}

TypeORM automatically creates a junction table.

Why Entities & Relationships Are important
    Database structure
    Automatic joins
    Clean Service logic
    Data integrity
    ORM handles SQL complexity

Simple Definiton(Interview-Reddy)

Entity: A class that maps to a database table.
Relationship: A rule that defines how two tables are connected using foreign keys.


Data validation using DTOs and class-validator:-
In NestJS, DTOs+class-validator are used to vaidate incoming request data before it reaches your service or database.

1. What is a DTO?
DTO(Data Transfer Object) is a class that defines the shape of data coming from the client.

It helps in:
. Date validation
. Type safety
. Clean code
. Preventing invalid data from entering DB


2. Required Packages:- npm install class-validator class-transformer

3. Basic DTO example

Create Product DTO
import{IsString,IsNumber,IsNotEmpty,IsBoolean,Min} from 'class-validator';

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @Min(1)
    price:number;

    @IsBoolean()
    IsAvailable:boolean;
}

If validation fails-> NestJS automatically throw 400 Bad Request.

4. Enable Validation Globally(Important)

In main.ts:
import {ValidationPipe} from '@nestjs/common';

async function bootstrap(){
    const app=await NestFactory.create(Appmodule);
    
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist:true,
            forbidNonWhitelisted:true,
            transform:true,
        }),
    );

    await app.listen(3000);
}

bootstrap();


Use DTO in Controller
@Post()
createProduct(@Body() createProductDto:CreateProductDto){
    return this.productService.create(createProductDto);
}

No Manual Validation requried

6. Updated DTO(Partial Update)
import {PartialType} from '@nestjs/mapped-types';
export class UpdateProductDto extends PatialType(CreateProductDto)

Makes all fields optional
Perfect for Patch APIs

7. Nested Validation exmaple

Category Dto
export class CategoryDto{
    @IsString()
    @IsNotEmpty()
    name:string;
}

Product DTO with Categroy
import {ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

export class CreateProductDto{
    @IsString()
    name:string;
    
    @ValidateNested()
    @Type(()=>CategoryDto)
    category:CategoryDto;
}


8. Common Validators Cheat Sheet

Validator                   Use
@IsString()                 String
@IsNumber()                 Number
@IsBoolean()                Boolean
@IsEmail()                  Email
@IsOptional()               Optional field
@Min(n)/@Max(n)             Range
@Length(min,max)            String Length
@IsEnum()                   Enum values
@IsArray()                  Array
@IsUUID()                   UUID


9. Real-World(E-commerce)
export class CreateOrderDto{
    @IsArray()
    @IsUUID('4',{each:true})
    productIds: string[];

    @IsString()
    address:string;
}


Error handling and logging:-
In NESTJS, error handling and loggin are core parts of building stable, production-ready applications. Below ia a clear, practical explanation with examples.

1. Error Handling in NestJS
NestJs uses Exceptions+Exception Filters.

*. Built-in HTTP Exceptions
NestJS Provides ready-made exceptions:

import {
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

throw new BadRequestException('Invalid input');
thow new NotFoundException('Product not found');
throw new UnauthorizedException('Access denied');

These automatically retun proper HTTP status codes.