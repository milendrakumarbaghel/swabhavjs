const choices = ["rock", "paper", "scissors"];
const winningMoves = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
};
const choiceLabels = {
    rock: "Rock",
    paper: "Paper",
    scissors: "Scissors",
};

const playerScoreElement = document.getElementById("playerScore");
const computerScoreElement = document.getElementById("computerScore");
const drawScoreElement = document.getElementById("drawScore");
const playerChoiceElement = document.getElementById("playerChoice");
const computerChoiceElement = document.getElementById("computerChoice");
const resultTextElement = document.getElementById("resultText");
const roundTextElement = document.getElementById("roundText");
const historyList = document.getElementById("historyList");
const resetButton = document.getElementById("resetButton");
const choiceButtons = document.querySelectorAll("[data-choice]");

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;
let roundNumber = 0;

choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        playRound(button.dataset.choice);
    });
});

resetButton.addEventListener("click", resetGame);

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (key === "r") {
        playRound("rock");
    } else if (key === "p") {
        playRound("paper");
    } else if (key === "s") {
        playRound("scissors");
    } else if (key === "escape") {
        resetGame();
    }
});

function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = getRoundResult(playerChoice, computerChoice);

    roundNumber++;
    updateScores(result);
    updateRoundDisplay(playerChoice, computerChoice, result);
    addHistoryItem(playerChoice, computerChoice, result);
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getRoundResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "draw";
    }

    return winningMoves[playerChoice] === computerChoice ? "win" : "lose";
}

function updateScores(result) {
    if (result === "win") {
        playerScore++;
    } else if (result === "lose") {
        computerScore++;
    } else {
        drawScore++;
    }

    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    drawScoreElement.textContent = drawScore;
}

function updateRoundDisplay(playerChoice, computerChoice, result) {
    playerChoiceElement.textContent = choiceLabels[playerChoice];
    computerChoiceElement.textContent = choiceLabels[computerChoice];

    if (result === "win") {
        resultTextElement.textContent = "You win!";
        roundTextElement.textContent = `${choiceLabels[playerChoice]} beats ${choiceLabels[computerChoice]}.`;
    } else if (result === "lose") {
        resultTextElement.textContent = "Computer wins!";
        roundTextElement.textContent = `${choiceLabels[computerChoice]} beats ${choiceLabels[playerChoice]}.`;
    } else {
        resultTextElement.textContent = "It's a draw!";
        roundTextElement.textContent = `You both picked ${choiceLabels[playerChoice]}.`;
    }
}

function addHistoryItem(playerChoice, computerChoice, result) {
    const historyItem = document.createElement("li");
    const resultLabel = result === "win" ? "You won" : result === "lose" ? "Computer won" : "Draw";

    historyItem.textContent = `Round ${roundNumber}: ${resultLabel} - ${choiceLabels[playerChoice]} vs ${choiceLabels[computerChoice]}`;
    historyList.prepend(historyItem);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    drawScore = 0;
    roundNumber = 0;

    playerScoreElement.textContent = "0";
    computerScoreElement.textContent = "0";
    drawScoreElement.textContent = "0";
    playerChoiceElement.textContent = "?";
    computerChoiceElement.textContent = "?";
    resultTextElement.textContent = "Choose your move";
    roundTextElement.textContent = "First to think fast wins.";
    historyList.innerHTML = "";
}
