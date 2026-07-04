const car = document.getElementById("car");
const coin = document.getElementById("coin");
const obstacle = document.getElementById("obstacle");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const restartBtn = document.getElementById("restartBtn");

let carX = 145;

let coinX = Math.random()*280;
let coinY = -50;

let obsX = Math.random()*280;
let obsY = -150;

let score = 0;
let lives = 3;
let speed = 6;
let gameOver = false;

coin.style.left = coinX + "px";
obstacle.style.left = obsX + "px";

function moveLeft(){
    if(carX > 0){
        carX -= 30;
        car.style.left = carX + "px";
    }
}

function moveRight(){
    if(carX < 290){
        carX += 30;
        car.style.left = carX + "px";
    }
}

document.getElementById("leftBtn").onclick = moveLeft;
document.getElementById("rightBtn").onclick = moveRight;

document.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowLeft") moveLeft();
    if(e.key==="ArrowRight") moveRight();
});

function hit(a,b){
    return !(
        a.offsetLeft+a.offsetWidth<b.offsetLeft||
        a.offsetLeft>b.offsetLeft+b.offsetWidth||
        a.offsetTop+a.offsetHeight<b.offsetTop||
        a.offsetTop>b.offsetTop+b.offsetHeight
    );
}

function gameLoop(){

    if(gameOver) return;

    coinY += speed;
    obsY += speed+2;

    coin.style.top = coinY+"px";
    obstacle.style.top = obsY+"px";

    if(coinY>520){
        coinY=-60;
        coinX=Math.random()*280;
        coin.style.left=coinX+"px";
    }

    if(obsY>520){
        obsY=-120;
        obsX=Math.random()*280;
        obstacle.style.left=obsX+"px";
    }

    if(hit(car,coin)){
        score+=10;
        scoreText.innerHTML=score;

        coinY=-60;
        coinX=Math.random()*280;
        coin.style.left=coinX+"px";
    }

    if(hit(car,obstacle)){
        lives--;
        livesText.innerHTML=lives;

        obsY=-120;
        obsX=Math.random()*280;
        obstacle.style.left=obsX+"px";

        if(lives<=0){
            gameOver=true;
            alert("Game Over!\nScore: "+score);
            restartBtn.style.display="block";
        }
    }

    requestAnimationFrame(gameLoop);
}

restartBtn.onclick=function(){

    score=0;
    lives=3;

    scoreText.innerHTML=0;
    livesText.innerHTML=3;

    coinY=-60;
    obsY=-120;

    carX=145;
    car.style.left=carX+"px";

    restartBtn.style.display="none";

    gameOver=false;

    gameLoop();
};

gameLoop();
const traffic = [
    document.getElementById("traffic1"),
    document.getElementById("traffic2"),
    document.getElementById("traffic3")
];

let trafficData = [
    {x:40,y:-100},
    {x:150,y:-350},
    {x:260,y:-600}
];

function updateTraffic(){

    for(let i=0;i<traffic.length;i++){

        trafficData[i].y += 8;

        if(trafficData[i].y > 600){
            trafficData[i].y = -200;
            trafficData[i].x = [40,150,260][Math.floor(Math.random()*3)];
        }

        traffic[i].style.left = trafficData[i].x + "px";
        traffic[i].style.top = trafficData[i].y + "px";
    }
                }
