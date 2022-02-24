
document.getElementById('restart').onclick = function() {
	window.location = ""
}

document.getElementById('pick_up').onclick = function() {
	player.pick_up()
}

document.getElementById('use_item').onclick = function() {
	player.use_item()
}

window.onkeydown = function(e) {
	switch (e.keyCode) {
		case 37: case 65:
			player.direction = 'left'
			break
		case 38: case 87:
			player.direction = 'up'
			break
		case 39: case 68:
			player.direction = 'right'
			break
		case 40: case 83:
			player.direction = 'down'
			break
		case 90:
			player.pickUp()
			break
		case 88:
			player.use()
			break
	}
	e.preventDefault()
}

window.onkeyup = function(e) {
	player.stop()
}

/*触屏*/
let jb = document.getElementById('joystick_background')
let j = document.getElementById('joystick')
let start_x = 0
let start_y = 0
let end_x = 0
let end_y = 0

f.ontouchstart = function(e) {
	start_x = e.touches[0].pageX
	start_y = e.touches[0].pageY
	jb.style.left = (start_x - 50) + "px"
	jb.style.top = (start_y - 50) + "px"
	jb.style.visibility = 'visible'
	j.style.left = (start_x - 35) + "px"
	j.style.top = (start_y - 35) + "px"
}

f.ontouchmove = function(e) {
	e.preventDefault()
	end_x = e.touches[0].pageX
	end_y = e.touches[0].pageY
	j.style.left = (end_x - 35) + "px"
	j.style.top = (end_y - 35) + "px"

	let delta_x = end_x - start_x
	let delta_y = start_y - end_y
	if (Math.abs(delta_x) >= Math.abs(delta_y)) {
		if (delta_x > 0)
			player.direction = 'right'
		else
			player.direction = 'left'
	} else {
		if (delta_y > 0)
			player.direction = 'up'
		else
			player.direction = 'down'
	}
}

f.ontouchend = function(e) {
	jb.style.visibility = 'hidden'
	player.direction = null
}