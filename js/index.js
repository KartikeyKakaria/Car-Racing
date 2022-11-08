//Dom elements
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
let highscore;
if (localStorage.getItem('highscore') == null) {
    localStorage.setItem('highscore', '0')
    highscore = 0;
} else {
    highscore = Number(localStorage.getItem('highscore'))
}

//Some variables for storing data
let player = { speed: 5, score: 0 }
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }
let car = document.createElement('div');
car.setAttribute("class", "car");
car.style.backgroundColor = "red";
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

function randomColor() {
    function random() {
        let hex = Math.floor(Math.random() * 256).toString(16)
        return ("0" + String(hex)).substr(-2)
    }
    return "#" + random() + random() + random()
}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide')
    startScreen.innerHTML = `Game Over! <br> Your score was ${player.score+1} <br> Click to start again`;
    if (player.score > highscore) {
        localStorage.setItem('highscore', player.score.toString())
    }
}

function moveEnemy() {
    let enemies = document.querySelectorAll(".enemy");
    enemies.forEach((enemy) => {
        if (isCollide(car, enemy)) {
            endGame();
        }
        if (enemy.y >= 750) {
            enemy.y = -300
            enemy.style.left = Math.floor(Math.random() * 330) + "px"
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
        if (keys.ArrowDown && player.y < (road.bottom - 260)) {
            console.log(player.y, (road.bottom - 140))
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 5) { player.x -= player.speed; }
        if (keys.ArrowRight && player.x < (road.width - 80)) { player.x += player.speed; }
        car.style.top = player.y + "px"
        car.style.left = player.x + "px"
        window.requestAnimationFrame(gamePlay)
        player.score++;
        highscore = Number(localStorage.getItem('highscore'))
        score.innerHTML = `Score: ${player.score} <br> High Score: ${highscore+1} `;
    }

}

function startGame() {
    player.start = true;
    player.score = 0;
    startScreen.classList.add("hide");
    gameArea.innerHTML = "";
    car.style.top = "505px";
    car.style.left = "-245px";
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
    for (i = 0; i < 3; i++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        if (player.score < 100) {
            enemyCar.y = (i * 300) * -1;
        } else {
            enemyCar.y = i * 150
        }
        enemyCar.style.top = enemyCar.y + "px"
        enemyCar.style.backgroundColor = randomColor()
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px"
        gameArea.appendChild(enemyCar)
    }
}