// 方块
class Tile {
	constructor(x, y, w, v) {
		this.x = x
		this.y = y
		this.w = w
		this.value = v
	}
	show(ctx) {
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
// 点灯游戏
class Game {
	constructor(canvas, width) {
		this.tile = []
		this.width = width
		this.canvas = canvas
		this.ctx = canvas.getContext('2d')
		this.init()
	}
	init() {
		this.canvas.width = this.width
		this.canvas.height = this.width
		this.canvas.addEventListener('mousedown', this.mousedown.bind(this))
		this.canvas.addEventListener('touchstart', this.touchstart.bind(this))
	}
	start() {
		for (let i = 0; i < 10; i++) {
			this.tile[i] = []
			for (let j = 0; j < 10; j++) {
				this.tile[i][j] = new Tile(i, j, this.width / 10, 0)
			}
		}
		for (let i = 0; i < 30; i++) {
			let x = Math.floor(Math.random() * 10)
			let y = Math.floor(Math.random() * 10)
			this.lightUp(x, y)
		}
	}
	show() {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				this.tile[i][j].show(this.ctx)
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
		this.show()
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
		ctx.clearRect(0, 0, this.width, this.width)
		ctx.font = '30px Verdana'
		ctx.textAlign = 'center'
		let gradient=ctx.createLinearGradient(this.width / 2 - 40, 0, this.width / 2 + 40, 0)
		gradient.addColorStop('0', 'magenta')
		gradient.addColorStop('0.5', 'blue')
		gradient.addColorStop('1.0', 'red')
		ctx.fillStyle = gradient
		ctx.fillText('你赢了', this.width / 2, this.width / 2)
	}
	// 事件
	mousedown(e) {
		let x = Math.floor((e.clientX - this.canvas.getBoundingClientRect().left) / (this.width / 10))
		let y = Math.floor((e.clientY - this.canvas.getBoundingClientRect().top) / (this.width / 10))
		console.log('点击坐标: ' + x + '-' + y)
		this.lightUp(x, y)
	}
	touchstart(e) {
		e.preventDefault()
		let x = Math.floor((e.touches[0].clientX - this.canvas.getBoundingClientRect().left) / (this.width / 10))
		let y = Math.floor((e.touches[0].clientY - this.canvas.getBoundingClientRect().top) / (this.width / 10))
		console.log('点击坐标: ' + x + '-' + y)
		this.lightUp(x, y)
	}
}
// 程序入口
const gameFrame = document.getElementById('gameFrame')
const canvas = document.getElementById('canvas')
// 开始游戏
var game = new Game(canvas, Math.floor(gameFrame.clientWidth / 10) * 10)
game.start()