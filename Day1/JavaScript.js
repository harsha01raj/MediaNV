//Question no 1:JavaScript basics (variables, data types, functions, scope)
//Part 1:Basics
// Vaiables:
var name="John Doe"; // String variable
let age=30; // Number variable
const isStudent=false; // Boolean variable

// Function to display user information
function displayUserInfo() {
    console.log("Name: " + name);
    console.log("Age: " + age);
    console.log("Is Student: " + isStudent);
}

// Calling the function
displayUserInfo();

//Question no 2:Block scope vs Function scope

function scopeExample() {
    if(true) {
        var functionScopedVar = "I am function scoped";
        let blockScopedVar = "I am block scoped";
        console.log(blockScopedVar); // Accessible here
    }
    console.log(functionScopedVar); // Accessible here
    // console.log(blockScopedVar); // Uncaught ReferenceError: blockScopedVar is not defined
}

// If-Else statement
if(age < 18) {
    console.log(name + " is a minor.");
} else {
    console.log(name + " is an adult.");
}

// Switch statement
let day = 3;
switch(day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    default:
        console.log("Another day");
}

// For loop
for(let i = 1; i <= 5; i++) {
    console.log("Iteration: " + i);
}    


// Part 2: ES6 Features
//let/const:

const pi = 3.14;
let radius = 5;

// Arrow function to calculate area of a circle
const calculateArea = (r) => pi * r * r;

console.log("Area of circle: " + calculateArea(radius));

// Template literals
let message = `The area of a circle with radius ${radius} is ${calculateArea(radius)}`;
console.log(message);

// Destructuring
const person = {
    firstName: "Jane",
    lastName: "Doe",
    age: 25
};

const { firstName, lastName, age: personAge } = person;
console.log(`First Name: ${firstName}, Last Name: ${lastName}, Age: ${personAge}`);

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinedArr = [...arr1, ...arr2];
console.log("Combined Array: ", combinedArr);   

// Rest parameters
const sumAll = (...numbers) => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
};

console.log("Sum of all numbers: " + sumAll(1, 2, 3, 4, 5));

// Classes
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

const person1 = new Person("Alice", 28);
person1.greet();

// Modules
// Assuming this code is in a module file named 'mathUtils.js'
// export const add = (a, b) => a + b;
// export const subtract = (a, b) => a - b;

// In another file, you would import the functions like this:
// import { add, subtract } from './mathUtils.js';

// console.log("Addition: " + add(5, 3));
// console.log("Subtraction: " + subtract(5, 3));       
scopeExample();     

//Part 3: Asynchronous JavaScript:
// Callback function
function fetchDataCallback(callback) {
    setTimeout(() => {
        const data = "Data fetched using callback";
        callback(data);
    }, 1000);
}

fetchDataCallback((data) => {
    console.log(data);
});

// Promise
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = "Data fetched using Promise";
            resolve(data);
        }, 1000);
    });
}

fetchDataPromise().then((data) => {
    console.log(data);
});

// Async/Await
async function fetchDataAsync() {
    const data = await fetchDataPromise();
    console.log(data);
}

fetchDataAsync();   
//Fetch API (Note: This code requires a browser or environment that supports Fetch API)
async function fetchUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');               
        const user = await response.json();
        console.log("User Data: ", user);
    } catch (error) {
        console.error("Error fetching user data: ", error);
    }
}

fetchUserData();     
// Note: The Fetch API part is commented out because it requires a browser or an environment that supports Fetch API. You can uncomment and run it in such an environment.
// Fetch API (Note: This code requires a browser or environment that supports Fetch API)
// async function fetchUserData() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');               
//         const user = await response.json();
//         console.log("User Data: ", user);
//     } catch (error) {
//         console.error("Error fetching user data: ", error);
//     }
// }

// fetchUserData();     
// Note: The Fetch API part is commented out because it requires a browser or an environment that supports Fetch API. You can uncomment and run it in such an environment.      
// Fetch API (Note: This code requires a browser or environment that supports Fetch API)
// async function fetchUserData() {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users/');               
//         const user = await response.json();
//         console.log("User Data: ", user);
//     } catch (error) {
//         console.error("Error fetching user data: ", error);
//     }
// }