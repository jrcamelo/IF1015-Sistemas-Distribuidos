const net = require('net')
const Calculator = require('../calculator')
const { serverMarshaller, serverUnmarshaller } = require("../marshalling")

net.createServer(function(socket) {
  console.log("---New connection---")
  socket.on("data", function(data) {
    parsedData = serverUnmarshaller(data)
    console.log(parsedData)
    if (parsedData == null)
      return badRequest()
  
    const { operator, first, second } = parsedData
    const result = new Calculator(operator, first, second).calculate()
    if (result == null)
      return badRequest()

    socket.write(serverMarshaller(200, result))
  })
  
  socket.on('end', function() {
  })

  socket.on("error", function(had_error) {
    if (socket.name != null && had_error) {
      console.log("---Error at " + socket.name + "---")
    }
  })

  function badRequest() {
    socket.write(serverMarshaller(400, 0))
  }

}).listen(4000, "localhost")

console.log("Server is open!")