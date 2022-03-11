const logo = document.getElementById('logo')
const code = document.getElementById('code')
const execute = document.getElementById('execute')

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

function jump(url) {
	window.location.href = url
}

logo.onclick = function() {
	jump('/')
}

execute.onclick = function() {
	magic() 
}

document.onkeydown = function(event) {   
	let e = event            
	if(e && e.keyCode==13)
		magic() 
}