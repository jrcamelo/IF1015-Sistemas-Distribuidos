const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("chat.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const chatPackage = grpcObject.chatPackage;


server = new grpc.Server();
server.bind("localhost:8081", grpc.ServerCredentials.createInsecure());

server.addService(chatPackage.Chat.service, { 
  "connect": newUser,
  "sendMessage": getMessage,
});
server.start();

users = {"SERVER": null, "ERROR": null, "YOU": null}


function newUser(call) {
  call.on("data", (request) => {
    const { username } = request;
    if (usernameAlreadyExists(username)) {
      call.write({"username": "ERROR", "text": "Username already exists."});
    } else {
      users[username] = call;
      call.on("end", () => { userDisconnected(username); })
      // call.on('cancelled', () => { userDisconnected(username); });
      sendWelcomeMessage(username);
    }
  })
}

function sendWelcomeMessage(username) {
  const usersInTheChat = Object.keys(users).length - 3
  console.log(username + " has joined the chat.");
  sendToAllUsers("SERVER", `--- ${username} has joined the chat, there are now ${usersInTheChat} users in the chat ---`);
}

function userDisconnected(username) {
  delete users[username];
  console.log(username + " has left the chat.");
  sendToAllUsers("SERVER", `--- ${username} has left the chat ---`);
}

function getMessage(call, callback) {
  const { username, text } = call.request;
  if (!usernameAlreadyExists(username)) { 
    return call.write({"username": "ERROR", "text": "You are not in the chat."});
  }
  sendToAllUsers(username, text);
}

function sendToAllUsers(username, text) {
  for (const user in users) {
    if (user !== "SERVER" && user !== "ERROR") {
      users[user].write({username, text});
    }
  }
}

function usernameAlreadyExists(username) {
  return users[username] !== undefined;
}


