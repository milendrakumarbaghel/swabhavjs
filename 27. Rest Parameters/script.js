// rest parameters =    represents an indefinite number
//  ...                 of parameters
//                      (packs arguments into an array)

let a = 1;
let b = 2;
let c = 3;
let d = 4;
let e = 5;

// console.log(sum(a, b, c, d, e));

// function sum(...numbers){
//     let total = 0;
//     for(let number of numbers){
//         total += number
//     }
//     return total
// }

// const total = sum(a, b, c, d, e);
// console.log(total);


// function getAverage(...numbers){
//     let total = 0;
//     for(let number of numbers){
//         total += number
//     }
//     return total / numbers.length;
// }

// const average = getAverage(a, b, c, d, e);
// console.log(average);

const fullName =  combineStrings("John ", "Doe ", "Smith");

function combineStrings(...strings){
    let combined = "";
    for(let string of strings){
        combined += string;
    }
    console.log(combined);
}
