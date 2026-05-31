// arrow function = compact alternative to a traditional function
//      =>

/*
const greeting = (userName){
    console.log(`hello ${userName}`)
}

OR

const greeting = userName => console.log(`Hello ${userName}`);

greeting("Bryant");
*/

/*
const percent = function(x,y){
    return x / y *100;
}

OR

const percent = (x, y) => x / y * 100;

console.log(`${percent(75,100)}%`);

*/

// let grades = [100, 50, 90, 60, 80, 70];

// grades.sort(function (x, y){
//     return y - x;
// });
// grades.forEach(function (element){
//     console.log(element);
// });

// grades.sort((x, y) =>  y - x);

// grades.forEach((element) => console.log(element));



let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

shuffle(cards);

// console.log(cards);

cards.forEach(card => console.log(card));

function shuffle(array){
    let currentIndex = array.length;

    while(currentIndex != 0){
        let randomIndex = Math.floor(Math.random() * array.length)
        currentIndex -= 1;

        let temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;

    }

    return array;
}


// Map = object that holds key-value pairs of any data type

const store = new Map([
    ["t-shirt", 20],
    ["jeans", 30],
    ["socks", 10],
    ["underwear", 50]
]);

// store.get("t-shirt");
// store.set("hat", 40);
// store.delete("hat");
// console.log(store.has("underwear"));
// console.log(store.size);


store.forEach((value, key) => console.log(`${key} $${value}`))
