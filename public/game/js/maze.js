var f = document.getElementById('frame')
var c = document.getElementById('canvas')
var ctx = c.getContext('2d')
var width = Math.floor(f.clientWidth / 9) * 9
c.width = width
c.height = width

class Tile {

	constructor(x, y, v) {
		this.x = x
		this.y = y
		this.w = width / 9
		this.value = v
		this.img = null
	}

	draw() {
		ctx.fillStyle = this.setColor()
		ctx.fillRect(this.x * this.w, this.y * this.w, this.w, this.w)
	}

	setColor() {
		if (this.value === 0) {
			return '#e3dec3'
		}
		if (this.value === 1) {
			return '#835a15'
		}
		if (this.value === 2) {
			return '#ac2934'
		}
		if (this.value === 3) {
			return '#e0852b'
		}
	}
}

class Item {

	constructor(name) {
		this.name = name
		this.stat = 'unused'
		this.img = document.getElementById('items')
		this.w = width / 9
	}

	draw() {
		if (this.stat != 'unused')
			return
		switch (this.name) {
			case 'red_door':
				ctx_i.drawImage(this.img, 48, 0, 48, 48, 4 * this.w, 4 * this.w, this.w, this.w)
				break
			case 'red_key':
				ctx_i.drawImage(this.img, 0, 0, 48, 48, 4 * this.w, 4 * this.w, this.w, this.w)
				break
			case 'blue_door':
				ctx_i.drawImage(this.img, 48, 48, 48, 48, 4 * this.w, 4 * this.w, this.w, this.w)
				break
			case 'blue_key':
				ctx_i.drawImage(this.img, 0, 48, 48, 48, 4 * this.w, 4 * this.w, this.w, this.w)
				break
			case 'green_door':
				ctx_i.drawImage(this.img, 48, 96, 48, 48, 4 * this.w, 4 * this.w, this.w, this.w)
				break
			case 'green_key':
				ctx_i.drawImage(this.img, 0, 96, 48, 48, 4 * this.w, 4 * this.w, this.w, this.w)
				break
			case 'purple_door':
				ctx_i.drawImage(this.img, 48, 144, 48, 48, 4 * this.w, 4 * this.w, this.w, this.w)
				break
			case 'purple_key':
				ctx_i.drawImage(this.img, 0, 144, 48, 48, 4 * this.w, 4 * this.w, this.w, this.w)
				break
			default:
				break
		}
	}

}

class Map {

	constructor(w_map, n_map, e_map, s_map, item_name) {
		this.tile = []
		this.w_map = w_map
		this.n_map = n_map
		this.e_map = e_map
		this.s_map = s_map
		this.item_name = item_name
		this.item = null
	}

	init() {
		for (let i = 0; i < 9; i++) {
			this.tile[i] = []
			for (let j = 0; j < 9; j++) {
				this.tile[i][j] = new Tile(i, j, 1)
			}
		}
		for (let i = 1; i < 8; i++) {
			for (let j = 1; j < 8; j++) {
				this.tile[i][j].value = 0
			}
		}
		if (this.w_map != null) {
			this.tile[0][3].value = 0
			this.tile[0][4].value = 0
			this.tile[0][5].value = 0
		}
		if (this.n_map != null) {
			this.tile[3][0].value = 0
			this.tile[4][0].value = 0
			this.tile[5][0].value = 0
		}
		if (this.e_map != null) {
			this.tile[8][3].value = 0
			this.tile[8][4].value = 0
			this.tile[8][5].value = 0
		}
		if (this.s_map != null) {
			this.tile[3][8].value = 0
			this.tile[4][8].value = 0
			this.tile[5][8].value = 0
		}
		this.item = new Item(this.item_name)
	}

	draw() {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				this.tile[i][j].draw()
			}
		}
		this.item.draw()
	}
}

class World {

	constructor() {
		this.map = []
		this.current_map_number = 0
	}

