const articles = document.getElementsByClassName('article')
const page = document.getElementById('page')
const previous = document.getElementById('previous')
const next = document.getElementById('next')

if (articles) {
	let l = articles.length
	for (i=0; i<l; i++) {
		let id = articles[i].getAttribute('articleId')
		articles[i].onclick = () => window.location.href = `/article/${id}`
	}
}

if (page) {
	page.onchange = () => {
		let i = page.options[page.selectedIndex].value
		window.location.href = `/article/index/${i}`
	}
}

if (previous) {
	let i = parseInt(page.getAttribute('page'))
	previous.onclick = () => window.location.href = `/article/index/${i-1}`
}

if (next) {
	let i = parseInt(page.getAttribute('page'))
	next.onclick = () => window.location.href = `/article/index/${i+1}`
}