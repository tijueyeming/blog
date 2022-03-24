// 细胞
class Cell {
	constructor(x, y, w, alive) {
		this.x = x
		this.y = y
		this.w = w
		this.alive = alive
		this.neighbors = 0
	}
	show(ctx) {
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
	constructor(canvas, width) {
		this.cells = []
		this.width = width
		this.canvas = canvas
		this.ctx = canvas.getContext('2d')
		this.cacheCanvas = document.createElement("canvas")
		this.cacheCtx = this.cacheCanvas.getContext("2d")
		this.init()
	}
	init() {
		this.canvas.width = this.width
		this.canvas.height = this.width
		this.cacheCanvas.width = this.width
		this.cacheCanvas.height = this.width
	}
	start() {
		for (let i = 0; i < 42; i++) {
			this.cells[i] = []
			for (let j = 0; j < 42; j++) {
				this.cells[i][j] = new Cell(i, j, this.width / 40, 0)
			}
		}
		for (let i = 1; i < 41; i++) {
			for (let j = 1; j < 41; j++) {
				if (Math.random() < 0.3)
					this.cells[i][j].alive = 1
			}
		}
		this.show()
	}
	show() {
		for (let i = 1; i < 41; i++) {
			for (let j = 1; j < 41; j++) {
				this.cells[i][j].show(this.cacheCtx)
			}
		}
		this.ctx.drawImage(this.cacheCanvas, 0, 0)
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
		this.show()
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
		this.show()
	}
	quickSet(a) {
		let l = a.length / 2
		for (let i = 0; i < l; i++)
			this.cells[a[2*i]][a[2*i+1]].alive = 1
	}
}
// 程序入口
const gameFrame = document.getElementById('gameFrame')
const canvas = document.getElementById('canvas')
// 开始游戏
var game = new LifeGame(canvas, Math.floor(gameFrame.clientWidth / 40) * 40)
game.start()