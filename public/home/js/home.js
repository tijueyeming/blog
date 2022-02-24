const logo = document.getElementById('logo')
const hello = document.getElementById('hello')
const article = document.getElementById('article')
const game = document.getElementById('game')
const copyright = document.getElementById("copyright")
const beian1 = document.getElementById("beian1")
const beian2 = document.getElementById("beian2")

logo.onclick = () => window.location.href = '/'

article.onclick = () => window.location.href = `/article/index/1`

game.onclick = () => window.location.href = `/game/index/1`

copyright.onclick = () => window.location.href = '/'

beian1.onclick = () => window.location.href = 'http://beian.miit.gov.cn'

beian2.onclick = () => window.location.href = 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33059102000095'