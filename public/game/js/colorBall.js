const gameFrame = document.getElementById('gameFrame')
const width = Math.floor(gameFrame.clientWidth)
const canvas = document.getElementById("canvas")
canvas.width = width
canvas.height = width

const ctx = canvas.getContext('2d')

class Ball {

	constructor(x, y, vx, vy) {
		this.x = x
		this.y = y
		this.vx = vx
		this.vy = vy
		this.r = Math.floor(Math.random() * 20) + 10
		this.color = null
		this.cacheCanvas = document.createElement("canvas")
		this.cacheCtx = this.cacheCanvas.getContext("2d")
	}

	init() {
		let r = Math.floor(Math.random() * 256)
		let g = Math.floor(Math.random() * 256)
		let b = Math.floor(Math.random() * 256)
		this.color = `rgba(${r},${g},${b},1)`
		this.cache()
	}

	paint(ctx) {
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

	move() {
		this.x += this.vx
		this.y += this.vy
		if (this.x > (canvas.width - this.r) || this.x < this.r) {
			this.x = this.x < this.r ? this.r : (canvas.width - this.r)
			this.vx = -this.vx
		}
		if (this.y > (canvas.height - this.r) || this.y < this.r) {
			this.y = this.y < this.r ? this.r : (canvas.height - this.r)
			this.vy = -this.vy
		}
		this.paint(ctx)
	}

}

class Game {

	constructor() {
		this.balls = []
		this.loop = ''
	}

	init() {
		let x = 0
		let y = 0
		let dx = 0
		let dy = 0
		for (let i = 0; i < 100; i++) {
			x = Math.floor(Math.random() * canvas.width)
			y = Math.floor(Math.random() * canvas.height)
			dx = Math.floor(Math.random() * 21) - 10
			dy = Math.floor(Math.random() * 21) - 10
			this.balls[i] = new Ball(x, y, dx, dy)
			this.balls[i].init()
		}
	}

	update() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		for (var i = 0; i < this.balls.length; i++) {
			this.balls[i].move()
		}
	}

	start() {
		clearInterval(this.loop)
		this.init()
		this.loop = setInterval( () => this.update(), 1000/60 )
	}

}

var game = new Game()
game.start()
