const gameFrame = document.getElementById('gameFrame')
const width = Math.floor(gameFrame.clientWidth / 25) * 25
const canvas = document.getElementById('canvas')
canvas.width = width
canvas.height = width
const ctx = canvas.getContext('2d')

class Background {
	constructor() {
		this.cacheCanvas = document.createElement('canvas')
		this.cacheCtx = this.cacheCanvas.getContext('2d')
		this.init()
	}
	// 初始化
	init() {
		let v = width / 25
		this.cacheCanvas.width = width
		this.cacheCanvas.height = width
		this.cacheCtx.fillStyle = '#b8af9e'
		this.cacheCtx.fillRect(0, 0, width, width)
		let cache = this.cache()
		for (let i=0; i<7; i++) {
			for (let j=0; j<7; j++) {
				this.cacheCtx.drawImage(cache, (1 + 6 * i) * v, (1 + 6 * j) * v)
			}
		}
	}
	// 单个方块缓存
	cache() {
		let v = width / 25
		let cacheCanvas = document.createElement('canvas')
		let cacheCtx = cacheCanvas.getContext('2d')
		cacheCanvas.width = 5 * v
		cacheCanvas.height = 5 * v
		cacheCtx.fillStyle = '#ccc0b2'
		cacheCtx.beginPath()
		cacheCtx.moveTo(6, 0)
		cacheCtx.lineTo(5 * v - 6, 0)
		cacheCtx.arcTo(5 * v, 0, 5 * v, 6, 6)
		cacheCtx.lineTo(5 * v, 5 * v - 6)
		cacheCtx.arcTo(5 * v, 5 * v, 6, 5 * v, 6)
		cacheCtx.lineTo(6, 5 * v)
		cacheCtx.arcTo(0, 5 * v, 0, 0, 6)
		cacheCtx.lineTo(0, 6)
		cacheCtx.arcTo(0, 0, 5 * v, 0, 6)
		cacheCtx.fill()
		return cacheCanvas
	}
	// 显示
	show(ctx) {
		ctx.drawImage(this.cacheCanvas, 0, 0)
	}
	// 更新局部
	updateRect(ctx, x, y) {
		let v = width / 5
		ctx.drawImage(this.cacheCanvas, x, y, v, v, x, y, v, v)
	}
}

