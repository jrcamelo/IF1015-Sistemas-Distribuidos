module.exports = function(params) {
  if (params.length == 1) {
    if (isNaN(params[0])) return "Not a number"
    return
  } else if (params.length == 2) {
    if (!(params[1] in operations)) return "Not a valid operation"
    return
  } else if (params.length == 3) {
    if (isNaN(params[2])) return "Not a number"
  } 
  
  const first = params[0]
  const operator = params[1]
  const second = params[2]
  return operations[operator](parseFloat(first), parseFloat(second))
}

const operations = {
  "+": function(first, second) { return first + second },
  "-": function(first, second) { return first - second },
  "*": function(first, second) { return first * second },
  "/": function(first, second) { return first / second }
}



