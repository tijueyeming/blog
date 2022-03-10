const AnGuiKaoShiModel = require('../models/AnGuiKaoShiModel.js')

// 获取页面
async function getHome(ctx) {
	await ctx.render('AnGuiKaoShi/home')
	console.log(`跳转至安规考试`)
}
// 加载数据
async function postLoad(ctx) {
	console.log('加载数据')
	let data = await AnGuiKaoShiModel.load()
	if (data) {
		ctx.body = {
			code: 200,
			data: data
		}
	} else {
		ctx.body = {
			code: 500,
			message: '数据错误'
		}
	}
	console.log('加载成功')
}


exports.getHome = getHome
exports.postLoad = postLoad