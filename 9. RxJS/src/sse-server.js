const rxAmqp = require('rx-amqplib');

  const RABBITMQ_URL = "amqp://localhost"
  const INVALID_QUEUE = "invalid"

  rxAmqp.newConnection(RABBITMQ_URL)
    .flatMap(connection => connection.createChannel())
    .flatMap(channel => channel.assertQueue(INVALID_QUEUE, { durable: true }))
    .flatMap(reply => reply.channel.consume(INVALID_QUEUE, { noAck: true }))
    .map(parse)
    .subscribe(sendToListener)


const http = require("http");
let listener
http.createServer(function(req,res) {
  res.writeHeader(200, {"Content-Type":"text/event-stream"
                        , "Cache-Control":"no-cache"
                        , "Connection":"keep-alive"
                        , "Access-Control-Allow-Origin": "*"});
  listener = res;
}).listen(9090);

function parse(message) {
  return JSON.parse(message.content.toString()).voltage
}

function sendToListener(value) {
  if (listener != null) listener.write("data: " + value + "\n\n");
}