const dgram = require("dgram")
const readline = require('readline')

const socket = dgram.createSocket("udp4")

// Connection Info as keys and User objects as values
// Could be simpler with Connection Info as keys but Name string as values
const users = {}

class User {
  constructor(info, name = null) {
    this.info = info
    this.name = name
  }

  sendMessage(message, sender) {
    if (this.isNotRegistered()) return
    if (this.isSelfMessage(sender)) return
    this.send(message)
  }

  isSelfMessage(sender) {
    return sender != null && sender.name == this.name
  }

  isNotRegistered() {
    return this.name == null
  }

  send(message) {
    socket.send(message, this.info.port, this.info.address)
  }
}

socket.on("message", function(data, info) {
  const message = data.toString()
  if (!(info in users)) {
    return addUser(info)
  }
  const user = users[info]
  if (user.isNotRegistered()) {
    return registerUser(user, message)
  }
  // Sends the message to everyone
  broadcast(message, user)
})


function addUser(info) {
  const user = new User(info)
  users[info] = user
  console.log("---New connection---")
  user.send("Welcome! Please enter your name.")
}

function registerUser(user, message) {
  // Shouldn't have duplicate usernames
  if (message in getUsernames()) {
    return user.send("This name is already being used!")
  }
  user.name = message
  broadcast(user.name + " has joined the chat!")
}

function broadcast(message, sender) {
  // "Name: Message" or "Message"
  if (sender != null && sender.name != "") {
    message = `${sender.name}: ${message}`
  }
  for (const user of getUsers()) {
    user.sendMessage(message, sender)
  }
  // Send the message to the server
  console.log(message)
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
  for (const user of getUsers()) {
    user.send("Server >>> " + line)
  }
})



// Utils
function getUsers() {
  return Object.values(users)
}

function getUsernames() {
  function getName(user) { return user.name }
  const names = getUsers().map(getName)
  function onlyRegistered(name) { return name != null }
  return names.filter(onlyRegistered)
}


