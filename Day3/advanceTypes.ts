function funct():string|number{
    return "Hello";
}

let result = funct();
console.log("Result:", result);

if (typeof result === "string") {
    console.log("The result is a string of length:", result.length);
} else {
    console.log("The result is a number:", result);
}       

function processValue(value: string | number): void {
    if (typeof value === "string") {
        console.log("Processing string:", value.toUpperCase());
    } else {
        console.log("Processing number:", value * 2);
    }
}

processValue("test");
processValue(42);

processValue("TypeScript");
processValue(100);

interface Product {
    id: number;
    name: string;
    price: number | string; // price can be a number or a string
}

let product1: Product = {
    id: 101,
    name: "Laptop",
    price: 999.99,
};

let product2: Product = {
    id: 102,
    name: "Smartphone",
    price: "799.99 USD",
};

function displayProduct(product: Product): void {
    console.log(`Product ID: ${product.id}, Name: ${product.name}, Price: ${product.price}`);
}

displayProduct(product1);
displayProduct(product2);   