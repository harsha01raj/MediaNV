let username:string = "user123";
let age:number = 25;
let isAdmin:boolean = false;

console.log(`Username: ${username}, Age: ${age}, Is Admin: ${isAdmin}`);   

let scores:number[] = [85, 90, 78, 92];
console.log("Scores:", scores);

function greet(name:string):string {
    return `Hello, ${name}!`;
}
console.log(greet("Alice"));

interface User {
    id: number;
    name: string;
    email?: string; // optional property
}

let user1: User = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
};

let user2: User = {
    id: 2,
    name: "Jane Smith",
};

console.log("User 1:", user1);
console.log("User 2:", user2);