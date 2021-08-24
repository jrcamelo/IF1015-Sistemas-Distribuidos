module.exports = async function (ctx) {
  await ctx.broker.send(Buffer.from(JSON.stringify(ctx.request.body)))
  ctx.body = { success: true }
}