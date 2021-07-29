const WebSocketServer = require('ws').Server;
const http = require("http");



LISTENERS = []
http.createServer( function(req, res) {
  res.writeHeader(200, {
    "Content-Type": "text/event-stream", 
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Access-Control-Allow-Origin": "*"
  });
  console.log("New listener!")
  LISTENERS.push(res);
}).listen(9090);

USERS = { "SERVER": null, "ERROR": null, "YOU": null }

const server = new WebSocketServer({port: 8080, path: '/'});
server.on('connection', function(user) {
  console.log('New connection!');
  user.send('Hello new user, please enter your username.');
  user.on('message', function(message) { onMessage(user, message) } );
  user.on('close', function() { unregisterUser(user) })
});
console.log("Awaiting connections...\n")

function onMessage(user, message) {
  if (!user.username || !usernameExists(user.username)) {
    registerUser(user, message)
    return
  }
  sendToAllUsers(user.username, message);
}

function usernameExists(username) {
  if (!username) return false
  return USERS[username] !== undefined;
}

function registerUser(user, message) {
  if (usernameExists(message)) {
    user.send('Username already taken.');
    return;
  }
  user.username = message;
  USERS[user.username] = user;
  sendToAllUsers("SERVER", `${user.username} has joined the chat.`);
}

function unregisterUser(user) {
  const username = user.username
  if (!username) return
  delete USERS[username];
  sendToAllUsers("SERVER", `${username} has left the chat.`);
}

function sendToAllUsers(sender, text) {
  for (const username in USERS) {
    const user = USERS[username];
    if (!user) continue;
    user.send(sender + ": " + text);
  }
  for (const listener of LISTENERS) {
    if (listener.writable)
      listener.write("data: " + sender + " has sent --- " + text + "\n\n");
  }
}