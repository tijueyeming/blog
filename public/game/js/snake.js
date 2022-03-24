// 方块
class Tile {
	constructor(x, y, w, color) {
		this.x = x
		this.y = y
		this.w = w
		this.color = color
	}
	show(ctx) {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x * this.w, this.y * this.w, this.w, this.w)
	}
}
// 贪食蛇
class Snake {
	constructor(canvas, width) {
		this.body = []
		this.head = null
		this.food = null
		this.direction = 'right'
		this.score = 0
		this.level = 1
		this.moveStep = 0
		this.loop = null
		this.width = width
		this.canvas = canvas
		this.ctx = canvas.getContext('2d')
		this.cacheCanvas = document.createElement('canvas')
		this.cacheCtx = this.cacheCanvas.getContext('2d')
		this.init()
		// 事件
		this.startX = 0
		this.startY = 0
		this.flag = 0
	}
	// 初始化
	init() {
		this.canvas.width = this.width
		this.canvas.height = this.width
		this.cacheCanvas.width = this.width
		this.cacheCanvas.height = this.width
		window.addEventListener('keydown', this.keyDown.bind(this))
		this.canvas.addEventListener('touchstart', this.touchstart.bind(this))
		this.canvas.addEventListener('touchmove', this.touchmove.bind(this))
		this.canvas.addEventListener('touchend', this.touchend.bind(this))
	}
	// 开始游戏
	start() {
		clearInterval(this.loop)
		this.direction = 'right'
		this.score = 0
		this.level = 1
		this.moveStep = 0
		this.body = []
		for (let i = 0; i < 3; i++) {
			this.body[i] = new Tile(2-i, 0, this.width/25, 'gray')
		}
		this.head = new Tile(3, 0, this.width/25, 'red')
		this.newFood()
		this.loop = setInterval(function() {
			if (this.moveStep == (11 - this.level)) {
				this.move()
				this.moveStep = 0
			}
			if (this.moveStep < (11 - this.level))
				this.moveStep += 1
		}.bind(this), 1000/60)
	}
	// 移动
	move() {
		if (!this.isGameOver()) {
			this.body.unshift(new Tile(this.head.x, this.head.y, this.width/25, 'gray'))
			if (this.canEat()) {
				this.updataPannel()
				this.newFood()
			} else
				this.body.pop()
			switch (this.direction) {
				case 'left':
					this.head.x -= 1
					break
				case 'up':
					this.head.y -= 1
					break
				case 'right':
					this.head.x += 1
					break
				case 'down':
					this.head.y += 1
					break
				default:
					break
			}
			this.show()
		}
	}
	// 显示
	show() {
		this.cacheCtx.clearRect(0, 0, this.width, this.width)
		for (var i = 0; i < this.body.length; i++)
			this.body[i].show(this.cacheCtx)
		this.head.show(this.cacheCtx)
		this.food.show(this.cacheCtx)
		this.ctx.clearRect(0, 0, this.width, this.width)
		this.ctx.drawImage(this.cacheCanvas, 0, 0)
	}
	// 生成食物
	newFood() {
		let flag = true
		let x = 0
		let y = 0
		while (flag) {
			flag = false;
			x = Math.floor(Math.random() * 25)
			y = Math.floor(Math.random() * 25)
			for (let i = 0; i < this.body.length; i++) {
				if (this.body[i].x == x && this.body[i].y == y)
					flag = true
			}
		}
		this.food = new Tile(x, y, this.width/25, 'green')
	}
	// 是否吃到食物
	canEat() {
		if (this.head.x == this.food.x && this.head.y == this.food.y)
			return true
		else
			return false
	}
	// 是否游戏结束
	isGameOver() {
		let flag = false
		if (this.head.x >= 25 || this.head.x < 0 || this.head.y >= 25 || this.head.y < 0)
			flag = true
		for (let i = 1; i < this.body.length; i++) {
			if (this.body[i].x == this.head.x && this.body[i].y == this.head.y)
				flag = true
		}
		if (flag) {
			this.cacheCtx.fillStyle = '#807766'
			this.cacheCtx.font = 'bold ' + this.width * 0.1 + 'px sans-serif'
			this.cacheCtx.textAlign = 'center'
			this.cacheCtx.textBaseline = 'middle'
			this.cacheCtx.fillText('GAME OVER', this.width * 0.5, this.width * 0.5)
			this.ctx.drawImage(this.cacheCanvas, 0, 0)
		}
		return flag
	}
	// 更新面板
	updataPannel() {
		this.score = this.score + this.level
		if (this.score < 10)
			this.level = 1
		if (this.score >= 10 && this.score < 30)
			this.level = 2
		if (this.score >= 30 && this.score < 60)
			this.level = 3
		if (this.score >= 60 && this.score < 100)
			this.level = 4
		if (this.score >= 100 && this.score < 150)
			this.level = 5
		if (this.score >= 150 && this.score < 210)
			this.level = 6
		if (this.score >= 210 && this.score < 280)
			this.level = 7
		if (this.score >= 280 && this.score < 360)
			this.level = 8
		if (this.score >= 360 && this.score < 450)
			this.level = 9
		if (this.score >= 450)
			this.level = 10	
		document.getElementById('score').innerHTML = this.score
		document.getElementById('level').innerHTML = this.level
	}
	// 转向
	turnLeft() {
		if (game.direction !== 'right') {
			if (game.direction == 'left')
				this.move()
			else
				this.direction = 'left'
		}
	}
	turnRight() {
		if (game.direction !== 'left') {
			if (game.direction == 'right')
				this.move()
			else
				this.direction = 'right'
		}
	}
	turnUp() {
		if (game.direction !== 'down') {
			if (game.direction == 'up')
				this.move()
			else
				this.direction = 'up'
		}
	}
	turnDown() {
		if (game.direction !== 'up') {
			if (game.direction == 'down')
				this.move()
			else
				this.direction = 'down'
		}
	}
	// 事件
	keyDown(e) {
		if (e.keyCode==37 || e.keyCode==65)
			this.turnLeft()
		if (e.keyCode==38 || e.keyCode==87)
			this.turnUp()
		if (e.keyCode==39 || e.keyCode==68)
			this.turnRight()
		if (e.keyCode==40 || e.keyCode==83)
			this.turnDown()
		if (e.keyCode==82)
			this.start()
		e.preventDefault()
	}
	touchstart(e) {
		this.startX = e.touches[0].pageX
		this.startY = e.touches[0].pageY
	}
	touchmove(e) {
		e.preventDefault()
		let endX = e.touches[0].pageX
		let endY = e.touches[0].pageY
		let deltaX = endX - this.startX
		let deltaY = endY - this.startY
		if (this.flag == 1 || (Math.abs(deltaX) < 0.03 * this.width && Math.abs(deltaY) < 0.03 * this.width))
			return
		this.flag = 1
		if (Math.abs(deltaX) >= Math.abs(deltaY)) {
			if (deltaX > 0)
				this.turnRight()
			else
				this.turnLeft()
		}
		else {
			if (deltaY > 0)
				this.turnDown()
			else
				this.turnUp()
		}
	}
	touchend(e) {
		this.flag = 0
	}
}
// 程序入口
const gameFrame = document.getElementById('gameFrame')
const canvas = document.getElementById('canvas')
const game = new Snake(canvas, Math.floor(gameFrame.clientWidth / 25) * 25)
game.start()