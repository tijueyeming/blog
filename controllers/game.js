const gameModel = require('../models/gameModel.js')

// 游戏目录
async function getIndex(ctx) {
	let page = parseInt(ctx.params.page)
	let amount = await gameModel.countGame()
	let number = Math.ceil(amount / 10)
	if ((page > 0 && page <= number) || (page == 1 && number == 0)) {
		let games = await gameModel.findGameByPage(page)
		await ctx.render('game/index', {
			games: games,
			amount: amount,
			page: page,
			number: number
		})
		console.log(`跳转至游戏目录页, page: ${page}`)
	}
	else {
		ctx.redirect('/404')
		console.log(`游戏目录页不存在, page: ${page}`)
	}
}
// 游戏页
async function getGame(ctx) {
	let id = ctx.params.id
	let game = await gameModel.findGameById(id)
	if (game) {
		await ctx.render(`game/${game.code}`, {
			title: game.title,
			code: game.code,
		})
		console.log(`跳转至游戏页, 标题：${game.title}, id：${id}`)
	}
	else {
		ctx.redirect('/404')
		console.log(`游戏不存在, id: ${id}`)
	}
}


exports.getIndex = getIndex
exports.getGame = getGame