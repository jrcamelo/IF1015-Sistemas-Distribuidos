const Router = require('koa-router');
const send = require("./send")
const get = require("./get")

const router = new Router()

router.post('/send', send)
router.get('/get', get)

module.exports = router
