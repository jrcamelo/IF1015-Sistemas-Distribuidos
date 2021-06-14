const udp = require('dgram')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const client = udp.createSocket('udp4');
client.on('message', function(data) {
  console.log(data.toString())
})

rl.addListener('line', line => {
  client.send(line, 8081, 'localhost')
})

client.send("---Connected---", 8081, 'localhost')
