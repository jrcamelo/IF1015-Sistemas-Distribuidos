const udp = require('dgram')
const readline = require('readline')
const { clientMarshaller, clientUnmarshaller } = require("../marshalling")


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const client = udp.createSocket('udp4');
client.on('message', function(data) {
  console.log(clientUnmarshaller(data))
})

let request = new Uint32Array(3)
let index = 0
rl.addListener('line', line => {
  request[index] = parseInt(line)
  index += 1
  if (index == 3) {
    sendRequest()
    reset()
  }
})

function reset() {
  request = new Uint32Array(3)
  index = 0
}

function sendRequest() {
  const buffer = clientMarshaller(request[0], request[1], request[2])
  client.send(buffer, 8081, 'localhost')
}