const article = document.getElementById('article')
const game = document.getElementById('game')
const copyright = document.getElementById('copyright')
const beian1 = document.getElementById('beian1')
const beian2 = document.getElementById('beian2')

function jump(url) {
	window.location.href = url
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