// let temp = 32;
// temp = toFahrenheit(temp);
// console.log(temp);

// function toCelsius(temp){
//     return (temp - 32) * (5/9);
// }

// function toFahrenheit(temp){
//     return temp * 9 / 5 + 32;
// }


// document.getElementById("submitButton").onclick = function(){
//     let temp;

//     if(document.getElementById("cButton").checked){
//         temp = document.getElementById("textBox").value;
//         temp = Number(temp);
//         temp = toCelsius(temp);
//         document.getElementById("tempLabel").innerHTML = temp +"°C";
//     }
//     else if (document.getElementById("fButton").checked){
//         temp = document.getElementById("textBox").value;
//         temp = Number(temp);
//         temp = toFahrenheit(temp);
//         document.getElementById("tempLabel").innerHTML = temp +"°F"
//     }
//     else{
//         document.getElementById("tempLabel").innerHTML = "Select a unit";
//     }
// }

// function toCelsius(temp){
//     return (temp - 32) * (5/9);
// }

// function toFahrenheit(temp){
//     return temp * 9 / 5 + 32;
// }


const textbox = document.getElementById("textbox");
const toFahrenheit = document.getElementById("toFahrenheit");
const toCelsius = document.getElementById("toCelsius");
const result = document.getElementById("result");

function convert() {
    if (toFahrenheit.checked) {
        let celsiusValue = Number(textbox.value);
        let fahrenheitValue = (celsiusValue * 9 / 5) + 32;

        result.textContent = fahrenheitValue.toFixed(1) + " °F";
    }
    else if (toCelsius.checked) {
        let fahrenheitValue = Number(textbox.value);
        let celsiusValue = (fahrenheitValue - 32) * (5 / 9);

        result.textContent = celsiusValue.toFixed(1) + " °C";
    }
    else {
        result.textContent = "Select a unit";
    }
}
