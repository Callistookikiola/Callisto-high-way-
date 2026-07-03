let position = 10;
let score = 0;
let playing = false;

function startGame() {

    playing = true;
    position = 10;
    score = 0;

    document.getElementById("score").innerHTML = score;
    document.getElementById("car").style.left = position + "px";

    document.getElementById("moveBtn").disabled = false;
    document.getElementById("gameOver").style.display = "none";

}

function moveForward() {

    if (!playing) return;

    position += 20;

    document.getElementById("car").style.left = position + "px";

    score++;
    document.getElementById("score").innerHTML = score;

    let obstacle = document.getElementById("obstacle");
    let obstaclePosition = obstacle.offsetLeft;

    if (position >= obstaclePosition - 10) {

        playing = false;

        document.getElementById("gameOver").style.display = "block";

        document.getElementById("moveBtn").disabled = true;

    }

}

function restartGame() {

    startGame();

}
