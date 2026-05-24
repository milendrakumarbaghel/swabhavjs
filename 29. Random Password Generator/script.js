function generatePassword(passLength, includeLowerCase, includeUpperCase, includeNumbers, includeSymbols) {
    let randomPassword = ""

    const options = [];

    if (includeLowerCase) {
        options.push("lowercase");
    }
    if (includeUpperCase) {
        options.push("uppercase");
    }
    if (includeNumbers) {
        options.push("number");
    }
    if (includeSymbols) {
        options.push("symbol");
    }

    if (options.length === 0) {
        document.getElementById("password-slider-length").innerHTML = passLength;
        document.getElementById("randomPassword").innerHTML = "Select at least one option";
        return "";
    }

    for (let i = 0; i < passLength; i++) {
        let randomOption = options[Math.floor(Math.random() * options.length)];
        let randomLetter = Math.floor((Math.random() * 26));
        let randomNumber = Math.floor((Math.random() * 10));

        if (randomOption === "lowercase") {
            randomPassword = randomPassword + generateLowercase(randomLetter);
        } else if (randomOption === "uppercase") {
            randomPassword = randomPassword + generateUpperCase(randomLetter);
        } else if (randomOption === "number") {
            randomPassword = randomPassword + generateNumber(randomNumber);
        } else if (randomOption === "symbol") {
            randomPassword = randomPassword + generateSymbol(randomNumber);
        }
    }

    document.getElementById("password-slider-length").innerHTML = passLength;
    document.getElementById("randomPassword").innerHTML = randomPassword;
    return randomPassword;
}

function generateLowercase(randomLetter) {
    let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    return alphabets[randomLetter]
}
function generateUpperCase(randomLetter) {
    let alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    return alphabets[randomLetter]
}
function generateNumber(randomNumber) {
    return randomNumber;
}
function generateSymbol(randomNumber) {
    let symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '_', '.']
    return symbols[randomNumber]
}

let passLength = document.getElementById("myRange").value;
let includeLowerCase = document.getElementById("lower").checked;
let includeUpperCase = document.getElementById("upper").checked;
let includeNumbers = document.getElementById("nums").checked;
let includeSymbols = document.getElementById("symbols").checked;

let randomPassword = generatePassword(passLength, includeLowerCase, includeUpperCase, includeNumbers, includeSymbols)
console.log(randomPassword);

document.querySelector(".reload-btn").addEventListener("click", () => {
    passLength = document.getElementById("myRange").value;
    includeLowerCase = document.getElementById("lower").checked;
    includeUpperCase = document.getElementById("upper").checked;
    includeNumbers = document.getElementById("nums").checked;
    includeSymbols = document.getElementById("symbols").checked;

    randomPassword = generatePassword(passLength, includeLowerCase, includeUpperCase, includeNumbers, includeSymbols);
    console.log(randomPassword);
});
