const games = document.getElementsByClassName('game')
const page = document.getElementById('page')
const previous = document.getElementById('previous')
const next = document.getElementById('next')

if (games) {
	let l = games.length
	for (i=0; i<l; i++) {
		let id = games[i].getAttribute('gameId')
		games[i].onclick = () => window.location.href = `/game/${id}`
	}
}

if (page) {
	page.onchange = () => {
		let i = page.options[page.selectedIndex].value
		window.location.href = `/game/index/${i}`
	}
}

if (previous) {
	let i = parseInt(page.getAttribute('page'))
	previous.onclick = () => window.location.href = `/game/index/${i-1}`
}

if (next) {
	let i = parseInt(page.getAttribute('page'))
	next.onclick = () => window.location.href = `/game/index/${i+1}`
}