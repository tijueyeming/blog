const gameFrame = document.getElementById('gameFrame')
const width = Math.floor(gameFrame.clientWidth / 25) * 25
const canvas = document.getElementById('canvas')
canvas.width = width
canvas.height = width

const ctx = canvas.getContext('2d')

class Tile {

	constructor(x, y, color) {
		this.x = x
		this.y = y
		this.w = width / 25
		this.color = color
	}

	draw() {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x * this.w, this.y * this.w, this.w, this.w)
	}

}

class Snake {

	constructor() {
		this.body = []
		this.head = null
		this.food = null
		this.direction = 'right'
		this.alive = true
		this.score = 0
		this.level = 1
		this.power = null
		this.moveStep = 0
	}

	init() {
		this.direction = 'right'
		this.alive = true
		this.score = 0
		this.level = 1
		this.power = null
		this.moveStep = 0
		this.body = []
		for (let i = 0; i < 3; i++) {
			this.body[i] = new Tile(2-i, 0, 'gray')
		}
		this.head = new Tile(3, 0, 'red')
		this.newFood()
		this.updata()
	}

	updata() {
		ctx.clearRect(0, 0, width, width)
		for (var i = 0; i < this.body.length; i++)
			this.body[i].draw()
		this.head.draw()
		this.food.draw()
		document.getElementById('score').innerHTML = this.score
		document.getElementById('level').innerHTML = this.level
	}

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
		this.food = new Tile(x, y, 'green')
	}

	canEat() {
		if (this.head.x == this.food.x && this.head.y == this.food.y)
			return true
		else
			return false
	}
	
	isAlive() {
		if (this.head.x >= 25 || this.head.x < 0 || this.head.y >= 25 || this.head.y < 0) {
			this.alive = false
		}
		for (let i = 1; i < this.body.length; i++) {
			if (this.body[i].x == this.head.x && this.body[i].y == this.head.y) {
				this.alive = false
			}
		}
	}

	move() {
		this.body.unshift(new Tile(this.head.x, this.head.y, 'gray'))
		if (this.canEat()) {
			this.score = this.score + this.level
			this.updataLevel()
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
		this.updata()	
	}
	
	keepMoving() {
		this.power = setInterval( () => {
			if (this.alive) {
				if (this.moveStep == (11 - this.level)) {
					this.move()
					this.isAlive()
					this.updata()
					this.moveStep = 0
				}
				else if (this.moveStep < (11 - this.level)) {
					this.moveStep += 1
				}
			}
		}, 1000/60)
	}

	updataLevel() {
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
	}

	stop() {
		if (this.moveStep < 11) {
			clearInterval(this.power)
			this.moveStep = 11
		} else {
			this.moveStep = 0
			this.keepMoving()
		}
	}

	turn(direction) {
		if (this.moveStep == 11)
			return
		if (!this.alive)
			return
		this.stop()
		this.direction = direction
		this.move()
		this.stop()
	}

	start() {
		this.init()
		this.keepMoving()
	}

	restart() {
		clearInterval(this.power)
		this.init()
		this.keepMoving()
	}

}

const game = new Snake()
game.start()
