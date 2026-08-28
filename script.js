// Scroll to the games section
const playButtons = document.querySelectorAll(".play-btn, .hero-btn");

playButtons.forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelector("#games").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Featured game buttons
const gameButtons = document.querySelectorAll(".game-card button");

gameButtons.forEach((button) => {
    button.addEventListener("click", () => {
        alert("Game loading... Coming next! 🎮");
    });
});
