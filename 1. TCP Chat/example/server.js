const net = require('net')

const handleConnection = socket => {
  console.log("New connection")

  socket.on('end', () => {
    console.log("Connection ended")
  })

  socket.on('data', data => {
    const msg = data.toString()
    if (msg === 'end') {
      socket.end()
    } else {
      console.log(socket + ": " + msg)
    }
  })
}

const server = net.createServer(handleConnection)
server.listen(4000, 'localhost')