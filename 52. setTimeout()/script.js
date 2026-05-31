// setTimeout() = invokes a function after a number of milliseconds
// clearTimeout() = cancels a scheduled timeout

const startButton = document.getElementById("startButton");
const cancelButton = document.getElementById("cancelButton");
const status = document.getElementById("status");

let timeoutId = null;

startButton.addEventListener("click", () => {
    if (timeoutId !== null) {
        return;
    }

    status.textContent = "Timeout scheduled...";
    startButton.disabled = true;

    timeoutId = setTimeout(() => {
        status.textContent = "Hello! setTimeout fired.";
        startButton.disabled = false;
        timeoutId = null;
    }, 3000);
});

cancelButton.addEventListener("click", () => {
    if (timeoutId === null) {
        status.textContent = "Nothing to clear.";
        return;
    }

    clearTimeout(timeoutId);
    timeoutId = null;
    status.textContent = "Timeout cleared.";
    startButton.disabled = false;
});
