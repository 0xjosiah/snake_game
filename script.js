const grid = document.querySelector('.grid')
const startBtn = document.querySelector('#start')
const score = document.querySelector('#score')


function createGrid() {
    let gridArr = []
    for (let i = 0; i < 100; i++) {
        const newGridSquare = document.createElement('div')
        grid.appendChild(newGridSquare)
        gridArr.push(newGridSquare)
    }
    console.log(gridArr)
}

createGrid()