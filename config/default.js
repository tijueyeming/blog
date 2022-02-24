const config = {
  // 启动端口
  port: 3000,
  // 数据库配置
  database: {
    DATABASE: 'blog',
    USERNAME: 'root',
    PASSWORD: '235711',
    PORT: '3306',
    HOST: 'localhost'
  },
  mongoUrl: 'mongodb://root:Dcraki235711@tijueyeming.com:27017/blog?authSource=admin'
}

module.exports = config