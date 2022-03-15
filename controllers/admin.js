const articleModel = require('../models/articleModel.js')
const gameModel = require('../models/gameModel.js')
const userModel = require('../models/userModel.js')
const moment = require('moment')
const check = require('../middlewares/check.js')
const md5 = require('md5')
const md = require('markdown-it')({html: true,})

// 管理员主页
async function getHome(ctx) {
	await check.checkLogin(ctx)
	await ctx.render('admin/home', {
		session: ctx.session
	})
}
// 登录
async function getLogin(ctx) {
	await check.checkNotLogin(ctx)
	await ctx.render('admin/login', {
		session: ctx.session
	})
}
async function postLogin(ctx) {
	console.log(`请求: ${JSON.stringify(ctx.request.body)}`)
	let {uName, uPassword} = ctx.request.body
	let user = await userModel.findUserByName(uName)
	if (user) {
		if (md5(uPassword) === user.uPassword) {
			ctx.session = {id: user._id}
			ctx.body = {
				code: 200,
				message: '登录成功'
			}
		} else {
			ctx.body = {
				code: 500,
				message: '密码错误'
			}
		}
	} else {
		ctx.body = {
			code: 500,
			message: '用户名不存在'
		}
	}
	console.log(`回复: ${JSON.stringify(ctx.body)}`)
}

// 文章目录
async function getArticleIndex(ctx) {
	await check.checkLogin(ctx)
	let page = parseInt(ctx.params.page)
	let amount = await articleModel.countArticle()
	let number = Math.ceil(amount / 10)
	if ((page > 0 && page <= number) || (page == 1 && number == 0)) {
		let articles = await articleModel.findArticleByPage(page)
		await ctx.render('admin/articleIndex', {
			session: ctx.session,
			articles: articles,
			amount: amount,
			page: page,
			number: number
		})
		console.log(`跳转至文章目录页, page: ${page}`)
	}
	else {
		ctx.redirect('/404')
		console.log(`文章目录页不存在, page: ${page}`)
	}
}
// 发表文章
async function getCreateArticle(ctx) {
	await check.checkLogin(ctx)
	await ctx.render('admin/createArticle', {
		session: ctx.session
	})
	console.log('转至创建文章页面')
}
async function postCreateArticle(ctx) {
	console.log(`请求: ${JSON.stringify(ctx.request.body)}`)
	let {title, markdown} = ctx.request.body
	let time = moment().format('YYYY-MM-DD HH:mm:ss')
	await articleModel.addArticle(title, markdown, time)
	ctx.body = {
		code:200,
		message:'发表成功'
	}
	console.log(`回复: ${JSON.stringify(ctx.body)}`)
}
// 删除文章
async function postDeleteArticle(ctx) {
	console.log(`请求: ${JSON.stringify(ctx.request.body)}`)
	let {id} = ctx.request.body
	await articleModel.deleteArticleById(id)
	ctx.body = {
		code: 200,
		message: '删除成功'
	}
	console.log(`回复: ${JSON.stringify(ctx.body)}`)
}
// 编辑文章
async function getEditArticle(ctx) {
	await check.checkLogin(ctx)
	let id = ctx.params.id
	let article = await articleModel.findArticleById(id)
	if (article) {
		await ctx.render('admin/editArticle', {
			session: ctx.session,
			article: article
		})
		console.log(`跳转至文章编辑页, 标题：${article.title}, id：${id}`)
	}
	else {
		ctx.redirect('/admin')
		console.log(`要编辑的文章不存在，跳转至文章目录，id：${id}`)
	}
}
async function postEditArticle(ctx) {
	console.log(`请求: ${JSON.stringify(ctx.request.body)}`)
	let {id, title, markdown, moment} = ctx.request.body
	await articleModel.updateArticle(id, title, markdown, moment)
	ctx.body = {
		code: 200,
		message: '发表成功'
	}
	console.log(`回复: ${JSON.stringify(ctx.body)}`)
}

exports.getHome = getHome
exports.getLogin = getLogin
exports.postLogin = postLogin
exports.getArticleIndex = getArticleIndex
exports.getCreateArticle = getCreateArticle
exports.postCreateArticle = postCreateArticle
exports.postDeleteArticle = postDeleteArticle
exports.getEditArticle = getEditArticle
exports.postEditArticle = postEditArticle