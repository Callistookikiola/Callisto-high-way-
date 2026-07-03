let position = 10;
let score = 0;
let lives = 3;
let highScore = 0;
let playing = false;
let gameLoop;

let coinPosition = 180;
let obstaclePosition = 420;

function startGame() {

    if (playing) return;

    playing = true;

    position = 10;
    score = 0;
    lives = 3;

    document.getElementById("score").innerHTML = score;
    document.getElementById("lives").innerHTML = lives;
    document.getElementById("gameOver").style.display = "none";

    document.getElementById("car").style.left = position + "px";

    gameLoop = setInterval(updateGame, 120);

}

function updateGame() {

    position += 10;

    document.getElementById("car").style.left = position + "px";

    // Collect coin
    if (position >= coinPosition && position < coinPosition + 20) {

        score += 10;

        document.getElementById("score").innerHTML = score;

        coinPosition = Math.floor(Math.random() * 250) + 150;

        document.getElementById("coin").style.left = coinPosition + "px";

    }

    // Hit obstacle
    if (position >= obstaclePosition) {

        lives--;

        document.getElementById("lives").innerHTML = lives;

        if (lives <= 0) {

            gameOver();

            return;

        }

        position = 10;

        document.getElementById("car").style.left = position + "px";

        obstaclePosition = Math.floor(Math.random() * 150) + 350;

        document.getElementById("obstacle").style.left = obstaclePosition + "px";

    }

}

function gameOver() {

    playing = false;

    clearInterval(gameLoop);

    document.getElementById("gameOver").style.display = "block";

    if (score > highScore) {

        highScore = score;

        document.getElementById("highScore").innerHTML = highScore;

    }

}

function restartGame() {

    clearInterval(gameLoop);

    playing = false;

    startGame();

}
