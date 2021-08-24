module.exports = async(ctx, next) => {
  console.log(`[${ctx.method}] - ${ctx.url} - ${JSON.stringify(ctx.request.body)}`)
  await next()
}