const restart = document.getElementById('restart')

restart.onclick = () =>	game.init()

gameFrame.onmousedown = e => {
	let x = Math.floor((e.clientX - canvas.getBoundingClientRect().left) / (width / 10))
	let y = Math.floor((e.clientY - canvas.getBoundingClientRect().top) / (width / 10))
	console.log('点击坐标: ' + x + '-' + y)
	game.lightUp(x, y)
}

gameFrame.ontouchstart = e => {
	e.preventDefault()
	let x = Math.floor((e.touches[0].clientX - canvas.getBoundingClientRect().left) / (width / 10))
	let y = Math.floor((e.touches[0].clientY - canvas.getBoundingClientRect().top) / (width / 10))
	console.log('点击坐标: ' + x + '-' + y)
	game.lightUp(x, y)
}