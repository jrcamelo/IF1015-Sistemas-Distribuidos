const Koa = require("koa");
const koaBody = require("koa-body");
const startWebSocketServer = require("./ws")
const routes = require("./routes");
const logRequestMiddleware = require("./middlewares/log-request");
const rabbitBrokerMiddleware = require("./middlewares/rabbit-broker");

const app = new Koa();

// Allow CORS
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  await next();
});

app.use(koaBody());
app.use(logRequestMiddleware)
app.use(rabbitBrokerMiddleware)
app.use(routes.routes());
app.on("error", (err, ctx) => {
  console.log(err);
})

app.listen(8081)

startWebSocketServer();