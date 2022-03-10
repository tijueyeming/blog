const fs = require('fs')

const config = {
	// 启动端口
	port: 3000,
	// 数据库配置
	mongoUrl: 'mongodb://root:Dcraki235711@tijueyeming.com:27017/blog?authSource=admin',
	key: fs.readFileSync('./ssl/ssl.key'),
	cert: fs.readFileSync('./ssl/ssl.pem')
}

module.exports = config
