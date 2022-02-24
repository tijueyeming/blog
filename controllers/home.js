// 首页
async function getHome(ctx) {
	await ctx.render('home/home', {
		session: ctx.session
	})
}

exports.getHome = getHome