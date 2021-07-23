const rl = require('readline-sync')

function gameplay() {
  const menu = rl.question(`

  Welcome adventurer, what would you like to do?
  1. See list of all monsters with GET /monsters
  2. Check info on a specific monster with GET /monsters/:id
  3. Battle a monster and get its spoils with POST /monsters/:id/battle/
  4. Just kill a monster and waste its drops with PUT /monsters/:id/murder/
  5. Decimate a monster from history itself with DELETE /monsters/:id/absolutelydestroy/

  `)
  switch (menu) {
    case '1':
      getMonsters()
      break
    case '2':
      getMonster()
      break
    case '3':
      doBattle()
      break
    case '4':
      doMurder()
      break
    case '5':
      doDecimate()
      break
    default:
      console.log(`Invalid answer ${menu}.`)
      gameplay()
      break
  }
}

function getMonsters() {
  const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/monsters',
    method: 'GET'

  }
  const req = require('http').request(options, (res) => {
    res.setEncoding('utf8')
    res.on('data', (data) => {
      if (data) {
        console.table(JSON.parse(data))
      }
      rl.question('\nPress any key to continue...\n')
      gameplay()
    })
  })
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
    gameplay()
  })
  req.end()
}

function getMonster() {
  const id = askUserForID()
  console.log(id)
  if (!id) {
    return
  }
  const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/monsters/' + id,
    method: 'GET'
  }
  const req = require('http').request(options, (res) => {
    res.setEncoding('utf8')
    res.on('data', (data) => {
      if (data) {
        console.log(JSON.parse(data))
      }
      rl.question('\nPress any key to continue...\n')
      gameplay()
    })
  })
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
    gameplay()
  })
  req.end()
}

function doBattle() {
  const id = askUserForID()
  console.log(id)
  if (!id) {
    return
  }
  const options = {
    hostname: 'localhost',
    port: 8080,
    path: `/monsters/${id}/battle`,
    method: 'POST'
  }
  const req = require('http').request(options, (res) => {
    res.setEncoding('utf8')
    res.on('data', (data) => {
      console.log(data)
      if (data) {
        console.log(JSON.parse(data))
      }
      rl.question('\nPress any key to continue...\n')
      gameplay()
    })
  })
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
    gameplay()
  })
  req.end()
}

function doMurder() {
  const id = askUserForID()
  if (!id) {
    return
  }
  const options = {
    hostname: 'localhost',
    port: 8080,
    path: `/monsters/${id}/murder`,
    method: 'PUT'
  }
  const req = require('http').request(options, (res) => {
    res.setEncoding('utf8')
    res.on('data', (data) => {
      if (data) {
        console.log(JSON.parse(data))
      }
      rl.question('\nPress any key to continue...\n')
      gameplay()
    })
  })
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
    gameplay()
  })
  req.end()
}

function doDecimate() {
  const id = askUserForID()
  if (!id) {
    return
  }
  const options = {
    hostname: 'localhost',
    port: 8080,
    path: `/monsters/${id}/absolutelydestroy`,
    method: 'DELETE'
  }
  const req = require('http').request(options, (res) => {
    res.setEncoding('utf8')
    res.on('data', (data) => {
      if (data) {
        console.log(JSON.parse(data))
      }
      rl.question('\nPress any key to continue...\n')
      gameplay()
    })
  })
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
    gameplay()
  })
  req.end()
}



function askUserForID() {
  return rl.question("\nEnter a monster ID: ")
}

gameplay()