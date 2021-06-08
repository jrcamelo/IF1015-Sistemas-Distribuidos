const net = require('net')

const users = {}
net.createServer(function(socket) {
  socket.name = null
  console.log("---New connection---")
  socket.write("Welcome! Please enter your name.")

  socket.on("data", function(data) {
    const message = data.toString()
    if (message == "bye") {
      socket.end()
      return socket.destroy()
    }
    // Adds the user if it's their first message
    if (socket.name == null) {
      return addUser(socket, message)
    }
    // Sends the message to everyone
    broadcast(message, socket.name)
  })
  
  socket.on('end', function() {
    // Warn other users that someone left
    if (socket.name != null) {
      delete users[socket.name]
      broadcast(socket.name + " has left the chat.")
    }
  })

  socket.on("error", function(had_error) {
    if (socket.name != null && had_error) {
      console.log("---Error at " + socket.name + "---")
    }
  })

  function addUser(socket, message) {
    if (!message) {
      return socket.end()
    // Shouldn't have duplicate usernames
    } else if (message in users) {
      return socket.write("This name is already being used!")
    }
    // Saves the user on the broadcast hash
    socket.name = message
    users[message] = socket
    broadcast(message + " has joined the chat!")
  }

  function broadcast(message, sender = "") {
    // "Name: Message" or "Message"
    var senderLabel = ""
    if (sender != "") {
      senderLabel = sender + ": "
    }
    // Send the message to everyone but the sender
    for (const name of Object.keys(users)) {
      if (name != sender) {
        users[name].write(senderLabel + message)
      }
    }
    console.log(senderLabel + message)
  }
}).listen(4000, "localhost")

console.log("Server is open!")