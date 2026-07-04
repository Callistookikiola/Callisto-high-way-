const intro = document.getElementById("intro");
const menu = document.getElementById("menu");
const game = document.getElementById("game");

const playBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const finalScore = document.getElementById("finalScore");

const gameOverScreen = document.getElementById("gameOver");

const car = document.getElementById("car");
const coin = document.getElementById("coin");

let score = 0;
let lives = 3;

let carX = 150;

let coinX = 150;
let coinY = -80;

let playing = false;

setTimeout(() => {
    intro.style.display = "none";
    menu.style.display = "flex";
}, 2500);

playBtn.onclick = function () {

    menu.style.display = "none";
    game.style.display = "block";

    playing = true;

    gameLoop();

};

function moveLeft(){

    if(!playing) return;

    carX -= 35;

    if(carX < 20){
        carX = 20;
    }

    car.style.left = carX + "px";

}

function moveRight(){

    if(!playing) return;

    carX += 35;

    if(carX > 280){
        carX = 280;
    }

    car.style.left = carX + "px";

}

document.getElementById("leftBtn").onclick = moveLeft;
document.getElementById("rightBtn").onclick = moveRight;

document.addEventListener("keydown",function(e){

    if(e.key==="ArrowLeft"){
        moveLeft();
    }

    if(e.key==="ArrowRight"){
        moveRight();
    }

});
// ---------- TRAFFIC CARS ----------

const traffic = [
    { x:40,  y:-120 },
    { x:150, y:-350 },
    { x:260, y:-580 }
];

function drawTraffic(){

    for(let i=0;i<traffic.length;i++){

        let car = document.getElementById("traffic"+(i+1));

        if(!car) continue;

        traffic[i].y += 8;

        if(traffic[i].y > 650){

            traffic[i].y = -150;

            let lanes=[40,150,260];

            traffic[i].x=lanes[Math.floor(Math.random()*3)];

        }

        car.style.left = traffic[i].x+"px";
        car.style.top = traffic[i].y+"px";

    }

}

// ---------- COIN ----------

function updateCoin(){

    coinY += 7;

    if(coinY>620){

        coinY=-80;

        let lanes=[40,150,260];

        coinX=lanes[Math.floor(Math.random()*3)];

    }

    coin.style.left=coinX+"px";

    coin.style.top=coinY+"px";

}

// ---------- COLLISION ----------

function collide(a,b){

    return !(

        a.offsetLeft+a.offsetWidth<b.offsetLeft ||

        a.offsetLeft>b.offsetLeft+b.offsetWidth ||

        a.offsetTop+a.offsetHeight<b.offsetTop ||

        a.offsetTop>b.offsetTop+b.offsetHeight

    );

     }
// ---------- GAME LOOP ----------

function gameLoop(){

    if(!playing) return;

    updateCoin();

    drawTraffic();

    // Coin collection
    if(collide(car,coin)){

        score += 10;

        scoreText.textContent = score;

        coinY = -80;

        let lanes=[40,150,260];

        coinX = lanes[Math.floor(Math.random()*3)];

    }

    // Traffic collision
    for(let i=0;i<traffic.length;i++){

        let trafficCar=document.getElementById("traffic"+(i+1));

        if(trafficCar && collide(car,trafficCar)){

            lives--;

            livesText.textContent=lives;

            traffic[i].y=-150;

            if(lives<=0){

                playing=false;

                finalScore.textContent=score;

                gameOverScreen.style.display="flex";

                return;

            }

        }

    }

    requestAnimationFrame(gameLoop);

}

// ---------- RESTART ----------

function resetGame(){

    score=0;

    lives=3;

    scoreText.textContent=0;

    livesText.textContent=3;

    carX=150;

    car.style.left=carX+"px";

    coinY=-80;

    gameOverScreen.style.display="none";

    playing=true;

    gameLoop();

}

restartBtn.onclick=resetGame;

playAgainBtn.onclick=resetGame;
