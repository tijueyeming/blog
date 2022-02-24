const articleModel = require('../models/articleModel.js')
const md = require('markdown-it')({html: true})

// 文章目录
async function getIndex(ctx) {
	let page = parseInt(ctx.params.page)
	let amount = await articleModel.countArticle()
	let number = Math.ceil(amount / 10)
	if ((page > 0 && page <= number) || (page == 1 && number == 0)) {
		let articles = await articleModel.findArticleByPage(page)
		await ctx.render('article/index', {
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
// 文章页
async function getArticle(ctx) {
	let id = ctx.params.id
	let article = await articleModel.findArticleById(id)
	if (article) {
		await ctx.render('article/article', {
			title: article.title,
			content: md.render(article.markdown),
			moment: article.moment
		})
		console.log(`跳转至文章页, 标题：${article.title}, id：${id}`)
	}
	else {
		ctx.redirect('/404')
		console.log(`文章不存在, id: ${id}`)
	}
}

exports.getIndex = getIndex
exports.getArticle = getArticle