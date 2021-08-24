const amqp = require('amqplib')

const RABBITMQ_URL = "amqp://localhost"

class RabbitBroker {
  
  static instance;

  VOLTAGE_QUEUE = "voltage";
  ERRORS_QUEUE = "results";
  INVALID_QUEUE = "invalid"

  async connect() {
    this.connection = await amqp.connect(RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
    await this.assertQueue(this.VOLTAGE_QUEUE)
    await this.assertQueue(this.ERRORS_QUEUE)
    await this.assertQueue(this.INVALID_QUEUE)
    RabbitBroker.instance = this
    return this
  }

  async assertQueue(queue) {
    return this.channel.assertQueue(queue, {
      durable: true,
      exclusive: false,
      autoDelete: false,
    })
  }

  async send(queue, message) {
    const buffer = Buffer.from(JSON.stringify(message))
    await this.channel.sendToQueue(queue, buffer, { contentType: "application/json", expiration: 10000 })
  }

  async get(queue) {
    return await this.channel.get(queue, { noAck: true })
  }

  async consume(queue, callback) {
    await this.channel.consume(queue, (message) => {
      callback(message)
    })
  }

}

module.exports = async function() {
  return RabbitBroker.instance || await (new RabbitBroker()).connect()
}