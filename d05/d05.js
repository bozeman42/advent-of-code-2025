const path = require('path')

const { readInput } = require('../utils')

const FILE = 'example.txt'
// const FILE = 'input.txt'

const dataStr = readInput(path.resolve(__dirname, FILE))
const [ranges, ingredients] = dataStr.split('\n\n').map((item, index) => {
  switch(index) {
    case 0:
      return item.split('\n').map(rangeStr => {
        return rangeStr.split('-').map(x => parseInt(x))
      })
    case 1:
      return item.split('\n').map(x => parseInt(x))
  }
})
console.log(ranges, ingredients)