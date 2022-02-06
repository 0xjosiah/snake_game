const grid = document.querySelector('.grid')
const startBtn = document.querySelector('#start')
const score = document.querySelector('#score')
let gridArr = []
let currentSnake = [10,11,12]
let movement = setInterval(null, 1000)
let head = currentSnake.length - 1
let currentDirection = null
let prevDirection = null




function createGrid() {
    for (let i = 0; i < 100; i++) {
        const newGridSquare = document.createElement('div')
        newGridSquare.classList.add('square')
        newGridSquare.textContent = i
        grid.appendChild(newGridSquare)
        gridArr.push(newGridSquare)
    }
}

createGrid()
renderSnake()

function renderSnake() {
    gridArr.forEach(i => i.classList.remove('snake'))
    currentSnake.forEach(index => gridArr[index].classList.add('snake'))
}

function move(direction) {
    if (direction == 'right') {
        currentSnake.push(currentSnake[head] + 1)
    }
    if (direction == 'left') {
        currentSnake.push(currentSnake[head] - 1)
    }
    if (direction == 'up') {
        currentSnake.push(currentSnake[head] - 10)
    }
    if (direction == 'down') {
        currentSnake.push(currentSnake[head] + 10)
    }
    currentSnake.shift()
    currentDirection = direction
    renderSnake()
}

document.addEventListener('keydown', changeDirection)

function changeDirection (event) {
    if(isLegalMove(event)) {
        clearInterval(movement)
        const direction = directionID(event.key)
        movement = setInterval(move, 1000, direction) //change speed for final product
    }
}

function isLegalMove(event) {
    if (event.key == 'ArrowUp' && currentDirection !== 'down') {
        return true;
    }
    if (event.key == 'ArrowDown' && currentDirection !== 'up') {
        return true;
    }
    if (event.key == 'ArrowRight' && currentDirection !== 'left') {
        return true;
    }
    if (event.key == 'ArrowLeft' && currentDirection !== 'right') {
        return true;
    }
    return false;
}


function directionID(string) {
    return string.replace(/^(Arrow)/, '').toLowerCase()
}

// function isHitWall() {
//this need to check snake head and direction to see if hit wall
//     if (currentSnake[head] % 10 === 0) {
//         gameOver()
//     } else if (currentSnake[head] % 10 === 9) {
//         gameOver()
//     } else if (currentSnake[head] )
// }

function gameOver() {
    //this will be called when snake hits wall
    gameOverModal.classList.add('active')
}

function restartGame() {
    // this will be a button in modal that pops up after game over
    //restart game logic
}
