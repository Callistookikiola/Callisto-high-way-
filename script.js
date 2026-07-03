let playing = false;
let score = 0;
let lives = 3;

let lane = 1; // 0=left, 1=center, 2=right
let lanes = [45,145,245];

let car;
let coin;
let obstacle;

let coinY = -80;
let obstacleY = -200;

let coinLane = 1;
let obstacleLane = 2;

// Show menu after intro
window.onload = function(){

    setTimeout(() => {

        document.getElementById("intro").style.display="none";
        document.getElementById("menu").style.display="flex";

    },4000);

}

function startGame(){

    document.getElementById("menu").style.display="none";
    document.getElementById("game").style.display="block";

    car=document.getElementById("car");
    coin=document.getElementById("coin");
    obstacle=document.getElementById("obstacle");

    score=0;
    lives=3;

    document.getElementById("score").innerHTML=score;
    document.getElementById("lives").innerHTML=lives;

    lane=1;
    car.style.left=lanes[lane]+"px";

    playing=true;

    setInterval(gameLoop,40);

}

function gameLoop(){

    if(!playing) return;

    coinY+=6;
    obstacleY+=8;

    coin.style.top=coinY+"px";
    obstacle.style.top=obstacleY+"px";

    coin.style.left=lanes[coinLane]+"px";
    obstacle.style.left=lanes[obstacleLane]+"px";

    // Coin collected
    if(coinY>420 && lane==coinLane){

        score+=10;

        document.getElementById("score").innerHTML=score;

        coinY=-80;
        coinLane=Math.floor(Math.random()*3);

    }

    if(coinY>520){

        coinY=-80;
        coinLane=Math.floor(Math.random()*3);

    }

    // Obstacle collision
    if(obstacleY>420 && lane==obstacleLane){

        lives--;

        document.getElementById("lives").innerHTML=lives;

        obstacleY=-150;
        obstacleLane=Math.floor(Math.random()*3);

        if(lives<=0){

            playing=false;

            alert("GAME OVER");

        }

    }

    if(obstacleY>520){

        obstacleY=-150;
        obstacleLane=Math.floor(Math.random()*3);

    }

}

function moveLeft(){

    if(!playing) return;

    if(lane>0){

        lane--;

        car.style.left=lanes[lane]+"px";

    }

}

function moveRight(){

    if(!playing) return;

    if(lane<2){

        lane++;

        car.style.left=lanes[lane]+"px";

    }

}

function jump(){

    if(!playing) return;

    car.style.bottom="100px";

    setTimeout(()=>{

        car.style.bottom="20px";

    },300);

    }