class Game {
	constructor() {
		this.background = new Background()
		this.num = []
		this.flag = []
		this.gameOver = false
		this.loop = null
		this.cacheCanvas = document.createElement('canvas')
		this.cacheCtx = this.cacheCanvas.getContext('2d')
	}
	// 初始化
	init() {
		for (let i = 0; i < 4; i++) {
			this.num[i] = []
			this.flag[i] = []
			for (let j = 0; j < 4; j++) {
				this.num[i][j] = 0
				this.flag[i][j] = false
			}
		}
		this.gameOver = false
		this.cacheCanvas.width = width
		this.cacheCanvas.height = width
		this.cacheCtx.clearRect(0, 0, width, width)
	}
	// 开始游戏
	start() {
		clearInterval(this.loop)
		this.loop = setInterval(function() {
			ctx.drawImage(this.cacheCanvas, 0, 0)
		}.bind(this), 1000/60)
		this.init()
		this.background.show(this.cacheCtx)
		this.addNum()
		this.addNum()
	}
	// 生成数字
	addNum() {
		let i, j
		if (this.noSpace())
			return false
		while (true) {
			i = Math.floor(Math.random() * 4)
			j = Math.floor(Math.random() * 4)
			if (this.num[i][j] == 0) {
				break
			}
		}
		let n = Math.random() < 0.8 ? 2 : 4
		this.num[i][j] = n
		setTimeout(function() {
			this.animeA(i, j, n)
		}.bind(this), 200)
		this.updateScore()
		this.isGameOver()
		return true
	}
	// 更新画面
	update() {
		
		this.loop = setInterval( () => this.update(), 1000/60 )
	}
	// 移动
	moveUp() {
		let moved = false
		if (!this.canMoveUp())
			return moved
		for (let i = 0; i < 4; i++) {
			for (let j = 1; j < 4; j++) {
				if (this.num[i][j] != 0) {
					for (let k = 0; k < j; k++) {
						if (this.num[i][k] == 0 && this.canMoveInCol(i, k, j)) {
							//showMove(i, j, i, k)
							this.num[i][k] = this.num[i][j]
							this.num[i][j] = 0
							this.animeB(i, j, i, k, this.num[i][k])
							moved = true
							break
						} else if (this.num[i][k] == this.num[i][j] && this.canMoveInCol(i, k, j) && !this.flag[i][k]) {
							//showMove(i, j, i, k)
							this.num[i][k] = this.num[i][j] * 2
							this.num[i][j] = 0
							this.flag[i][k] = true
							this.animeB(i, j, i, k, this.num[i][k] / 2)
							moved = true
							break
						}
					}
				}
			}
		}
		this.clearFlag()
		if (moved)
			this.addNum()
	}
	moveDown() {
		let moved = false
		if (!this.canMoveDown())
			return moved
		for (let i = 0; i < 4; i++) {
			for (let j = 2; j >= 0; j--) {
				if (this.num[i][j] != 0) {
					for (let k = 3; k > j; k--) {
						if (this.num[i][k] == 0 && this.canMoveInCol(i, j, k)) {
							this.num[i][k] = this.num[i][j]
							this.num[i][j] = 0
							this.animeB(i, j, i, k, this.num[i][k])
							moved = true
							break
						} else if (this.num[i][k] == this.num[i][j] && this.canMoveInCol(i, j, k) && !this.flag[i][k]) {
							this.num[i][k] = this.num[i][j] * 2
							this.num[i][j] = 0
							this.flag[i][k] = true
							this.animeB(i, j, i, k, this.num[i][k] / 2)
							moved = true
							break
						}
					}
				}
			}
		}
		this.clearFlag()
		if (moved)
			this.addNum()
	}
	moveLeft() {
		let moved = false
		if (!this.canMoveLeft())
			return moved
		for (let j = 0; j < 4; j++) {
			for (let i = 1; i < 4; i++) {
				if (this.num[i][j] != 0) {
					for (let k = 0; k < i; k++) {
						if (this.num[k][j] == 0 && this.canMoveInRow(j, k, i)) {
							this.num[k][j] = this.num[i][j]
							this.num[i][j] = 0
							this.animeB(i, j, k, j, this.num[k][j])
							moved = true
							break
						} else if (this.num[k][j] == this.num[i][j] && this.canMoveInRow(j, k, i) && !this.flag[k][j]) {
							this.num[k][j] = this.num[i][j] * 2
							this.num[i][j] = 0
							this.flag[k][j] = true
							this.animeB(i, j, k, j, this.num[k][j] / 2)
							moved = true
							break
						}
					}
				}
			}
		}
		this.clearFlag()
		if (moved)
			this.addNum()
	}
	moveRight() {
		let moved = false
		if (!this.canMoveRight())
			return moved
		for (let j = 0; j < 4; j++) {
			for (let i = 2; i >= 0; i--) {
				if (this.num[i][j] != 0) {
					for (let k = 3; k > i; k--) {
						if (this.num[k][j] == 0 && this.canMoveInRow(j, i, k)) {
							this.num[k][j] = this.num[i][j]
							this.num[i][j] = 0
							this.animeB(i, j, k, j, this.num[k][j])
							moved = true
							break
						} else if (this.num[k][j] == this.num[i][j] && this.canMoveInRow(j, i, k) && !this.flag[k][j]) {
							this.num[k][j] = this.num[i][j] * 2
							this.num[i][j] = 0
							this.flag[k][j] = true
							this.animeB(i, j, k, j, this.num[k][j] / 2)
							moved = true
							break
						}
					}
				}
			}
		}
		this.clearFlag()
		if (moved)
			this.addNum()
	}
	clearFlag() {
		for(let i=0;i<4;i++)
			for(let j=0;j<4;j++)
				this.flag[i][j] = false
	}
	// 有无剩余空间
	noSpace() {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (this.num[i][j] == 0)
					return false
			}
		}
		return true
	}
	// 能否移动
	canMoveUp() {
		for (let i = 0; i < 4; i++) {
			for (let j = 1; j < 4; j++) {
				if (this.num[i][j] != 0) {
					if (this.num[i][j - 1] == 0 || this.num[i][j - 1] == this.num[i][j])
					  return true
				}
			}
		}
		return false
	}
	canMoveDown() {
		for (let i = 0; i < 4; i++) {
			for (let j = 2; j >= 0; j--) {
				if (this.num[i][j] != 0) {
					if (this.num[i][j + 1] == 0 || this.num[i][j + 1] == this.num[i][j])
					  return true
				}
			}
		}
		return false
	}
	canMoveInCol(x, y1, y2) {
		for (let j = y1 + 1; j < y2; j++) {
			if (this.num[x][j] != 0) {
				return false
			}
		}
		return true
	}
	canMoveLeft() {
		for (let i = 1; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (this.num[i][j] != 0) {
					if (this.num[i - 1][j] == 0 || this.num[i - 1][j] == this.num[i][j])
					  return true
				}
			}
		}
		return false
	}
	canMoveRight() {
		for (let i = 2; i >= 0; i--) {
			for (let j = 0; j < 4; j++) {
				if (this.num[i][j] != 0) {
					if (this.num[i + 1][j] == 0 || this.num[i + 1][j] == this.num[i][j])
					  return true
				}
			}
		}
		return false
	}
	canMoveInRow(y, x1, x2) {
		for (let i = x1 + 1; i < x2; i++) {
			if (this.num[i][y] != 0) {
				return false
			}
		}
		return true
	}
	// 动画：出现
	animeA(i, j, n) {
		let v = width / 25
		let s = 0
		let x, y, w
		let cache = this.cache(n)
		let interval = setInterval(function() {
			if (s <= 1) {
				s += 0.05
				x = (1 + 6 * i) * v + 5 * (1 - s) / 2 * v
				y = (1 + 6 * j) * v + 5 * (1 - s) / 2 * v
				w = 5 * v * s
				this.cacheCtx.drawImage(cache, x, y, w, w)
			} else {
				cache = this.cache(this.num[i][j])
				this.cacheCtx.drawImage(cache, x, y)
				clearInterval(interval)
			}	
		}.bind(this), 1000/60)
	}
	// 动画：移动
	animeB(x1, y1, x2, y2, n) {
		let v = width / 25
		let s = 0
		let x = (1 + 6 * x1) * v
		let y = (1 + 6 * y1) * v
		let cache = this.cache(n)
		let interval = setInterval(function() {
			if (s <= 1) {
				this.background.updateRect(this.cacheCtx, x, y)
				s += 0.05
				x = (1 + 6 * x1) * v + 6 * (x2 - x1) * v * s
				y = (1 + 6 * y1) * v + 6 * (y2 - y1) * v * s
				this.cacheCtx.drawImage(cache, x, y)
			} else {
				cache = this.cache(this.num[x2][y2])
				this.cacheCtx.drawImage(cache, x, y)
				clearInterval(interval)
			}	
		}.bind(this), 1000/60)
	}
	// 缓存：绘制单个方块
	cache(value) {
		let cacheCanvas = document.createElement('canvas')
		let cacheCtx = cacheCanvas.getContext('2d')
		let v = width / 25
		cacheCanvas.width = 5 * v
		cacheCanvas.height = 5 * v
		cacheCtx.clearRect(0, 0, 5 * v, 5 * v)
		cacheCtx.fillStyle = this.getColor(value)
		cacheCtx.beginPath()
		cacheCtx.moveTo(6, 0)
		cacheCtx.lineTo(5 * v - 6, 0)
		cacheCtx.arcTo(5 * v, 0, 5 * v, 6, 6)
		cacheCtx.lineTo(5 * v, 5 * v - 6)
		cacheCtx.arcTo(5 * v, 5 * v, 6, 5 * v, 6)
		cacheCtx.lineTo(6, 5 * v)
		cacheCtx.arcTo(0, 5 * v, 0, 0, 6)
		cacheCtx.lineTo(0, 6)
		cacheCtx.arcTo(0, 0, 5 * v, 0, 6)
		cacheCtx.fill()
		if (value > 0) {
			cacheCtx.fillStyle = this.getNumColor(value)
			cacheCtx.font = this.getFont(value)
			cacheCtx.textAlign = 'center'
			cacheCtx.textBaseline = 'middle'
			cacheCtx.fillText(value, v * 2.5, v * 2.5)
		}
		return cacheCanvas
	}
	// 根据数值获取绘图参数
	getColor(value) {
		if (value == 0)
			return '#ccc0b2'
		else if (value == 2)
			return '#eee4da'
		else if (value == 4)
			return '#ece0c8'
		else if (value == 8)
			return '#f2b179'
		else if (value == 16)
			return '#f59563'
		else if (value == 32)
			return '#f57c5f'
		else if (value == 64)
			return '#f65d3b'
		else if (value == 128)
			return '#edce71'
		else if (value == 256)
			return '#edcc61'
		else if (value == 512)
			return '#ecc850'
		else if (value == 1024)
			return '#edc53f'
		else if (value == 2048)
			return '#eec22e'
		else if (value == 4096)
			return '#98c8eb'
		else if (value == 8192)
			return '#50aaeb'
		else if (value == 16384)
			return '#808080'
		else
			return 'black'
	}
	getNumColor(value) {
	  if (value <= 4)
		return '#807766'
	  return '#FFFFFF'
	}
	getFont(value) {
		let s = ''
		if (value <= 64)
			s = width * 0.1 + 'px'
		else if (value <= 512)
			s = width * 0.066 + 'px'
		else
			s = width * 0.05 + 'px'
		s = 'bold ' + s + ' sans-serif'
		return s
	}
	// 更新分数
	updateScore() {
		let score = 0
		for (let i = 0; i < 4; i++)
			for (let j = 0; j < 4; j++)
				score += this.num[i][j]
		document.getElementById('score').textContent = String(score)
	}
	// 是否游戏结束
	isGameOver() {
		if (!this.canMoveDown() && !this.canMoveLeft() && !this.canMoveRight() && !this.canMoveUp()) {
			this.gameOver = true
			setTimeout(function() {
				this.cacheCtx.fillStyle = this.getNumColor(2)
				this.cacheCtx.font = this.getFont(2)
				this.cacheCtx.textAlign = 'center'
				this.cacheCtx.textBaseline = 'middle'
				this.cacheCtx.fillText('GAME OVER', width * 0.5, width * 0.5)
			}.bind(this), 600)
		}
	}
}

