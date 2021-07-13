const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("chat.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const chatPackage = grpcObject.chatPackage;
const readline = require('readline');


class Client {
  constructor(port) {
    this.client = new chatPackage.Chat("localhost:" + port, grpc.credentials.createInsecure())
    
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    this.channel = this.client.connect({})
    this.channel.on("data", (message) => { this.getMessage(message) });
    this.rl.on("line", (message) => { this.sendMessage(message) });
    
    this.joinServer()
  }

  joinServer() {
    this.rl.question("Enter your name: ", (name) => {
      this.channel.write({ "username": name })
      this.username = name;
    })
  }

  sendMessage(text) {
    if (this.username == null) return
    this.client.sendMessage({ "username": this.username, text }, res => {})
  }

  getMessage(message) {
    if (message.username == "ERROR") {
      console.log("ERROR: " + message.text)
      return this.joinServer()
    } 
    
    if (message.username == this.username) {
      return console.log("YOU: " + message.text)
    }

    console.log(message.username + ": " + message.text)
  }
}

new Client(8081)