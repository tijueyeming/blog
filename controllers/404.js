// 404
async function get404(ctx) {
	await ctx.render('404/404', {
		session: ctx.session
	})
	console.log('404')
}

exports.get404 = get404