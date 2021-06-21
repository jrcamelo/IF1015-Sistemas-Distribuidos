const dgram = require("dgram")
const Calculator = require('../calculator')
const { serverMarshaller, serverUnmarshaller } = require("../marshalling")

const socket = dgram.createSocket("udp4")

socket.on("message", function(data, info) {
  parsedData = serverUnmarshaller(data)
  console.log(parsedData)
  if (parsedData == null)
    return badRequest(info)

  const { operator, first, second } = parsedData
  const result = new Calculator(operator, first, second).calculate()
  if (result == null)
    return badRequest(info)
    
  socket.send(serverMarshaller(200, result), info.port, info.address)
})

function badRequest(info) {
  socket.send(serverMarshaller(400, 0), info.port, info.address)
}

console.log("Server is open!")
socket.bind(8081, "localhost")

