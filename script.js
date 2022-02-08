const grid = document.querySelector('.grid')
const startBtn = document.querySelector('#start-btn')
const restartBtn = document.querySelector('#restart-btn')
const score = document.querySelector('#score')
let gridArr = []
let currentSnake = [139,140,141]
const initialSnake = [139,140,141]
let movement = setInterval(null, 1000)
let currentDirection = 'right'
const width = 17 //number of squares in row
let wallHitDelay;
let selfHitDelay;
let isGameOver = false;
let head = currentSnake.length - 1;
let movementSpeed = 450
let appleIndex = 0
let applesEaten = 0
const movementSpeedMultiplier = {
    easy: .95,
    medium: .9,
    hard: .7
}
const gridModal = document.querySelector('.grid-modal')
const finalScore = document.getElementById('final-score')
const gameoverMsg = document.getElementById('gameover')
const startMsg = document.getElementById('start')

function createGrid() {
    for (let i = 0; i < width*width; i++) {
        const newGridSquare = document.createElement('div')
        newGridSquare.classList.add('square')
        if (i % 2 == 0) {
            newGridSquare.classList.add('alt')
        }
        // newGridSquare.textContent = i //numbers in squares for ref
        grid.appendChild(newGridSquare)
        gridArr.push(newGridSquare)
    }
}
createGrid()
renderSnake()

startBtn.addEventListener('click', () => {
    if(!isGameOver) {
        startMsg.style.display = 'none'
        gridModal.style.display = 'none'
        generateApples()
        movement = setInterval(move, movementSpeed)
    }
})


function renderSnake() {
    gridArr.forEach(i => i.classList.remove('snake'))
    currentSnake.forEach(index => gridArr[index].classList.add('snake'))
}

function move() {
    head = currentSnake.length - 1
    // wallHitDelay = setTimeout(isHitWall, movementSpeed/2)
    // selfHitDelay = setTimeout(isHitSelf, movementSpeed/2)
    isHitSelf()
    isHitWall()
    if (isGameOver) {return}
    
    if (currentDirection == 'right') {
        currentSnake.push(currentSnake[head] + 1)
    }
    if (currentDirection == 'left') {
        currentSnake.push(currentSnake[head] - 1)
    }
    if (currentDirection == 'up') {
        currentSnake.push(currentSnake[head] - width)
    }
    if (currentDirection == 'down') {
        currentSnake.push(currentSnake[head] + width)
    }
    // currentDirection = direction
    isEatingApple()
    renderSnake()

}

document.addEventListener('keydown', changeDirection)

function changeDirection (event) {
    if(isLegalMove(event) && !isGameOver) {
        // clearInterval(movement)
        // clearTimeout(wallHitDelay)
        // clearTimeout(selfHitDelay)
        let direction = directionID(event.key)
        currentDirection = direction
        // movement = setInterval(move, movementSpeed, direction)
    }
}

function isLegalMove(event) {
    if (
        (event.key == 'ArrowUp' && currentDirection !== 'down') ||
        (event.key == 'ArrowDown' && currentDirection !== 'up') ||
        (event.key == 'ArrowRight' && currentDirection !== 'left') ||
        (event.key == 'ArrowLeft' && currentDirection !== 'right')
    ) {return true;}
    return false;
}


function directionID(string) {
    return string.replace(/^(Arrow)/, '').toLowerCase()
}

function isHitWall() {
    if (
        (currentSnake[head] % width === 0 && currentDirection === 'left') ||
        (currentSnake[head] % width === width-1 && currentDirection === 'right') ||
        (currentSnake[head] + width >= width*width && currentDirection === 'down') ||
        (currentSnake[head] - width < 0 && currentDirection === 'up')
    ) 
    gameOver()
}

function isHitSelf() {
    for(let i = 0; i < currentSnake.length - 2; i++) {
        if (currentSnake[i] == currentSnake[head]) {
            gameOver()
        }
    }
}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * gridArr.length)
    } while (gridArr[appleIndex].classList.contains('snake'))
    gridArr[appleIndex].classList.add('apple')
    if (appleIndex % 2 == 0) {
        gridArr[appleIndex].style.backgroundColor = 'rgb(11, 128, 11)'
    } else {
        gridArr[appleIndex].style.backgroundColor = 'rgb(16, 179, 16)'
    }
}

function isEatingApple() { 
    if (gridArr[currentSnake[head]].classList.contains('apple')) {
        gridArr[currentSnake[head]].classList.remove('apple')
        applesEaten++
        score.textContent = applesEaten
        generateApples()
        movementSpeed *= movementSpeedMultiplier.easy
    } else {
        currentSnake.shift()
    }
}


function gameOver() {
    clearInterval(movement)
    clearTimeout(wallHitDelay)
    clearTimeout(selfHitDelay)
    isGameOver = true;
    gridModal.style.display = 'flex'
    gameoverMsg.style.display = 'block'
    finalScore.textContent = applesEaten
}

restartBtn.addEventListener('click', restartGame)

function restartGame() {
    applesEaten = 0
    score.textContent = applesEaten
    gridArr[appleIndex].classList.remove('apple')
    currentSnake = [139,140,141]
    currentDirection = 'right'
    movementSpeed = 450
    renderSnake()
    isGameOver = false
    gameoverMsg.style.display = 'none'
    startMsg.style.display = 'block'
}


//something not right, snake continues when shouldn't