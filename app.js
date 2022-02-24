const Koa = require('koa')
const logger = require('koa-logger')
const config = require('./config/default.js')
const session = require('koa-session-minimal')
const path = require('path')
const staticCache = require('koa-static-cache')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const router = require('./routers/router.js')
const app = new Koa()

app.use(logger())

app.use(session({
  key: 'USER_SID'
}))

app.use(staticCache(path.join(__dirname + '/public'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}))

app.use(views(path.join(__dirname + '/views'), {
  extension: 'pug'
}))

app.use(bodyParser({
	formLimit: '5mb'
}))

app.use(router.routes())

app.listen(config.port)
console.log(`Web服务器开启成功，端口: ${config.port}`)