	init() {
		this.map[0] = new Map(null, null, null, null)
		this.map[1] = new Map(null, 52, 2, 3)
		this.map[2] = new Map(1, null, null, 4)
		this.map[3] = new Map(null, 1, null, 6)
		this.map[4] = new Map(null, 2, 5, 7)
		this.map[5] = new Map(4, null, null, 8, 'green_door')
		this.map[6] = new Map(null, 3, null, 12)
		this.map[7] = new Map(null, 4, 8, null, 'green_key')
		this.map[8] = new Map(7, 5, null, 14)
		this.map[9] = new Map(57, null, 10, null)
		this.map[10] = new Map(9, null, 11, 15, 'purple_door')
		this.map[11] = new Map(10, null, 12, 16)
		this.map[12] = new Map(null, 6, 13, null, 'purple_key')
		this.map[13] = new Map(12, null, null, 18)
		this.map[14] = new Map(null, 8, null, 19)
		this.map[15] = new Map(null, 10, null, null)
		this.map[16] = new Map(null, 11, 17, 20, 'red_key')
		this.map[17] = new Map(16, null, 18, 21)
		this.map[18] = new Map(17, 13, 19, null)
		this.map[19] = new Map(18, 14, null, null)
		this.map[20] = new Map(null, 16, 21, 22)
		this.map[21] = new Map(20, 17, null, null)
		this.map[22] = new Map(null, 20, 23, null)
		this.map[23] = new Map(22, null, null, 24)
		this.map[24] = new Map(null, 23, null, 25)
		this.map[25] = new Map(null, 24, null, 32)
		this.map[26] = new Map(null, null, null, 36)
		this.map[27] = new Map(null, null, 28, 38, 'red_door')
		this.map[28] = new Map(27, null, 29, 39)
		this.map[29] = new Map(28, null, 30, null)
		this.map[30] = new Map(29, null, 31, null)
		this.map[31] = new Map(30, null, 35, null)
		this.map[32] = new Map(null, 25, 33, null)
		this.map[33] = new Map(32, null, 34, 43, 'blue_key')
		this.map[34] = new Map(33, null, null, 44)
		this.map[35] = new Map(31, null, null, 45)
		this.map[36] = new Map(null, 26, 37, null)
		this.map[37] = new Map(36, null, 38, 48)
		this.map[38] = new Map(37, 27, 40, null)
		this.map[39] = new Map(null, 28, null, 50)
		this.map[40] = new Map(38, null, 41, null)
		this.map[41] = new Map(40, null, 42, 51)
		this.map[42] = new Map(41, null, 43, null)
		this.map[43] = new Map(42, 33, null, null)
		this.map[44] = new Map(null, 34, null, 55)
		this.map[45] = new Map(null, 35, 46, null)
		this.map[46] = new Map(45, 68, null, null)
		this.map[47] = new Map(null, null, 48, 58)
		this.map[48] = new Map(47, 37, 49, null)
		this.map[49] = new Map(48, null, null, 67)
		this.map[50] = new Map(null, 39, null, 61)
		this.map[51] = new Map(null, 41, 52, null)
		this.map[52] = new Map(51, null, 53, 1)
		this.map[53] = new Map(52, null, 54, null)
		this.map[54] = new Map(53, null, 56, null)
		this.map[55] = new Map(null, 44, null, 63)
		this.map[56] = new Map(54, null, 57, null)
		this.map[57] = new Map(56, null, 9, null)
		this.map[58] = new Map(null, 47, 59, null, 'blue_door')
		this.map[59] = new Map(58, null, 60, null)
		this.map[60] = new Map(59, null, 61, null)
		this.map[61] = new Map(60, 50, 62, null)
		this.map[62] = new Map(61, null, null, 68)
		this.map[63] = new Map(null, 55, 64, null)
		this.map[64] = new Map(63, null, 65, null)
		this.map[65] = new Map(64, null, 66, null)
		this.map[66] = new Map(65, 71, null, null)
		this.map[67] = new Map(null, 49, null, 69)
		this.map[68] = new Map(null, 62, null, 46)
		this.map[69] = new Map(null, 67, null, 70)
		this.map[70] = new Map(null, 69, null, 71)
		this.map[71] = new Map(null, 70, null, 66)
		for (let i = 0; i <= 71; i++) {
			this.map[i].init()
		}
		this.current_map_number = Math.floor(Math.random() * 70) + 1
		this.updata()
	}

