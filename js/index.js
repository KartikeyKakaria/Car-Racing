//Dom elements
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

//Some variables for storing data
let player = {}
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

//events for game :)
startScreen.addEventListener("click", startGame)
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

//defining functions
function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function gamePlay() {
    console.log("I am clicked lol")
    if (player.start) {
        window.requestAnimationFrame(gamePlay)
    }

}

function startGame() {
    player.start = true;
    gameArea.classList.remove("hide");
    startScreen.classList.add("hide");

    window.requestAnimationFrame(gamePlay);
    let car = document.createElement('div');
    car.setAttribute("class", "car");
    car.innerText = "car";
    gameArea.appendChild(car);
}