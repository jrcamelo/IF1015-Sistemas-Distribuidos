const dgram = require("dgram")
const readline = require('readline')

const calculator = require('../calculator')

const socket = dgram.createSocket("udp4")

const calculations = {}
socket.on("message", function(data, info) {
  const message = data.toString()
  if (!(info in calculations)) {
    calculations[info] = []
  }
  calculations[info].push(message)
  const result = calculator(calculations[info])
  if (result != null) {
    send(result, info)
    calculations[info] = []
  }
})

function send(message, info) {
  socket.send("---\n" + message + "\n", info.port, info.address)
}

console.log("Server is open!")
socket.bind(8081, "localhost")

