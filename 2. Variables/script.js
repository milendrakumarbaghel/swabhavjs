// variable = A container that stores a value.
//            Behaves as if it were the value that it contains.

// 1. Declaration let x;
// 2. Assignment x = 10;
// 3. Initialization let x = 10;

// Variable names cannot start with numbers, but can contain numbers after the first character.
// Variable names cannot contain spaces, but can use underscores or camelCase.
// Variable names are case-sensitive.

// Example:
let x;
x = 100;
console.log(x); // Output: 100

// Example of multiple variables:
let name = "John";
let age = 30;
let isStudent = true;
console.log(name); // Output: John
console.log(age); // Output: 30
console.log(isStudent); // Output: true

let price = 19.99;
let gpa = 3.5;
console.log(price); // Output: 19.99
console.log(gpa); // Output: 3.5

console.log(`your name is ${name} and you are ${age} years old.`); // Output: your name is John and you are 30 years old.
console.log(`the price is $${price} and your GPA is ${gpa}.`); // Output: the price is $19.99 and your GPA is 3.5.

console.log(typeof name); // Output: string
console.log(typeof age); // Output: number
console.log(typeof isStudent); // Output: boolean
console.log(typeof price); // Output: number
console.log(typeof gpa); // Output: number

// document.getElementById("myP1").innerText = name;
// document.getElementById("myP1").innerText = `Your name is ${name} and you are ${age} years old.`;
document.getElementById("myP2").innerText = age;
document.getElementById("myP3").innerText = isStudent;
document.getElementById("myP4").innerText = price;
