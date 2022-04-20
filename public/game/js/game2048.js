// 背景
class Background {
	constructor(width) {
		this.width = width
		this.cacheCanvas = document.createElement('canvas')
		this.cacheCtx = this.cacheCanvas.getContext('2d')
		this.init()
	}
	// 初始化
	init() {
		let v = this.width / 25
		this.cacheCanvas.width = this.width
		this.cacheCanvas.height = this.width
		this.cacheCtx.fillStyle = '#b8af9e'
		this.cacheCtx.fillRect(0, 0, this.width, this.width)
		let cache = this.cache()
		for (let i=0; i<7; i++) {
			for (let j=0; j<7; j++) {
				this.cacheCtx.drawImage(cache, (1 + 6 * i) * v, (1 + 6 * j) * v)
			}
		}
	}
	// 单个方块缓存
	cache() {
		let v = this.width / 25
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
		let v = this.width / 5
		ctx.drawImage(this.cacheCanvas, x, y, v, v, x, y, v, v)
	}
}
// 游戏
class Game {
	constructor(canvas, width) {
		this.background = new Background(width)
		this.num = []
		this.numFlag = []
		this.gameOver = false
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
		for (let i = 0; i < 4; i++) {
			this.num[i] = []
			this.numFlag[i] = []
			for (let j = 0; j < 4; j++) {
				this.num[i][j] = 0
				this.numFlag[i][j] = false
			}
		}
		this.gameOver = false
		this.loop = setInterval(function() {
			this.ctx.drawImage(this.cacheCanvas, 0, 0)
		}.bind(this), 1000/60)
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
						} else if (this.num[i][k] == this.num[i][j] && this.canMoveInCol(i, k, j) && !this.numFlag[i][k]) {
							//showMove(i, j, i, k)
							this.num[i][k] = this.num[i][j] * 2
							this.num[i][j] = 0
							this.numFlag[i][k] = true
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
						} else if (this.num[i][k] == this.num[i][j] && this.canMoveInCol(i, j, k) && !this.numFlag[i][k]) {
							this.num[i][k] = this.num[i][j] * 2
							this.num[i][j] = 0
							this.numFlag[i][k] = true
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
						} else if (this.num[k][j] == this.num[i][j] && this.canMoveInRow(j, k, i) && !this.numFlag[k][j]) {
							this.num[k][j] = this.num[i][j] * 2
							this.num[i][j] = 0
							this.numFlag[k][j] = true
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
						} else if (this.num[k][j] == this.num[i][j] && this.canMoveInRow(j, i, k) && !this.numFlag[k][j]) {
							this.num[k][j] = this.num[i][j] * 2
							this.num[i][j] = 0
							this.numFlag[k][j] = true
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
				this.numFlag[i][j] = false
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
		let v = this.width / 25
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
		let v = this.width / 25
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
		let v = this.width / 25
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
			s = this.width * 0.1 + 'px'
		else if (value <= 512)
			s = this.width * 0.066 + 'px'
		else
			s = this.width * 0.05 + 'px'
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
				this.cacheCtx.fillText('GAME OVER', this.width * 0.5, this.width * 0.5)
			}.bind(this), 600)
		}
	}
	// 事件处理
	keyDown(e) {
		if (this.gameOver)
			return
		if (e.keyCode == 38)
			this.moveUp()
		else if (e.keyCode == 40)
			this.moveDown()
		else if (e.keyCode == 37)
			this.moveLeft()
		else if (e.keyCode == 39)
			this.moveRight()
		e.preventDefault()
	}
	touchstart(e) {
		this.startX = e.touches[0].pageX
		this.startY = e.touches[0].pageY
	}
	touchmove(e) {
		if (this.gameOver)
			return
		e.preventDefault()
		if (this.flag == 1)
			return
		let endX = e.touches[0].pageX
		let endY = e.touches[0].pageY
		let deltaX = endX - this.startX
		let deltaY = endY - this.startY
		if (Math.abs(deltaX) < 0.03 * this.width && Math.abs(deltaY) < 0.03 * this.width)
			return
		this.flag = 1
		if (Math.abs(deltaX) >= Math.abs(deltaY)) {
			if (deltaX > 0)
				this.moveRight()
			else
				this.moveLeft()
		} else {
			if (deltaY > 0)
				this.moveDown()
			else
				this.moveUp()
		}
	}
	touchend(e) {
		this.flag = 0
	}
}
// 程序入口
const gameFrame = document.getElementById('gameFrame')
const canvas = document.getElementById('canvas')
const game = new Game(canvas, Math.floor(gameFrame.clientWidth / 25) * 25)
game.start()