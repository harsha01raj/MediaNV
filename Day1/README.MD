/* DAY1 LEARNING THE BASIC OF JAVA SCRIPT*/
//Java scipt basic
Variables:- Variables are the container use to store the value in javascript.
Data Types:- DataType is use to define what type of the variables.But in java script we have only three types of datatypes of datatype. let ,var and const.
function:- Functions are the block of code i.e. responsible for the specific task.
There are three ways to declare a function:-
1. Function expression:- In this we use function keyword and function name directly to declare a function.
function fnc(){
    //
}
2. Function declaration:- In this we use data type to declare a variable and assign the function directly.
const func=function(){
    //
}
3. Arrow function:- In this fucntion we didn't intialise the function keyword and in that place we use arrow.
const func=()=>{
    //
}

Scope:- Scope are the block of code is used to relate the the inner data to the parent object.


//ES6 Features
let/const:-
let is used to declare a variable that can reassign and can't redeclare if you declare a variable with let key word means you are hositing the varible but your are not initializing and default value. So that why the duration between hositing and actually intializing that duration is known as TDZ(Temporal Dead Zone)

Const is used to declare a variable that can't reassign and can't redeclare and if you declare a varible with const key word means you are hositing the varible but not initializing and the varible will be in temporal dead zone.


//Arrow function:-
Arrow function is a method to declare a function in this method we will not use function key word and this function will be Anonamus function. This function will not hoisted. And Arrow function have no this keyword of its own.


//Destructuring:-
Destructuring is a javascipt feature i.e. is used to extract the value from an Array and object.
example for an Array:- 
let arr=[1,2,3];
let [a,b,c]=arr; 

example for an Object:-
let obj={
    name:"harsh",
    age:21
}
let[name,age]=obj;

//Spread & rest operators
These are the important feature of javascipt and both operators use the same syntas(...) with arr , object and fucntions parameters.
In Spread we expand the data.like this.
Example:let arr=[1,2,3]
let arr2=[...arr,4,5];
console.log(arr2)//[1,2,3,4,5];

let obj={
    name:"harsh"
    age:21
}

let obj2={...obj,designation:"developer"};


In rest operatore you can initialize the collection of data in a single variable.
Example for rest:-
function(...arrr){
    //
}
function(1,2,3,4);

function(a,b,...rest{
    //console.log(rest);//3,4,5
}
function(1,2,3,4,5);


//Template literals

This is the feature of ecascript in which we can store string and print string. with dynamic value.


//Modules (import/export)
Modules are 


// What is the difference between call back and Promises?
Call back functions are the function that pass is passed and an argument to the another function.and call inside the function and use to handle asycnronus task
like: 

function(callback1){
    callback1(()=>{
        callback2(()=>{
            callback3(()=>{

            })
        })
    })
}


Promises is an object that represent a value that may be available in future,now or never.
new Promisee((resolve , reject)=>{
    //
})
There are three states of promises:-
1. Resolve (Means the value is available)
2. Reject  (Means the value will not avilable in future)
3. Pending (Means the value will be available in future.)


//Async and Await:-
Async and Await both are the keyword of javascript that is use to handle the asyncronus task in syncronus way. And use await key word inside the function first you need to declare the function with async key word. then only you are eligible to use await.

like :- const fetchData=async function(){
        const res=await fetch("url");
        const data=res.json();
        console.log(date);
}


//Error handling with try/catch
While you are dealing with asyncronus task there is chance that your promise will reject in that case we need to handle that rejection. SO in that case we use try and catch block if promise excute successfully and try block will execute other wise catch block excute.

example:-

const fetchData=async function(){
    try{
        let res=await fetch('URL');
        let data=res.json();
        console.log(data);
    }catch{
        console.log(error.message);
    }
}


//Event Loop:

Event loop is nothing but how nodejs or browser engine execute the javascript code and Only from this event loop javascipt can do multiple task even after single threaded operating system. 


In event Loop there is call stack where our code start to execute and check the function is synchronus or Asynchronus if Asynchronus then i will got to web api and from there the function will come to microtask queue or macrotask Queue and microtask have more priority so micro task will execute first and then macrotask will execute. 


In microtask promise , finallY(), catch() will store and in Macrotask setTimeout(),setInterval() and Doms Event.
Micro task is known as promise queue and Macrotask is known as callback queue.



