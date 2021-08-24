const Rabbit = require("../rabbit")

module.exports = async(ctx, next) => {
  ctx.broker = await Rabbit()
  await next()
}