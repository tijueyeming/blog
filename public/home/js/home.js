const article = document.getElementById('article')
const game = document.getElementById('game')
const copyright = document.getElementById('copyright')
const beian1 = document.getElementById('beian1')
const beian2 = document.getElementById('beian2')
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
		alert('失败')
}

function jump(url) {
	window.location.href = url
}

execute.onclick = function() {
	magic() 
}

article.onclick = function() {
	jump('/article/index/1')
}

game.onclick = function() {
	jump('/game/index/1')
}

copyright.onclick = function() {
	jump('/')
}

beian1.onclick = function() {
	jump('http://beian.miit.gov.cn')
}

beian2.onclick = function() {
	jump('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33059102000095')
}

document.onkeydown = function(event) {   
	let e = event            
	if(e && e.keyCode==13)
		magic() 
}