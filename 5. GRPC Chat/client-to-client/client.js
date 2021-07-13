const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("p2pchat.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const chatPackage = grpcObject.chatPackage;
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

module.exports = class Client {
  constructor(port, anotherPort) {
    this.client = new chatPackage.Chat("localhost:" + anotherPort, grpc.credentials.createInsecure())

    rl.addListener('line', text => {
      this.sendMessage(text)
    })


    this.server = new grpc.Server();
    this.server.bind("localhost:" + port, grpc.ServerCredentials.createInsecure());
    
    this.server.addService(chatPackage.Chat.service, { 
      "sendMessage": this.getMessage 
    });
    this.server.start();
  }

  sendMessage(text) {
    this.client.sendMessage({ text }, (err, response) => {
      if (response.received) {
        return console.log("✓")
      }
    })  
  }

  getMessage(call, callback) {
    const { text } = call.request
    console.log("A: " + text)
    callback(null, { "received": true });
  }

}