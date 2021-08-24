const rxAmqp = require('rx-amqplib');
(global).WebSocket = require('ws');
const { webSocket } = require('rxjs/webSocket')
const startRabbit = require("./rabbit")

async function start() {
  const WS_PATH = 'ws://localhost:8080/randomVoltage';
  const RABBITMQ_URL = "amqp://localhost"
  const VOLTAGE_QUEUE = "voltage"
  const RESULTS_QUEUE = "results"
  const INVALID_QUEUE = "invalid"

  const rabbit = await startRabbit()

  const wsStream = webSocket(WS_PATH)
                    .asObservable()

  const mergedStream = rxAmqp.newConnection(RABBITMQ_URL)
                          .flatMap(connection => connection.createChannel())
                          .flatMap(channel => channel.assertQueue(VOLTAGE_QUEUE, { durable: true }))
                          .flatMap(reply => reply.channel.consume(VOLTAGE_QUEUE, { noAck: true }))
                          .map(parse)
                          .merge(wsStream)
                          
  mergedStream
    .tap(sendResultToRabbit)
    .filter(x => (x <= 105 || x >= 120))
    .subscribe(sendErrorToRabbit)

  function sendResultToRabbit(voltage) {
    rabbit.send(RESULTS_QUEUE, { voltage })
  }

  function sendErrorToRabbit(voltage) {
    rabbit.send(INVALID_QUEUE, { voltage })
  }

  function parse(message) {
    try {
      const parsed = JSON.parse(message.content.toString());
      return parsed.voltage;
    } catch (e) {
      return null;
    }
  }
}

start()
