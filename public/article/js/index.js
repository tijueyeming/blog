const articles = document.getElementsByClassName('article')
const page = document.getElementById('page')
const previous = document.getElementById('previous')
const next = document.getElementById('next')

function jump(url) {
	window.location.href = url
}

if (articles) {
	let l = articles.length
	for (i=0; i<l; i++) {
		let id = articles[i].getAttribute('articleId')
		articles[i].onclick = function() {
			jump(`/article/${id}`)
		}
	}
}

if (page) {
	page.onchange = function() {
		let i = page.options[page.selectedIndex].value
		jump(`/article/index/${i}`)
	}
}

if (previous) {
	let i = parseInt(page.getAttribute('page'))
	previous.onclick = function(){
		jump(`/article/index/${i-1}`)
	}
}

if (next) {
	let i = parseInt(page.getAttribute('page'))
	next.onclick = function() {
		jump(`/article/index/${i+1}`)
	}
}