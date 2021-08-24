module.exports = async function (ctx) {
  const messages = await ctx.broker.getAllMessages()
  ctx.body = { messages }
}