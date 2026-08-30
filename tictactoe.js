const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const friendModeBtn =
    document.getElementById("friendMode");

const computerModeBtn =
    document.getElementById("computerMode");

const resultOverlay =
    document.getElementById("resultOverlay");

const resultEmoji =
    document.getElementById("resultEmoji");

const resultTitle =
    document.getElementById("resultTitle");

const resultMessage =
    document.getElementById("resultMessage");

const playAgainBtn =
    document.getElementById("playAgainBtn");


let currentPlayer = "X";
let gameActive = true;
let gameMode = "friend";


const winningCombinations = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


cells.forEach((cell, index) => {

    cell.addEventListener("click", () => {

        handleCellClick(cell, index);

    });

});


friendModeBtn.addEventListener("click", () => {

    gameMode = "friend";

    friendModeBtn.classList.add("active");

    computerModeBtn.classList.remove("active");

    resetGame();

});


computerModeBtn.addEventListener("click", () => {

    gameMode = "computer";

    computerModeBtn.classList.add("active");

    friendModeBtn.classList.remove("active");

    resetGame();

});


playAgainBtn.addEventListener("click", () => {

    resetGame();

});


function handleCellClick(cell, index) {

    if (
        cell.textContent !== "" ||
        !gameActive ||
        currentPlayer === "O" &&
        gameMode === "computer"
    ) {

        return;

    }


    cell.textContent = currentPlayer;


    if (checkWinner()) {

        return;

    }


    switchPlayer();


    if (
        gameMode === "computer" &&
        currentPlayer === "O"
    ) {

        statusText.textContent =
            "🤖 Computer is thinking...";

        setTimeout(computerMove, 600);

    }

}


function switchPlayer() {

    currentPlayer =
        currentPlayer === "X"
            ? "O"
            : "X";


    if (gameMode === "friend") {

        statusText.textContent =
            `Player ${currentPlayer}'s Turn`;

    } else if (currentPlayer === "X") {

        statusText.textContent =
            "Your Turn (X)";

    }

}


function computerMove() {

    if (!gameActive) {

        return;

    }


    const emptyCells = [];


    cells.forEach((cell, index) => {

        if (cell.textContent === "") {

            emptyCells.push(index);

        }

    });


    if (emptyCells.length === 0) {

        return;

    }


    const randomIndex =
        Math.floor(
            Math.random() *
            emptyCells.length
        );


    cells[
        emptyCells[randomIndex]
    ].textContent = "O";


    if (checkWinner()) {

        return;

    }


    switchPlayer();

}


function checkWinner() {

    for (
        const combination
        of winningCombinations
    ) {

        const [a, b, c] =
            combination;


        if (

            cells[a].textContent !== "" &&

            cells[a].textContent ===
            cells[b].textContent &&

            cells[a].textContent ===
            cells[c].textContent

        ) {

            gameActive = false;

            showWinner();

            return true;

        }

    }


    const isDraw =
        [...cells].every(
            cell =>
            cell.textContent !== ""
        );


    if (isDraw) {

        gameActive = false;

        showDraw();

        return true;

    }


    return false;

}


function showWinner() {

    if (gameMode === "computer") {

        if (currentPlayer === "X") {

            showResult(
                "🏆",
                "YOU WIN!",
                "Amazing game! You defeated the computer."
            );

        } else {

            showResult(
                "☹️",
                "YOU LOSE!",
                "The computer won this round. Try again!"
            );

        }

    } else {

        showResult(
            "🏆",
            `PLAYER ${currentPlayer} WINS!`,
            "Congratulations! Great game."
        );

    }

}


function showDraw() {

    showResult(
        "🤝",
        "IT'S A DRAW!",
        "That was a close game. Play again!"
    );

}


function showResult(
    emoji,
    title,
    message
) {

    resultEmoji.textContent = emoji;

    resultTitle.textContent = title;

    resultMessage.textContent = message;

    resultOverlay.classList.add("show");

}


function resetGame() {

    currentPlayer = "X";

    gameActive = true;


    cells.forEach((cell) => {

        cell.textContent = "";

    });


    resultOverlay.classList.remove("show");


    if (gameMode === "computer") {

        statusText.textContent =
            "Your Turn (X)";

    } else {

        statusText.textContent =
            "Player X's Turn";

    }

}
