// ===== CALLISTO HIGHWAY V3 =====

const intro = document.getElementById("intro");
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const gameOver = document.getElementById("gameOver");

const playBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const car = document.getElementById("car");
const coin = document.getElementById("coin");

const traffic1 = document.getElementById("traffic1");
const traffic2 = document.getElementById("traffic2");
const traffic3 = document.getElementById("traffic3");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const finalScore = document.getElementById("finalScore");

const bgMusic = document.getElementById("bgMusic");
const coinSound = document.getElementById("coinSound");
const crashSound = document.getElementById("crashSound");
const buttonSound = document.getElementById("buttonSound");

let score = 0;
let lives = 3;
let playing = false;

let carX = 150;

let coinX = 150;
let coinY = -80;

let traffic = [
    { el: traffic1, x: 40, y: -100 },
    { el: traffic2, x: 150, y: -350 },
    { el: traffic3, x: 260, y: -600 }
];

setTimeout(() => {
    intro.style.display = "none";
    menu.style.display = "flex";
}, 2500);

playBtn.onclick = function () {

    if (buttonSound) {
        buttonSound.currentTime = 0;
        buttonSound.play().catch(() => {});
    }

    if (bgMusic) {
        bgMusic.play().catch(() => {});
    }

    menu.style.display = "none";
    game.style.display = "block";

    playing = true;

    gameLoop();
};

function moveLeft() {
    if (!playing) return;

    carX -= 35;

    if (carX < 20) carX = 20;

    car.style.left = carX + "px";
}

function moveRight() {
    if (!playing) return;

    carX += 35;

    if (carX > 280) carX = 280;

    car.style.left = carX + "px";
}

document.getElementById("leftBtn").onclick = moveLeft;
document.getElementById("rightBtn").onclick = moveRight;

document.addEventListener("keydown", function (e) {

    if (e.key === "ArrowLeft") moveLeft();

    if (e.key === "ArrowRight") moveRight();

});

function hit(a, b) {

    return !(

        a.offsetLeft + a.offsetWidth < b.offsetLeft ||
        a.offsetLeft > b.offsetLeft + b.offsetWidth ||
        a.offsetTop + a.offsetHeight < b.offsetTop ||
        a.offsetTop > b.offsetTop + b.offsetHeight

    );

}

function updateCoin() {

    coinY += 7;

    if (coinY > 600) {

        coinY = -80;

        const lanes = [40, 150, 260];

        coinX = lanes[Math.floor(Math.random() * lanes.length)];

    }

    coin.style.left = coinX + "px";
    coin.style.top = coinY + "px";

    if (hit(car, coin)) {

        score += 10;

        scoreText.textContent = score;

        if (coinSound) {
            coinSound.currentTime = 0;
            coinSound.play().catch(() => {});
        }

        coinY = -80;

        const lanes = [40, 150, 260];

        coinX = lanes[Math.floor(Math.random() * lanes.length)];
    }
}

function updateTraffic() {

    for (let i = 0; i < traffic.length; i++) {

        traffic[i].y += 8;

        if (traffic[i].y > 650) {

            traffic[i].y = -150;

            const lanes = [40, 150, 260];

            traffic[i].x = lanes[Math.floor(Math.random() * lanes.length)];
        }

        traffic[i].el.style.left = traffic[i].x + "px";
        traffic[i].el.style.top = traffic[i].y + "px";

        if (hit(car, traffic[i].el)) {

            if (crashSound) {
                crashSound.currentTime = 0;
                crashSound.play().catch(() => {});
            }

            lives--;
            livesText.textContent = lives;

            traffic[i].y = -150;

            if (lives <= 0) {

                playing = false;

                if (bgMusic) bgMusic.pause();

                finalScore.textContent = score;
                gameOver.style.display = "flex";

                return;
            }
        }
    }
}

function gameLoop() {

    if (!playing) return;

    updateCoin();
    updateTraffic();

    requestAnimationFrame(gameLoop);
}

function resetGame() {

    score = 0;
    lives = 3;

    scoreText.textContent = 0;
    livesText.textContent = 3;

    carX = 150;
    car.style.left = carX + "px";

    coinX = 150;
    coinY = -80;

    traffic = [
        { el: traffic1, x: 40, y: -100 },
        { el: traffic2, x: 150, y: -350 },
        { el: traffic3, x: 260, y: -600 }
    ];

    gameOver.style.display = "none";

    playing = true;

    if (bgMusic) {
        bgMusic.currentTime = 0;
        bgMusic.play().catch(() => {});
    }

    gameLoop();
}

restartBtn.onclick = function () {

    if (buttonSound) {
        buttonSound.currentTime = 0;
        buttonSound.play().catch(() => {});
    }

    resetGame();
};

playAgainBtn.onclick = function () {

    if (buttonSound) {
        buttonSound.currentTime = 0;
        buttonSound.play().catch(() => {});
    }

    resetGame();
};
