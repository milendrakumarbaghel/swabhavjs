const minNum = 50;
const maxNum = 60;

function playGame() {
    const answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    let attempts = 0;
    let low = minNum;
    let high = maxNum;

    while (true) {
        const promptText = `Guess a number between ${low} and ${high}` + (attempts ? ` (attempts: ${attempts})` : "");
        const input = window.prompt(promptText);

        if (input === null) {
            const quit = window.confirm("Do you want to quit the game? The answer will be revealed.");
            if (quit) {
                window.alert(`Game cancelled. The number was ${answer}.`);
                break;
            }
            continue;
        }

        const trimmed = input.trim();
        const guess = Number(trimmed);

        if (trimmed === "" || Number.isNaN(guess)) {
            window.alert("Please enter a valid number.");
            continue;
        }

        if (guess < low || guess > high) {
            window.alert(`Please enter a number between ${low} and ${high}.`);
            continue;
        }

        attempts++;

        if (guess === answer) {
            window.alert(`Correct! You guessed ${answer} in ${attempts} attempt${attempts > 1 ? "s" : ""}.`);
            break;
        }

        if (guess < answer) {
            window.alert("Too low. Try again.");
            low = Math.max(low, guess + 1);
        } else {
            window.alert("Too high. Try again.");
            high = Math.min(high, guess - 1);
        }

        if (low > high) {
            window.alert(`Unexpected state: range narrowed incorrectly. The number was ${answer}.`);
            break;
        }
    }
}

do {
    playGame();
} while (window.confirm("Play again?"));
