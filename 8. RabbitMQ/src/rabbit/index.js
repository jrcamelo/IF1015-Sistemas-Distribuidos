const amqp = require('amqplib')

const RABBITMQ_URL = "amqp://localhost"
const QUEUE_NAME = "queue";

class RabbitBroker {
  static instance;

  messages = {};

  async connect() {
    this.connection = await amqp.connect(RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
    await this.assertQueue()
    RabbitBroker.instance = this
    return this
  }

  async disconnect() {
    await this.channel.close()
    await this.connection.close()
  }

  async assertQueue() {
    return this.channel.assertQueue(QUEUE_NAME, {
      durable: true,
      exclusive: false,
      autoDelete: false,
    })
  }

  async send(message) {
    await this.channel.sendToQueue(QUEUE_NAME, message, { contentType: "application/json" })
    console.log(`Sent message: ${message}`)
  }

  async get() {
    const message = await this.channel.get(QUEUE_NAME, { noAck: false })
    return message
  }

  async getAllMessages() {
    let message = await this.channel.get(QUEUE_NAME, { noAck: false })
    while (message) {
      const id = message.fields.deliveryTag
      message.parsed = this.parseMessage(message, id)
      this.messages[id] = message
      message = await this.channel.get(QUEUE_NAME, { noAck: false })
    }
    return this.getParsedMessages()
  }

  async ackMessage(id) {
    this.channel.ack(this.messages[id])
    delete this.messages[id]
  }

  parseMessage(message, id) {
    const content = JSON.parse(message.content.toString())
    return { id, content }
  }
  
  getParsedMessages() {
    return Object.values(this.messages).map(message => message.parsed)
  }
}

module.exports = async function() {
  return RabbitBroker.instance || await (new RabbitBroker()).connect()
}