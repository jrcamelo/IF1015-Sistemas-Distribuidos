module.exports = class Calculator {
  constructor(operator, first, second) {
    this.operator = operator
    this.first = first
    this.second = second
  }

  calculate() {
    if (this.isValidRequest())
      return operations[this.operator](this.first, this.second)
    else
      return null
  }

  isValidRequest() {
    return (this.isValidOperation()
            && this.isNumbers()
            && this.isNotDivisionByZero())
  }

  isValidOperation() {
    return this.operator in operations
  }

  isNumbers() {
    return !isNaN(this.first) && !isNaN(this.second)
  }

  isNotDivisionByZero() {
    return this.operator != 4 || this.second !== 0
  }
}

function add(a, b)      { return a + b }
function subtract(a, b) { return a - b }
function multiply(a, b) { return a * b }
function divide(a, b)   { return a / b }

operations = {
  1: add,
  2: subtract,
  3: multiply,
  4: divide
}