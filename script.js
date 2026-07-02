let position = 10;
let score = 0;

function moveForward() {
    position += 20;

    if (position > 540) {
        position = 10;
    }

    document.getElementById("car").style.left = position + "px";

    score++;
    document.getElementById("score").textContent = score;
}