const game = new Game()
game.start()

// 事件
function keyDown(e) {
	if (!game.gameOver) {
		if (e.keyCode == 38)
			game.moveUp()
		else if (e.keyCode == 40)
			game.moveDown()
		else if (e.keyCode == 37)
			game.moveLeft()
		else if (e.keyCode == 39)
			game.moveRight()
	}
}

var startX = 0
var startY = 0
var flag = 0
function touchstart(e) {
	startX = e.touches[0].pageX
	startY = e.touches[0].pageY
}
function touchmove(e) {
	e.preventDefault()
	if (flag == 1)
		return
	let endX = e.touches[0].pageX
	let endY = e.touches[0].pageY
	let deltaX = endX - startX
	let deltaY = endY - startY
	if (Math.abs(deltaX) < 0.03 * width && Math.abs(deltaY) < 0.03 * width)
		return
	flag = 1
	if (Math.abs(deltaX) >= Math.abs(deltaY)) {
		if (deltaX > 0)
			game.moveRight()
		else
			game.moveLeft()
	} else {
		if (deltaY > 0)
			game.moveDown()
		else
			game.moveUp()
	}
}
function touchend(e) {
	flag = 0
}

window.addEventListener('keydown', keyDown)
gameFrame.addEventListener('touchstart', touchstart)
gameFrame.addEventListener('touchmove', touchmove)
gameFrame.addEventListener('touchend', touchend)