	updata() {
		this.map[this.current_map_number].draw()
	}

}

class Player {
	constructor() {
		this.x = 4
		this.y = 4
		this.w = width / 9
		this.direction = 'down'
		this.step_count = 0
		this.is_moving = false
		this.power = null
		this.img = document.getElementById('player')
	}

	draw() {
		let x = 1
		let y = 0
		if (this.is_moving)
			x = this.step_count % 2 == 0 ? 0 : 2
		switch (this.direction) {
			case 'left':
				y = 1
				break
			case 'up':
				y = 3
				break
			case 'right':
				y = 2
				break
			case 'down':
				y = 0
				break
			default:
				break
		}
		ctx.drawImage(this.img, 48 * x, 48 * y, 48, 48, this.x * this.w, this.y * this.w, this.w, this.w)
	}

	move() {
		switch (this.direction) {
			case 'left':
				if (this.can_move('left'))
					this.x -= 0.25
				this.is_moving = true
				this.step_count += 1
				this.draw()
				break
			case 'up':
				if (this.can_move('up'))
					this.y -= 0.25
				this.is_moving = true
				this.step_count += 1
				this.draw()
				break
			case 'right':
				if (this.can_move('right'))
					this.x += 0.25
				this.is_moving = true
				this.step_count += 1
				this.draw()
				break
			case 'down':
				if (this.can_move('down'))
					this.y += 0.25
				this.is_moving = true
				this.step_count += 1
				this.draw()
				break
			default:
				return
		}
	}

	keep_moving() {
		let _this = this
		this.power = setInterval(function() {
			_this.move()
		}, 1000/8)
	}

	can_move(direction) {
		switch (direction) {
			case 'left':
				return true
				break
			case 'up':
				return true
				break
			case 'right':
				return true
				break
			case 'down':
				return true
				break
			default:
				break
		}
		return false
	}

	changemap() {
		if (this.moveX === 0) {
			maze.current_map_number = maze.map[maze.current_map_number].left
			maze.updata()
			items.updata(maze.current_map_number)
			this.x = 7
			this.moveX = 7
		}
		if (this.moveY === 0) {
			maze.current_map_number = maze.map[maze.current_map_number].up
			maze.updata()
			items.updata(maze.current_map_number)
			this.y = 7
			this.moveY = 7
		}
		if (this.moveX === 8) {
			maze.current_map_number = maze.map[maze.current_map_number].right
			maze.updata()
			items.updata(maze.current_map_number)
			this.x = 1
			this.moveX = 1
		}
		if (this.moveY === 8) {
			maze.current_map_number = maze.map[maze.current_map_number].down
			maze.updata()
			items.updata(maze.current_map_number)
			this.y = 1
			this.moveY = 1
		}
	}

	pick_up() {
		if (this.moveX === 4 && this.moveY === 4) {
			for (let i = 0; i <= 7; i++) {
				if (items.item[i].current_map_number === maze.current_map_number && items.item[i].value === 1) {
					if (this.itemNum != -1) {
						items.item[this.itemNum].value = 1
					}
					this.itemNum = i
					items.item[i].value = 2
					items.updata(maze.current_map_number)
				}
			}
		}
	}

	use_item() {
		if (this.itemNum != -1) {
			if (this.moveX === 4 && this.moveY === 4) {
				for (let i = 0; i <= 7; i++) {
					if (items.item[i].current_map_number === maze.current_map_number && items.item[i].value === -1) {
						if (items.item[i].class === items.item[this.itemNum].class) {
							items.item[this.itemNum].value = 0
							items.item[i].value = 0
							this.itemNum = -1
							items.updata(maze.current_map_number)
						}
					}
				}
			}
		}
	}

}

var world = new World()
world.init()
var player = new Player()
player.keep_moving()