const net = require('net')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const client = new net.Socket()
client.connect(4000, 'localhost', () => {
  console.log("Connected")
  rl.addListener('line', line => {
    client.write(line)
  })
})