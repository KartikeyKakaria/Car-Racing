//Dom elements
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

//Some variables for storing data
let player = {}
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }
let car = document.createElement('div');
car.setAttribute("class", "car");
car.innerText = "car";
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
    // console.log("I am clicked lol")
    if (player.start) {
        if (keys.ArrowUp) {
            player.y -= 5;
            car.style.top = `${player.y}px`
        }
        if (keys.ArrowDown) {
            player.y += 5;
            car.style.top = `${player.y}px`
        }
        if (keys.ArrowLeft) {
            player.x -= 5;
            car.style.left = `${player.y}px`
        }
        if (keys.ArrowRight) {
            player.x += 5;
            car.style.left = `${player.y}px`
        }
        window.requestAnimationFrame(gamePlay)
    }

}

function startGame() {
    player.start = true;
    gameArea.classList.remove("hide");
    startScreen.classList.add("hide");

    window.requestAnimationFrame(gamePlay);

    gameArea.appendChild(car);

    player.x = Number(car.style.left.slice(0, -2))
    player.y = Number(car.style.top.slice(0, -2))
    console.log(player)
}