let position = 120; // car X position
let score = 0;
let lives = 3;
let highScore = 0;
let playing = false;
let gameLoop;

let coinPosition = -100;
let obstaclePosition = -300;

let coinX = 150;
let obstacleX = 200;

// START GAME
function startGame() {

    if (playing) return;

    playing = true;

    position = 120;
    score = 0;
    lives = 3;

    coinPosition = -100;
    obstaclePosition = -300;

    document.getElementById("score").innerHTML = score;
    document.getElementById("lives").innerHTML = lives;
    document.getElementById("gameOver").style.display = "none";

    document.getElementById("car").style.left = position + "px";

    gameLoop = setInterval(updateGame, 60);
}

// GAME LOOP
function updateGame() {

    coinPosition += 6;
    obstaclePosition += 8;

    document.getElementById("coin").style.top = coinPosition + "px";
    document.getElementById("obstacle").style.top = obstaclePosition + "px";

    document.getElementById("coin").style.left = coinX + "px";
    document.getElementById("obstacle").style.left = obstacleX + "px";

    // RESET COIN
    if (coinPosition > 500) {
        coinPosition = -50;
        coinX = Math.floor(Math.random() * 200) + 50;
        score += 10;
        document.getElementById("score").innerHTML = score;
    }

    // RESET OBSTACLE
    if (obstaclePosition > 500) {
        obstaclePosition = -100;
        obstacleX = Math.floor(Math.random() * 200) + 50;
    }

    // COLLISION
    if (
        obstaclePosition > 420 &&
        Math.abs(position - obstacleX) < 30
    ) {
        lives--;
        document.getElementById("lives").innerHTML = lives;

        obstaclePosition = -300;

        if (lives <= 0) {
            gameOver();
        }
    }
}

// GAME OVER
function gameOver() {

    playing = false;
    clearInterval(gameLoop);

    document.getElementById("gameOver").style.display = "block";

    if (score > highScore) {
        highScore = score;
        document.getElementById("highScore").innerHTML = highScore;
    }
}

// RESTART
function restartGame() {
    clearInterval(gameLoop);
    playing = false;
    startGame();
}

// LEFT / RIGHT CONTROLS
document.addEventListener("keydown", (e) => {

    if (!playing) return;

    if (e.key === "ArrowLeft") {
        position -= 20;
        if (position < 0) position = 0;
    }

    if (e.key === "ArrowRight") {
        position += 20;
        if (position > 240) position = 240;
    }

    document.getElementById("car").style.left = position + "px";
});
