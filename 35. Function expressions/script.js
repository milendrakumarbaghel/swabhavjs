// function expression -> function without a name (anonymous function)
// avoid polluting the global scope with names
// write it, then forget about it

const greet = function () {
  console.log("Hello");
};

greet();

// Function with Parameters
const add = function (a, b) {
  return a + b;
};

console.log(add(2, 3)); // 5

// IIFE = Immediately Invoked Function Expression
(function () {
  console.log("I run immediately");
})();

// Anonymous Function as Callback
setTimeout(function () {
  console.log("Executed after 2 seconds");
}, 2000);

// In Array Methods
const numbers = [1, 2, 3, 4];

const squares = numbers.map(function (num) {
  return num * num;
});

console.log(squares); // [1, 4, 9, 16]

//Arrow Function (Modern Anonymous Function)
const multiply = (a, b) => a * b;

console.log(multiply(3, 4)); // 12
