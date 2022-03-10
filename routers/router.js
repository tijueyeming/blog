const koa_router = require('koa-router')()
const home = require('../controllers/home.js')
const article = require('../controllers/article.js')
const game = require('../controllers/game.js')
const admin = require('../controllers/admin.js')
const AnGuiKaoShi = require('../controllers/AnGuiKaoShi.js')
const c404 = require('../controllers/404.js')

// 首页
koa_router.get('/', home.getHome)

// 文章目录
koa_router.get('/article/index/:page', article.getIndex)
// 文章页
koa_router.get('/article/:id', article.getArticle)

// 游戏目录
koa_router.get('/game/index/:page', game.getIndex)
// 游戏页
koa_router.get('/game/:id', game.getGame)

// 管理员页面
koa_router.get('/admin', admin.getHome)
// 登录
koa_router.get('/admin/login', admin.getLogin)
koa_router.post('/admin/login', admin.postLogin)

// 发表文章
koa_router.get('/admin/createArticle', admin.getCreateArticle)
koa_router.post('/admin/createArticle', admin.postCreateArticle)
// 删除文章
koa_router.post('/admin/deleteArticle', admin.postDeleteArticle)
// 编辑文章
koa_router.get('/admin/editArticle/index/:page', admin.getArticleIndex)
koa_router.get('/admin/editArticle/:id', admin.getEditArticle)
koa_router.post('/admin/editArticle', admin.postEditArticle)
// 发表游戏手册
koa_router.get('/admin/createGame', admin.getCreateGame)
koa_router.post('/admin/createGame', admin.postCreateGame)
// 删除游戏手册
koa_router.post('/admin/deleteGame', admin.postDeleteGame)
// 编辑游戏手册
koa_router.get('/admin/editGame/index/:page', admin.getGameIndex)
koa_router.get('/admin/editGame/:id', admin.getEditGame)
koa_router.post('/admin/editGame', admin.postEditGame)

// 安规考试练习
koa_router.get('/AnGuiKaoShi', AnGuiKaoShi.getHome)
koa_router.post('/AnGuiKaoShi/load', AnGuiKaoShi.postLoad)

// 404
koa_router.get('/404', c404.get404)
// 默认跳转至404
koa_router.get('*', c404.get404)

module.exports = koa_router