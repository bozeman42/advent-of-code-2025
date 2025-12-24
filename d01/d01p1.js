const path = require('path')

const { readInput } = require('../utils')

// const FILE = 'example.txt'
const FILE = 'input.txt'

const dataStr = readInput(path.resolve(__dirname, FILE))
const instructions = dataStr.split('\n').map(line => {
  const [opStr, ...numberArr] = line.split('')
  const value = parseInt(numberArr.join(''))
  return {
    opKey: opStr,
    op: operations[opStr],
    value
  }
})

const showLogs = true


const operations = {
  L: turnLeft,
  R: turnRight
}



let current = 50
let zeroCounter = 0


instructions.forEach(({op, opKey, value}) => {
  current = op(current, value)
  // if (current === 0) zeroCounter++
  if (showLogs) {
    console.log(`${opKey} ${value}: ${current}`)
    console.log(`Zeroes: ${zeroCounter}`)
  }
})

console.log('Zeroes', zeroCounter)

function left(prev, amount) {
  let result = prev - amount
  if (result < 0) {
    result = (100 + result%100)%100
  }
  return result
}

function right(prev, amount) {
  return (prev + amount)%100
}

function turnRight(prev, amount) {
  let result = prev
  for (let i = 0; i < amount; i++) {
    result = (result + 1)%100
    if (result === 0) {
      zeroCounter++
    }
  }
  return result
}

function turnLeft(prev,amount) {
  let result = prev
  for (let i = 0; i < amount; i++) {
    result--
    if (result === -1) {
      result = 99
    }
    if (result === 0) {
      zeroCounter++
    }
  }
  return result
}