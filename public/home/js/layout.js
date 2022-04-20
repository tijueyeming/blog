const code = document.getElementById('code')

function jump(url) {
	window.location.href = url
}

function magic() {
	let v = code.value
	if (v == 'article')
		jump('/article/index/1')
	else if (v == 'game')
		jump('/game/index/1')
	else if (v == 'admin')
		jump('/admin')
	else
		alert('施咒失败')
}

function keyDown(event) {
	if(event.keyCode==13)
		magic() 
}

code.addEventListener('keydown', keyDown)