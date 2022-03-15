const gameFrame = document.getElementById('gameFrame')
const width = Math.floor(gameFrame.clientWidth / 10) * 10
const canvas = document.getElementById('canvas')
canvas.width = width
canvas.height = width
const ctx = canvas.getContext('2d')

/*方块*/
class Tile {
	constructor(x, y, v) {
		this.x = x
		this.y = y
		this.w = width / 10
		this.value = v
		this.img = null
	}

	draw() {
		ctx.fillStyle = this.setColor()
		ctx.fillRect((this.x + 0.05) * this.w, (this.y + 0.05) * this.w, 0.9 * this.w, 0.9 * this.w)
	}

	setColor() {
		if (this.value === 0) {
			return '#323232'
		}
		if (this.value === 1) {
			return '#ffea00'
		}
	}

	lightUp() {
		if (this.value > -1) {
			this.value = 1 - this.value
		}
	}
}

/*房间*/
class Game {
	constructor() {
		this.tile = []
	}

	init() {
		for (let i = 0; i < 10; i++) {
			this.tile[i] = []
			for (let j = 0; j < 10; j++) {
				this.tile[i][j] = new Tile(i, j, 0)
			}
		}
		for (let i = 0; i < 30; i++) {
			let x = Math.floor(Math.random() * 10)
			let y = Math.floor(Math.random() * 10)
			this.lightUp(x, y )
		}
	}

	updata() {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				this.tile[i][j].draw()
			}
		}
	}

	lightUp(x, y) {
		if (this.isWin()) {
			console.log('Win!')
			return
		}
		this.tile[x][y].lightUp()
		if (x > 0) {
			this.tile[x - 1][y].lightUp()
		}
		if (x < 9) {
			this.tile[x + 1][y].lightUp()
		}
		if (y > 0) {
			this.tile[x][y-1].lightUp()
		}
		if (y < 9) {
			this.tile[x][y+1].lightUp()
		}
		this.updata()
	}

	isWin() {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				if (this.tile[i][j].value == 0) {
					return false
				}
			}
		}
		this.win()
		return true
	}
	
	win() {
		ctx.clearRect(0, 0, width, width)
		ctx.font = '30px Verdana'
		ctx.textAlign = 'center'
		let gradient=ctx.createLinearGradient(width / 2 - 40, 0, width / 2 + 40, 0)
		gradient.addColorStop('0', 'magenta')
		gradient.addColorStop('0.5', 'blue')
		gradient.addColorStop('1.0', 'red')
		ctx.fillStyle = gradient
		ctx.fillText('你赢了', width / 2, width / 2)
	}
}

// 开始游戏
var game = new Game()
game.init()

// 事件
function mousedown(e) {
	let x = Math.floor((e.clientX - canvas.getBoundingClientRect().left) / (width / 10))
	let y = Math.floor((e.clientY - canvas.getBoundingClientRect().top) / (width / 10))
	console.log('点击坐标: ' + x + '-' + y)
	game.lightUp(x, y)
}

function touchstart(e) {
	e.preventDefault()
	let x = Math.floor((e.touches[0].clientX - canvas.getBoundingClientRect().left) / (width / 10))
	let y = Math.floor((e.touches[0].clientY - canvas.getBoundingClientRect().top) / (width / 10))
	console.log('点击坐标: ' + x + '-' + y)
	game.lightUp(x, y)
}

gameFrame.addEventListener('mousedown', mousedown)
gameFrame.addEventListener('touchstart', touchstart)