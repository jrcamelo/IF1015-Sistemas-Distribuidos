const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculatorPackage = grpcObject.calculatorPackage;
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const client = new calculatorPackage.Calculator("localhost:8081", 
grpc.credentials.createInsecure())

let request = []
rl.addListener('line', line => {
  request.push(parseInt(line))
  if (request.length == 3) {
    sendRequest()
    request = []
  }
})

function sendRequest() {
  client.calculate({
      "operation": request[0],
      "first": request[1],
      "second": request[2],
  }, (err, response) => {
    if (!response || response.status != 200) {
      return console.log("Error!")
    }
    console.log(response.result)
  })  
}


