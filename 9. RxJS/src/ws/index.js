const WebSocketServer = require('ws').Server;

const LISTENERS = {};

const wss = new WebSocketServer({ port: 8080, path: '/randomVoltage' });

wss.on('connection', function (ws) {
  addToListeners(ws)
  ws.on('close', function () {
    removeFromListeners(ws);
  })

  console.log('New connection');
});

function addToListeners(ws) { 
  ws.id = Math.random();
  while (LISTENERS[ws.id]) {
    ws.id = Math.random();
  }
  LISTENERS[ws.id] = ws;
}

function removeFromListeners(ws) {
  delete LISTENERS[ws.id];
}

function send(data) {
  for (const id in LISTENERS) {
    const ws = LISTENERS[id];
    ws.send(data);
  }
}

module.exports = send