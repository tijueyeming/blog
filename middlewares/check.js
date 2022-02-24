// 检查登录状态
function checkNotLogin(ctx) {
	if (ctx.session && ctx.session.id) {     
		ctx.redirect('/admin')
		return false
	}
	return true
}
function checkLogin(ctx) {
	if (!ctx.session || !ctx.session.id) {     
		ctx.redirect('/admin/login')
		return false
	}
	return true
}

exports.checkNotLogin = checkNotLogin
exports.checkLogin = checkLogin