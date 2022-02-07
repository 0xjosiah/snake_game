const grid = document.querySelector('.grid')
const startBtn = document.querySelector('#start')
const score = document.querySelector('#score')
let gridArr = []
let currentSnake = [139,140,141]
let movement = setInterval(null, 1000)
// let head = currentSnake.length - 1
let currentDirection = null
const width = 17 //number of squares in row
let wallHitDelay;
let selfHitDelay;
let isGameOver;
let head;
let movementSpeed = 500
let appleIndex = 0
let applesEaten = 0
const movementSpeedMultiplier = {
    easy: .95,
    medium: .9,
    hard: .7
}

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
    generateApples()
    movement = setInterval(move, movementSpeed, 'right')
})


function renderSnake() {
    gridArr.forEach(i => i.classList.remove('snake'))
    currentSnake.forEach(index => gridArr[index].classList.add('snake'))
}

function move(direction) {
    head = currentSnake.length - 1

    if (direction == 'right') {
        currentSnake.push(currentSnake[head] + 1)
    }
    if (direction == 'left') {
        currentSnake.push(currentSnake[head] - 1)
    }
    if (direction == 'up') {
        currentSnake.push(currentSnake[head] - width)
    }
    if (direction == 'down') {
        currentSnake.push(currentSnake[head] + width)
    }
    isEatingApple()
    // if (gridArr[currentSnake[head]].classList.contains('apple')) {
    //     gridArr[currentSnake[head]].classList.remove('apple')
    //     applesEaten++
    //     score.textContent = applesEaten
    //     generateApples()
    // } else {
    //     currentSnake.shift()
    // }
    
    currentDirection = direction
    renderSnake()
    wallHitDelay = setTimeout(isHitWall, movementSpeed/2)
    selfHitDelay = setTimeout(isHitSelf, movementSpeed/2)
    // console.log(currentSnake[head])
}

document.addEventListener('keydown', changeDirection)

function changeDirection (event) {
    console.log(event)
    if(isLegalMove(event) && !isGameOver) {
        clearInterval(movement)
        clearTimeout(wallHitDelay)
        clearTimeout(selfHitDelay)
        const direction = directionID(event.key)
        movement = setInterval(move, movementSpeed, direction)
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
//checks snake head and direction to see if hit wall
    if (
        (currentSnake[head] % width === 0 && currentDirection === 'left') ||
        (currentSnake[head] % width === width-1 && currentDirection === 'right') ||
        (currentSnake[head] + width >= width*width && currentDirection === 'down') ||
        (currentSnake[head] - width < 0 && currentDirection === 'up')
    ) {gameOver()}
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

//need to have snake eat apple properly, either place in move function or abstract here
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
    console.log(movementSpeed)
}

// console.log(appleIndex)

function gameOver() {
    //called when snake hits wall, build in when hits self too
    // gameOverModal.classList.add('active')
    clearInterval(movement)
    console.log('game over')
    isGameOver = true;
}

function restartGame() {
    // this will be a button in modal that pops up after game over
    //restart game logic
}
