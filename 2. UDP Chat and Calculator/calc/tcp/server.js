const net = require('net')

const calculator = require('../calculator')

net.createServer(function(socket) {
  socket.calculation = []
  console.log("---New connection---")
  socket.write("Please send 3 messages. The first should be a number, the second should be an operator and the third should be the other number.")

  socket.on("data", function(data) {
    const message = data.toString()
    socket.calculation.push(message)
    const result = calculator(socket.calculation)
    if (result != null) {
      socket.write("---\n" + result + "\n")
      socket.calculation = []
    }
  })
  
  socket.on('end', function() {
  })

  socket.on("error", function(had_error) {
    if (socket.name != null && had_error) {
      console.log("---Error at " + socket.name + "---")
    }
  })

}).listen(4000, "localhost")

console.log("Server is open!")