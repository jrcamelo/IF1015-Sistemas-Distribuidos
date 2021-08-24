const sendToWebSocketServer = require("./ws");
const startRabbit = require('./rabbit');

async function start() {
  const rabbit = await startRabbit();
    
  setInterval(sendData, 2000);
  
  function sendData() {
    sendToWebSocketServer(randomInt(90, 130))
    rabbit.send(rabbit.VOLTAGE_QUEUE, { voltage: randomInt(90, 130) });
  }

  function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  }
}

start()