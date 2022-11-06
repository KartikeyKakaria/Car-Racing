//Dom elements
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

//Some variables for storing data
let player = { speed: 5 }
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
        let road = gameArea.getBoundingClientRect()

        if (keys.ArrowUp && player.y > (road.top + 20)) { player.y -= player.speed; }
        if (keys.ArrowDown && player.y < (road.bottom - 80)) { player.y += player.speed; }
        if (keys.ArrowLeft && player.x > 5) { player.x -= player.speed; }
        if (keys.ArrowRight && player.x < (road.width - 80)) { player.x += player.speed; }
        car.style.top = player.y + "px"
        car.style.left = player.x + "px"
        window.requestAnimationFrame(gamePlay)
    }

}

function startGame() {
    player.start = true;
    gameArea.classList.remove("hide");
    startScreen.classList.add("hide");
    for (i = 0; i < 5; i++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.style.top = (i * 150) + "px";
        gameArea.appendChild(roadLine)
    }
    window.requestAnimationFrame(gamePlay);

    gameArea.appendChild(car);

    player.x = car.offsetLeft
    player.y = car.offsetTop
    console.log(player)
}