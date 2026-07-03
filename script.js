function moveForward(){

    if(!playing) return;

    position += 20;

    document.getElementById("car").style.left = position + "px";

    score++;

    document.getElementById("score").innerHTML = score;

    if(position >= 300 && position <= 320){

        playing = false;

        document.getElementById("gameOver").style.display = "block";

        document.getElementById("moveBtn").disabled = true;

    }

}
