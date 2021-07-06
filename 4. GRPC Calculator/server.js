const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculatorPackage = grpcObject.calculatorPackage;
const Calculator = require('./calculator')

const server = new grpc.Server();
server.bind("localhost:8081", grpc.ServerCredentials.createInsecure());

server.addService(calculatorPackage.Calculator.service, { 
  "calculate": calculate 
});
server.start();

function calculate (call, callback) {
    const { operation, first, second } = call.request
    const result = new Calculator(operation, first, second).calculate()
    if (result) {
      callback(null, { result, status: 200 });
    } else {
      callback(null, { "result": null, status: 400 });
    }
}