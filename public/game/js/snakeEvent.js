const restart = document.getElementById('restart')

window.onkeydown = e => {
	switch (e.keyCode) {
		case 37: case 65:
			if (game.direction !== 'right')
				game.turn('left')
			break
		case 38: case 87:
			if (game.direction !== 'down')
				game.turn('up')
			break
		case 39: case 68:
			if (game.direction !== 'left')
				game.turn('right')
			break
		case 40: case 83:
			if (game.direction !== 'up')
				game.turn('down')
			break
		case 32:
			game.stop()
			break
		case 82:
			game.restart()
			break
	}
	e.preventDefault()
}

restart.onclick = () =>	game.restart()

/*触屏*/
let startX = 0
let startY = 0
let endX = 0
let endY = 0
let flag = 0

gameFrame.ontouchstart = e => {
	startX = e.touches[0].pageX
	startY = e.touches[0].pageY
}

gameFrame.ontouchmove = e => {
	e.preventDefault()
	endX = e.touches[0].pageX
	endY = e.touches[0].pageY
	let deltaX = endX - startX
	let deltaY = endY - startY
	if (flag == 1 || (Math.abs(deltaX) < 0.03 * width && Math.abs(deltaY) < 0.03 * width))
		return
	flag = 1
	if (Math.abs(deltaX) >= Math.abs(deltaY)) {
		if (deltaX > 0) {
			if (game.direction !== 'left')
				game.turn('right')
		} else {
			if (game.direction !== 'right')
				game.turn('left')
		}
	} else {
		if (deltaY > 0) {
			if (game.direction !== 'up')
				game.turn('down')
		} else {
			if (game.direction !== 'down')
				game.turn('up')
		}
	}
}

gameFrame.ontouchend = e => flag = 0
