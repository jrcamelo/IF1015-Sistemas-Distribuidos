const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const startRabbit = require("../rabbit")

let server
let rabbit

async function startWebSocketServer() {
  rabbit = await startRabbit();
  server = new WebSocketServer({port: 8080, path: '/'});
  server.on('connection', function(user) {
    console.log('New connection');
    user.on('message', function(message) { onMessage(message) } );
  });
}

async function onMessage(message) {
  const ack = JSON.parse(message);
  console.log(`Ack: ${ack.id}`);
  if (ack && ack.id) {
    rabbit.ackMessage(ack.id);
    server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(ack));
      }
    })
  }
}

module.exports = startWebSocketServer