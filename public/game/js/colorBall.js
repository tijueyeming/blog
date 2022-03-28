class Ball {
	constructor(x, y, vx, vy) {
		this.x = x
		this.y = y
		this.vx = vx
		this.vy = vy
		this.r = Math.floor(Math.random() * 20) + 10
		this.color = ''
		this.cacheCanvas = document.createElement("canvas")
		this.cacheCtx = this.cacheCanvas.getContext("2d")
		this.init()
	}
	init() {
		let r = Math.floor(Math.random() * 256)
		let g = Math.floor(Math.random() * 256)
		let b = Math.floor(Math.random() * 256)
		this.color = `rgba(${r},${g},${b},1)`
		this.cache()
	}
	show(ctx) {
		ctx.drawImage(this.cacheCanvas, this.x - this.r, this.y - this.r)
	}
	cache() {
		this.cacheCanvas.width = 2 * this.r
		this.cacheCanvas.height = 2 * this.r
		this.cacheCtx.save()
		this.cacheCtx.beginPath()
		this.cacheCtx.arc(this.r, this.r, this.r, 0, 2 * Math.PI)
		this.cacheCtx.fillStyle = this.color
		this.cacheCtx.fill()
		this.cacheCtx.restore()
	}
	move(width) {
		this.x += this.vx
		this.y += this.vy
		if (this.x > (width - this.r) || this.x < this.r) {
			this.x = this.x < this.r ? this.r : (width - this.r)
			this.vx = -this.vx
		}
		if (this.y > (canvas.height - this.r) || this.y < this.r) {
			this.y = this.y < this.r ? this.r : (width - this.r)
			this.vy = -this.vy
		}
	}
}
class Game {
	constructor(canvas, width) {
		this.balls = []
		this.loop = null
		this.width = width
		this.canvas = canvas
		this.ctx = canvas.getContext('2d')
		this.cacheCanvas = document.createElement("canvas")
		this.cacheCtx = this.cacheCanvas.getContext("2d")
		this.init()
	}
	// 初始化
	init() {
		this.canvas.width = this.width
		this.canvas.height = this.width
		this.cacheCanvas.width = this.width
		this.cacheCanvas.height = this.width
	}
	update() {
		this.cache()
		this.show()
	}
	show() {
		this.ctx.clearRect(0, 0, this.width, this.width)
		this.ctx.drawImage(this.cacheCanvas, 0, 0)
	}
	cache() {
		this.cacheCtx.clearRect(0, 0, this.width, this.width)
		for (var i = 0; i < this.balls.length; i++) {
			this.balls[i].move(this.width)
			this.balls[i].show(this.cacheCtx)
		}
	}
	start() {
		let x = 0
		let y = 0
		let dx = 0
		let dy = 0
		for (let i = 0; i < 100; i++) {
			x = Math.floor(Math.random() * this.width)
			y = Math.floor(Math.random() * this.width)
			dx = Math.floor(Math.random() * 21) - 10
			dy = Math.floor(Math.random() * 21) - 10
			this.balls[i] = new Ball(x, y, dx, dy)
		}
		clearInterval(this.loop)
		this.loop = setInterval( () => this.update(), 1000/60 )
	}
}
// 程序入口
const gameFrame = document.getElementById('gameFrame')
const canvas = document.getElementById("canvas")
// 创建游戏
const game = new Game(canvas, Math.floor(gameFrame.clientWidth))
game.start()