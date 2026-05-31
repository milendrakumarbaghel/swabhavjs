// A closure is a function that remembers and can access variables from its outer scope.

function makeCounter(start = 0) {
    let count = start;

    return function () {
        count += 1;
        return count;
    };
}

const counterA = makeCounter(0);
const counterB = makeCounter(10);

console.log("Counter A:", counterA());
console.log("Counter A:", counterA());
console.log("Counter B:", counterB());
console.log("Counter B:", counterB());

function createGreeter(name) {
    return function (message) {
        return `${message}, ${name}!`;
    };
}

const greetAsha = createGreeter("Asha");
console.log(greetAsha("Hello"));
console.log(greetAsha("Good evening"));
