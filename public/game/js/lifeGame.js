const gameFrame = document.getElementById('gameFrame')
const canvas = document.getElementById('canvas')
const width = Math.floor(gameFrame.clientWidth / 40) * 40
canvas.width = width
canvas.height = width
const ctx = canvas.getContext('2d')

// 细胞
class Cell {

	constructor(x, y, alive) {
		this.x = x
		this.y = y
		this.w = width / 40
		this.alive = alive
		this.neighbors = 0
	}

	draw() {
		ctx.fillStyle = this.setColor()
		ctx.fillRect((this.x - 1) * this.w + 1, (this.y - 1) * this.w + 1, this.w -2, this.w - 2)
	}

	setColor() {
		if (this.alive == 0) {
			return 'white'
		} else {
			return 'red'
		}
	}
	
	evolution() {
		if (this.alive == 0 && this.neighbors == 3)
			this.alive = 1
		if (this.alive == 1 && (this.neighbors < 2 || this.neighbors > 3))
			this.alive = 0
	}
}

// 生命游戏
class LifeGame {
	constructor() {
		this.cells = null
	}
	
	init() {
		this.cells = []
		for (let i = 0; i < 42; i++) {
			this.cells[i] = []
			for (let j = 0; j < 42; j++) {
				this.cells[i][j] = new Cell(i, j, 0)
			}
		}
		for (let i = 1; i < 41; i++) {
			for (let j = 1; j < 41; j++) {
				if (Math.random() < 0.3)
					this.cells[i][j].alive = 1
			}
		}
		this.draw()
	}
	
	draw() {
		for (let i = 1; i < 41; i++) {
			for (let j = 1; j < 41; j++) {
				this.cells[i][j].draw()
			}
		}
	}
	
	evolution() {
		let cache = []
		for (let i = 1; i < 41; i++) {
			cache[i] = []
			for (let j = 1; j < 41; j++) {
				cache[i][j] = this.cells[i][j-1].alive + this.cells[i][j+1].alive + this.cells[i-1][j].alive + this.cells[i+1][j].alive + this.cells[i-1][j-1].alive + this.cells[i-1][j+1].alive + this.cells[i+1][j-1].alive + this.cells[i+1][j+1].alive
			}
		}
		for (let i = 1; i < 41; i++) {
			for (let j = 1; j < 41; j++) {
				this.cells[i][j].neighbors = cache[i][j]
				this.cells[i][j].evolution()
			}
		}
		this.draw()
	}
	
	start() {
		this.init()
	}
	
	importTemplate(index) {
		for (let i = 0; i < 42; i++) {
			for (let j = 0; j < 42; j++) {
				this.cells[i][j].alive = 0
			}
		}
		switch (index) {
			case 0:
				this.quickSet([19,15,20,15,21,15,20,16,20,17,19,18,20,18,21,18,19,20,20,20,21,20,19,21,20,21,21,21,19,23,20,23,21,23,20,24,20,25,19,26,20,26,21,26])
				break
			case 1:
				this.quickSet([19,19,20,19,19,20,22,21,21,22,22,22])
				break
			case 2:
				this.quickSet([3,3,4,4,5,4,3,5,4,5])
				break
			case 3:
				this.quickSet([1,19,4,19,5,20,1,21,5,21,2,22,3,22,4,22,5,22])
				break
		}
		this.draw()
	}
	
	quickSet(a) {
		let l = a.length / 2
		for (let i = 0; i < l; i++)
			this.cells[a[2*i]][a[2*i+1]].alive = 1
	}
}

// 开始游戏
var game = new LifeGame()
game.start()