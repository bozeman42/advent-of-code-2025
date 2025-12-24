const path = require('path')

const { readInput } = require('../utils')

// const FILE = 'example.txt'
const FILE = 'input.txt'

const dataStr = readInput(path.resolve(__dirname, FILE))
const ranges = dataStr.split(',').map(range => range.split('-').map(number => parseInt(number)))

const invalidIDs = []

const regex = /^(\d+)\1+$/

ranges.forEach(([min, max]) => {
  for (let i = min; i <= max; i++) {
    if (regex.test(i.toString())) {
      invalidIDs.push(i)
    }
  }
})

const result = invalidIDs.reduce((total, value) => {
  return total + value
})

console.log(result)