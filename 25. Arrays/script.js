// array =  a variable that can store
//          multiple values

// let fruits = ["apple", "orange", "banana"];

// fruits[0] = "coconut"; replaces apple with coconut
// fruits.push("lemon"); add an element to the end of list
// fruits.pop(); removes last element
// fruits.unshift("mango"); add element to beginning of array
// fruits.shift(); removes element from beginning of array

// let length = fruits.length;
// let index = fruits.indexOf("apple")


// console.log(length);
// console.log(index);


let prices = [5, 10, 15, 20, 25];

// iterate from beginning to end of list
// for(let i = 0; i < prices.length; i += 1){
//     console.log(prices[i]);
// }


// iterate backwards
// for(let i = prices.length - 1; i >= 0; i -= 1){
//     console.log(prices[i]);
// }

// for(let price of prices){
//     console.log(price);
// }


// let fruits = ["banana", "apple", "orange", "mango"];

// fruits = fruits.sort();

// fruits = fruits.sort().reverse();

// for(let fruit of fruits){
//     console.log(fruit);
// }
// 2D array = An array of arrays

let fruits = ["apples", "oranges", "bananas"];
let vegetables = ["carrots", "onions", "potatoes"];
let meats = ["eggs", "chicken", "fish"];

let groceryList = [fruits, vegetables, meats];

// for(let list of groceryList){
//     console.log(list)
// }

groceryList[0][0] = "mangoes"; // replaces apples with mangoes
groceryList[2][2] = "steak"; // replaces fish with steak

for(let list of groceryList){
    for(let food of list){
        console.log(food)
    }
}
