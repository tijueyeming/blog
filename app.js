const Koa = require('koa')
const logger = require('koa-logger')
const sslify = require('koa-sslify').default
const helmet = require('koa-helmet')
const config = require('./config/default.js')
const session = require('koa-session-minimal')
const path = require('path')
const staticCache = require('koa-static-cache')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const router = require('./routers/router.js')
const http = require('http')
const https = require('https')
const app = new Koa()

app.use(logger())

app.use(helmet.noSniff())

app.use(sslify())

app.use(session({
	key: 'USER_SID',
	secure:true
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

https.createServer({key: config.key, cert: config.cert}, app.callback()).listen(config.port, () => {
	console.log(`Web服务器开启成功，端口: ${config.port}`)
})

http.createServer((req, res) => {
    res.writeHead(301, {'Location': 'https://tijueyeming.com'})
    res.end()
}).listen(3001)