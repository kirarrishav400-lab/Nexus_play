const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;

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

function handleCellClick(cell, index) {

if (cell.textContent !== "" || !gameActive) {
    return;
}

cell.textContent = currentPlayer;

checkWinner();

if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

}

function checkWinner() {

for (const combination of winningCombinations) {

    const [a, b, c] = combination;

    if (
        cells[a].textContent !== "" &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
    ) {

        statusText.textContent =
            `🎉 Player ${currentPlayer} Wins!`;

        gameActive = false;
        return;
    }
}

const isDraw = [...cells].every(
    cell => cell.textContent !== ""
);

if (isDraw) {
    statusText.textContent = "🤝 It's a Draw!";
    gameActive = false;
}

}

function resetGame() {

currentPlayer = "X";
gameActive = true;

cells.forEach((cell) => {
    cell.textContent = "";
});

statusText.textContent = "Player X's Turn";

}
