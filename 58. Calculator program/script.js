const previousOperationElement = document.getElementById("previousOperation");
const currentOperationElement = document.getElementById("currentOperation");
const keys = document.querySelector(".keys");

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let currentValue = "0";

const operatorLabels = {
    "+": "+",
    "-": "-",
    "*": "x",
    "/": "/",
};

keys.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    if (button.dataset.number !== undefined) {
        inputDigit(button.dataset.number);
    } else if (button.dataset.operator) {
        chooseOperator(button.dataset.operator);
    } else {
        handleAction(button.dataset.action);
    }

    updateDisplay();
});

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (/^\d$/.test(key)) {
        inputDigit(key);
    } else if (key === ".") {
        inputDecimal();
    } else if (["+", "-", "*", "/"].includes(key)) {
        chooseOperator(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculateResult();
    } else if (key === "Backspace") {
        deleteDigit();
    } else if (key === "Escape") {
        clearCalculator();
    } else if (key === "%") {
        convertToPercent();
    } else {
        return;
    }

    updateDisplay();
});

function inputDigit(digit) {
    if (waitingForSecondOperand) {
        currentValue = digit;
        waitingForSecondOperand = false;
        return;
    }

    currentValue = currentValue === "0" ? digit : currentValue + digit;
}

function inputDecimal() {
    if (waitingForSecondOperand) {
        currentValue = "0.";
        waitingForSecondOperand = false;
        return;
    }

    if (!currentValue.includes(".")) {
        currentValue += ".";
    }
}

function chooseOperator(nextOperator) {
    const inputValue = Number(currentValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        updatePreviousOperation();
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation(firstOperand, inputValue, operator);

        if (result === null) {
            showError();
            return;
        }

        currentValue = formatNumber(result);
        firstOperand = result;
    }

    operator = nextOperator;
    waitingForSecondOperand = true;
    updatePreviousOperation();
}

function calculateResult() {
    if (operator === null || waitingForSecondOperand) {
        return;
    }

    const secondOperand = Number(currentValue);
    const result = performCalculation(firstOperand, secondOperand, operator);

    if (result === null) {
        showError();
        return;
    }

    previousOperationElement.textContent = `${formatNumber(firstOperand)} ${operatorLabels[operator]} ${formatNumber(secondOperand)} =`;
    currentValue = formatNumber(result);
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = true;
}

function performCalculation(firstNumber, secondNumber, activeOperator) {
    if (activeOperator === "+") {
        return firstNumber + secondNumber;
    }

    if (activeOperator === "-") {
        return firstNumber - secondNumber;
    }

    if (activeOperator === "*") {
        return firstNumber * secondNumber;
    }

    if (activeOperator === "/") {
        return secondNumber === 0 ? null : firstNumber / secondNumber;
    }

    return secondNumber;
}

function handleAction(action) {
    if (action === "clear") {
        clearCalculator();
    } else if (action === "delete") {
        deleteDigit();
    } else if (action === "decimal") {
        inputDecimal();
    } else if (action === "percent") {
        convertToPercent();
    } else if (action === "calculate") {
        calculateResult();
    }
}

function deleteDigit() {
    if (waitingForSecondOperand) {
        return;
    }

    currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
}

function convertToPercent() {
    currentValue = formatNumber(Number(currentValue) / 100);
}

function clearCalculator() {
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    currentValue = "0";
    previousOperationElement.textContent = "";
}

function showError() {
    currentValue = "Error";
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = true;
    previousOperationElement.textContent = "Cannot divide by zero";
}

function formatNumber(number) {
    if (!Number.isFinite(number)) {
        return "Error";
    }

    return Number.parseFloat(number.toFixed(10)).toString();
}

function updatePreviousOperation() {
    previousOperationElement.textContent = `${formatNumber(firstOperand)} ${operatorLabels[operator]}`;
}

function updateDisplay() {
    currentOperationElement.textContent = currentValue;
}
