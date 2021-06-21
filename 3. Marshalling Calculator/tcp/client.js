const net = require('net')
const readline = require('readline')
const { clientMarshaller, clientUnmarshaller } = require("../marshalling")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const client = new net.Socket()
client.connect(4000, 'localhost', () => {
  console.log("Connected")
  client.on("data", function(data) {
    console.log(clientUnmarshaller(data))
  })

  client.on("end", function() {
    rl.removeAllListeners()
    client.destroy()
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
    request = new Uint16Array(3)
    index = 0
  }

  function sendRequest() {
    client.write(clientMarshaller(request[0], request[1], request[2]))
  }
})
