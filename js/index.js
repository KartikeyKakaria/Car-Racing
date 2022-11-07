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

function moveLines() {
    let lines = document.querySelectorAll(".lines");
    lines.forEach((line) => {
        if (line.y >= 700) {
            line.y -= 750
        }
        line.y += player.speed;
        line.style.top = line.y + "px"
    })
}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect()
    bRect = b.getBoundingClientRect()

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveEnemy() {
    let enemies = document.querySelectorAll(".enemy");
    enemies.forEach((enemy) => {
        if (isCollide(car, enemy)) {
            console.log("Boom hit")
        }
        if (enemy.y >= 750) {
            enemy.y -= 1300
            enemy.style.left = Math.floor(Math.random() * 350) + "px"
        }
        enemy.y += player.speed;
        enemy.style.top = enemy.y + "px"

    })
}

function gamePlay() {
    if (player.start) {
        moveLines()
        moveEnemy()
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
        roadLine.y = (i * 150);
        roadLine.style.top = (i * 150) + "px";
        gameArea.appendChild(roadLine)
    }
    window.requestAnimationFrame(gamePlay);

    gameArea.appendChild(car);

    player.x = car.offsetLeft
    player.y = car.offsetTop
        // console.log(player)
    for (i = 0; i < 5; i++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = (i * 150);
        enemyCar.style.top = ((i - 1) * 150) * -1 + "px";
        enemyCar.style.background = "green"
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px"
        gameArea.appendChild(enemyCar)
    }
}