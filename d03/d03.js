const path = require('path')

const { readInput } = require('../utils')

// const FILE = 'example.txt'
const FILE = 'input.txt'

const dataStr = readInput(path.resolve(__dirname, FILE))
const banks = dataStr.split('\n').map(bankStr => {
  return bankStr.split('').map(x => parseInt(x))
})


function initBatteries(number, bank) {
  const batteries = []
  for (let i = 0; i < number; i++) {
    const index = bank.length - (number - i)
    batteries.push({index, value: bank[index]})
  }
  return batteries
}


const results = banks.map(bank => {
  const batteries = initBatteries(12, bank)

  for (let i = batteries[0].index; i >=0; i--) {
    if (bank[i] >= batteries[0].value) {
      batteries[0].index = i
      batteries[0].value = bank[i]
    }
  }
  
  for (let i = 1; i < batteries.length; i++) {
    setBattery(i, bank)
  }

  function setBattery(batteryIndex, bank) {
    console.log()
    for (let i = batteries[batteryIndex].index; i > batteries[batteryIndex - 1].index; i--) {
      if (bank[i] >= batteries[batteryIndex].value) {
        batteries[batteryIndex].index = i
        batteries[batteryIndex].value = bank[i]
      }
    }
  }
  console.log(batteries)
  const batteryResult = batteries.reduce((acc, battery) => {
    return parseInt(acc.toString() + battery.value.toString())
  }, '')
  console.log(batteryResult)
  return batteryResult
}).reduce((total, value) => total + value)

console.log(results)