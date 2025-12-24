const path = require('path')

const { readInput } = require('../utils')

// const FILE = 'example.txt'
const FILE = 'input.txt'

const dataStr = readInput(path.resolve(__dirname, FILE))
const grid = dataStr.split('\n').map(row => row.split('').map(item => item === '@'))

function test(x,y,grid) {

  let neighbors = -1
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (grid[y + j]?.[x + i]) {
        neighbors++
      }
    }
  }
  return neighbors < 4
}

const yMax = grid.length
const xMax = grid[0].length

let accessible = 0
let removedThisRun = 0
const gridVis = []
do {
  removedThisRun = 0
  for (let i = 0; i < yMax; i++) {
    for (let j = 0; j < xMax; j++) {
      if (grid[i][j] && test(j,i, grid)) {
        accessible++
        removedThisRun++
        grid[i][j] = false
      }
    }
  }
  gridVis.push(grid.map(row => row.map(item => item ? '@' : '.').join('')).join('\n'))
} while (removedThisRun)
  
async function animateGrid(gridVis) {
  for (let h = 0; h < 1; h++) {

    for (let k = 0; k < gridVis.length; k++) {
      console.clear()
      console.log(gridVis[k])
      await new Promise(resolve => setTimeout(() => resolve(), 50))
    }
  }
  console.log(accessible)
}

animateGrid(gridVis)
