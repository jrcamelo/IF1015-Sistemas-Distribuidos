const dgram = require("dgram")
const readline = require('readline')

const socket = dgram.createSocket("udp4")

// Connection Info as key and Name string as value
const users = {}

socket.on("message", function(data, info) {
  const message = data.toString()
  const address = infoToAddress(info)
  if (!(address in users)) {
    return addUser(info)
  }
  const name = users[address]
  if (name == "") {
    return registerUser(info, message)
  }
  // Sends the message to everyone
  broadcast(message, name)
})

function addUser(info) {
  users[infoToAddress(info)] = ""
  console.log("-New connection-")
  send(info, "Welcome! Please enter your name.")
}

function registerUser(info, message) {
  // Shouldn't have duplicate usernames
  if (message in Object.values(users)) {
    return send(info, "This name is already being used!")
  }
  users[infoToAddress(info)] = message
  broadcast(message + " has joined the chat!")
}

function broadcast(message, sender) {
  // "Name: Message" or "Message"
  if (sender != null && sender != "") {
    message = `${sender}: ${message}`
  }
  for (const [address, name] of Object.entries(users)) {
    if (name != null && name != sender) {
      send(addressToInfo(address), message)
    }
  }
  // Send the message to the server
  console.log(message)
}

function send(info, message) {
  socket.send(message, info.port, info.address)
}

socket.on("error", function(had_error) {
  if (socket.name != null && had_error) {
    console.log("---Error at " + socket.name + "---")
  }
})

console.log("Server is open!")
socket.bind(8081, "localhost")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.addListener('line', line => {
  // Send the message to everyone as the server
  for (const address of Object.keys(users)) {
    send(addressToInfo(info), "Server >>> " + line)
  }
})


// Utils
function infoToAddress(info) {
  return info.address + "::" + info.port
}
function addressToInfo(address) {
  const split = address.split("::")
  return { address: split[0], port: split[1] }
}