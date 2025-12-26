interface Info{
    id: number;
    name: string;   
    email?: string;
}

var user1: Info = {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
};

var user2: Info = {
    id: 2,
    name: "Bob"
};

console.log("User 1:", user1);
console.log("User 2:", user2);

function displayInfo<T extends Info>(user: T): void {
    console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email ?? "N/A"}`);
}

displayInfo(user1);
displayInfo(user2);


function createArray<T>(items: T[]): T[] {
    return new Array<T>().concat(items);
}

let numberArray = createArray<number>([1, 2, 3, 4]);
let stringArray = createArray<string>(["a", "b", "c"]);