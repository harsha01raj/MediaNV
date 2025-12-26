1.What is Primitive type or Special Type:-
Primitive types are the fundamental building blocks of data in javascipt and typeScript. They are immutable and represent simple values.

The Seven primitive types in TypeScript are:-
. string: Represents textual data, enclosed in quotes.
. number: Represents both integer and floating-point numeric values.
. boolean: Represents a logical value, either true or false.
. null: Represents the intentional absence of any object value.
. undefined: Represents the intentional absence of any object value.
. bigint: Represents whole numbers larger than the maximum value supported by the number type.
. symbol: Represents a unique, immutable identifiers, often data is same.

Special type: This is a type of data type in type script where we can use some sepcial data type which is totally different from other data type.

The Four special types in TypeScript are:-
. Any: Represent that you can return any type of value in function or you can Store any type of data in variable.
. Unknown: it is very similar to the any but in this data type if you want to use data then you need to verify it.
. void: Represent that function return void means nothing.
. never: Represent the function return nothing means function will no execute successfully only can throw error or run limitlessly means there is non finite loop.


Arrays, tuples, enums:-

Arrays:- Array is a type of object used to store the collection of data in similar data tpe. In Type script we can declare an array via two ways.
1. var arr:string[]=['ravi','aman','sujit'];
2. var arr2: Array <string>=['Alice','Bob','Charlie']

Tuple:- In Type script you can store multiple type of data then in type script we have tuple in which you can store different types of data but in tuple size will fix:-
var arr:[string,num,boolean,number]=['raj',5,true,10];
here you can sotre the data directly in array but you can use push method.

Enums:- In type script this is a data type that allows you to define a set of named constants.
enum whoType{
    student:"student",
    teacher:"teacher",
    management:"management",
    labStaff="labStaff
}

or if we have delcare a varible with whoType in that we can only store data from the set.
like this- var who:whoType=whoType.student; // only this is allowed you can't store any data outside enum and if enum have only keys and the number will store of that key.


Functions and typed parameters

In TypeScript:
    .Function Parameters are the inputs a function accepts. You define them in the parentheses after the function name, optinally wiht types.

    like:- function greet(name:string,age:number):string{
        return 'Hello &{name},age ${age}';
    }
    Here name and age are function parameters.

    .Type Parameters are used with generics. They allow a function,class, or interface to work with various types while keeping type sagety.
    
    like:- function identity<T>(value:T):T{
        return value;
    }

    Here, T is a type parameter, which lets identity work with any type.

Funciton parameter are runtime values;
Type Parameters exist only at compile time to enforce type safety.


In TypeScript, interface and type are both used to describe the shape of data, but they have some differnces:

Interface
. Specifically used for defining object shapes and contracts.
. Supports declaration mergin(can be extended with the some name across files).
. Can extend other interfaces or classes.

interface Person{
    name:string;
    age:number;
}

Type
. Can define object shapes and unions, intersections, primitives,tuples,etc.
. Does not support declaration merging.
. More flexible for complex type combinations.

type Person={
    name:string;
    age:number;
};

type Status="acive" | "inactive";

Key difference: Use interface when you want to define object contracts and extend them;
                Use type for more general and flexible type definitions including unions and intersections.


Optional and readonly properties:-


Optional Properties:- This is used when you have define the structure of object and class with interface in that if you want to keep any field optional in that case we can use optional Properties i.e.(?:)
like:-
interface Info{
    name:string,
    age:number,
    email?:string // Herer email is optional.
}

var user:Info{
    name:"Ravi"
    age:23;
}
// in this case email will undefine but will not give and error.

ReadOnly Properties:- This is used when you have define the structure of object and class with interface in that if you want ot keep any field readonly in that case we can use readOnly key word before key in this case the key will become immutable that can't be change.

interface Info{
    readOnly name:string,// Here name is readOnly once the value assign in this key will not update.
    age:number,
}

var user:Info{
    name:"Ravi"
    age:23;
}

if you will try to update the value of name key it will give error
like this:-
        user.name="Ravi";


Union and intersection types:-

Union types:- This is used as option when there is chance that a function return and a variable store different type of data then you can use union in which you can put what type of data can be assign to the key.

function func():string|number{
    // this functin can return string and number both.
}


Intersections types:- This is used to combine two or more types of data.


interface ErrorHandling{
    success:boolean;
    error?:{message:string};
}

interface ArtworksData{
    content:{title:string}[];
}

type ArtworksResponse=ArtworksData & ErrorHandling;

const handleResponse=(response: ArtworksResponse)=>{
    if(response.error){
        console.error(response.error.message);
    }
    console.log(response.content);
};
