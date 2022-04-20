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
		this.cacheCanvas.width = this.width
		this.cacheCanvas.height = this.width
		this.cacheCtx.fillStyle = '#eee4da'
		this.cacheCtx.fillRect(0, 0, this.width, this.width)
		this.cacheCtx.beginPath()
		this.cacheCtx.strokeStyle = '#b3a78f'
		this.cacheCtx.lineWidth = this.width / 100
		for (let i=1;i<9;i++) {
			this.cacheCtx.moveTo(this.width/9 * i, 0)
			this.cacheCtx.lineTo(this.width/9 * i, this.width)
			this.cacheCtx.moveTo(0, this.width/9 * i)
			this.cacheCtx.lineTo(this.width, this.width/9 * i)
		}
		this.cacheCtx.stroke()
		this.cacheCtx.closePath()
		this.cacheCtx.beginPath()
		this.cacheCtx.strokeStyle = '#807766'
		this.cacheCtx.lineWidth = this.width / 100
		for (let j=1;j<3;j++) {
			this.cacheCtx.moveTo(this.width/3 * j, 0)
			this.cacheCtx.lineTo(this.width/3 * j, this.width)
			this.cacheCtx.moveTo(0, this.width/3 * j)
			this.cacheCtx.lineTo(this.width, this.width/3 * j)
		}
		this.cacheCtx.stroke()
		this.cacheCtx.closePath()
	}
	// 显示
	show(ctx) {
		ctx.drawImage(this.cacheCanvas, 0, 0)
	}
}
class Game {
	constructor(canvas, width) {
		this.num = []
		this.numFlag = []	// 原始0 空格1
		this.gameOver = false
		this.background = new Background(width)
		this.width = width
		this.canvas = canvas
		this.ctx = canvas.getContext('2d')
		this.cacheCanvas = document.createElement('canvas')
		this.cacheCtx = this.cacheCanvas.getContext('2d')
		this.init()
	}
	init() {
		this.canvas.width = this.width
		this.canvas.height = this.width
		this.cacheCanvas.width = this.width
		this.cacheCanvas.height = this.width
		this.canvas.addEventListener('mousedown', this.mousedown.bind(this))
		this.canvas.addEventListener('touchstart', this.touchstart.bind(this))
	}
	start() {
		this.gameOver = false
		this.num = this.createMap(9)
		this.numFlag = this.createMap(9)
		this.calculate(0, 0)
		this.sudoku()
		this.show()
	}
	show() {
		this.background.show(this.cacheCtx)
		for (let i=0;i<9;i++) {
			for (let j=0;j<9;j++) {
				if (this.num[i][j]==0) continue
				this.cacheCtx.save()
				this.cacheCtx.fillStyle = this.getColor(i, j)
				this.cacheCtx.font = 'bold ' + this.width * 0.066 + 'px sans-serif'
				this.cacheCtx.textAlign = 'center'
				this.cacheCtx.textBaseline = 'middle'
				this.cacheCtx.fillText(this.num[i][j], (0.5+i)*this.width/9, (0.5+j)*this.width/9)
				this.cacheCtx.restore()
			}
		}
		this.ctx.clearRect(0, 0, this.width, this.width)
		this.ctx.drawImage(this.cacheCanvas, 0, 0)
	}
	add(x, y) {
		if (this.gameOver) return
		if (this.numFlag[x][y]==0) return
		if (this.num[x][y]<9)
			this.num[x][y] += 1
		else
			this.num[x][y] = 0
		this.show()
		this.isGameOver()
	}
	// 生成数独解
	calculate(x, y) {
		if (x>8)
			return true
		if (this.num[x][y]>0) {
			if (y==8)
				this.calculate(x+1, 0)
			else
				this.calculate(x, y+1)
		}
		let n = this.randomNine()
		for (let i=0;i<9;i++) {
			this.num[x][y] = n[i]
			if (this.check(x,y)) {
				if (y==8) {
					if (this.calculate(x+1, 0))
						return true
				}
				else {
					if (this.calculate(x, y+1))
						return true
				}
			}
		}
		this.num[x][y] = 0
		return false
	}
	// 设置谜题
	sudoku() {
		for (let i=0;i<9;i++) {
			for (let j=0;j<9;j++) {
				let n = Math.random()*3
				if (n<2) {
					this.num[i][j]=0
					this.numFlag[i][j]=1
				}
			}
		}
	}
	// 检查数独合理性
	check(x, y) {
		let a = this.checkRow(x, y)
		let b = this.checkCol(x, y)
		let c = this.checkSqu(x, y)
		return a && b && c
	}
	checkRow(x, y) {
		for (let k=0;k<9;k++) {
			if (k==x) continue
			if (this.num[k][y]==this.num[x][y])
				return false
		}
		return true
	}
	checkCol(x, y) {
		for (let k=0;k<9;k++) {
			if (k==y) continue
			if (this.num[x][k]==this.num[x][y])
				return false
		}
		return true
	}
	checkSqu(x, y) {
		let m = 3*parseInt(x/3)
		let n = 3*parseInt(y/3)
		for (let i=m;i<m+3;i++) {
			for (let j=n;j<n+3;j++) {
				if (i==x && j==y) continue
				if (this.num[i][j]==this.num[x][y])
					return false
			}
		}
		return true
	}
	// 是否游戏结束
	isGameOver() {
		for (let i=0;i<9;i++) {
			for (let j=0;j<9;j++) {
				if (this.num[i][j]==0 || !this.check(i,j)) return false
			}
		}
		this.gameOver = true
		setTimeout(function() {
			this.cacheCtx.fillStyle = '#cc00cc'
			this.cacheCtx.font = 'bold ' + this.width * 0.3 + 'px sans-serif'
			this.cacheCtx.textAlign = 'center'
			this.cacheCtx.textBaseline = 'middle'
			this.cacheCtx.fillText('胜  利', this.width * 0.5, this.width * 0.5)
			this.ctx.drawImage(this.cacheCanvas, 0, 0)
		}.bind(this), 600)
	}
	// 获取颜色
	getColor(i, j) {
		if (this.numFlag[i][j]==0)
			return '#807766'
		if (this.numFlag[i][j]==1) {
			if (this.check(i,j))
				return '#0000ff'
			else
				return '#ff0000'
		}
	}
	// 生成随机行
	randomNine() {
		let list = [1,2,3,4,5,6,7,8,9]
		for (let i=8;i>0;i--) {
			let r = Math.floor(Math.random()*(i-1))
			let k = list[i]
			list[i] = list[r]
			list[r] = k
		}
		return list
	}
	// 生成二维数组
	createMap(n) {
		let m = []
		for (let i=0;i<n;i++) {
			m[i] = []
			for (let j=0;j<n;j++)
				m[i][j] = 0
		}
		return m
	}
	// 事件
	mousedown(e) {
		e.preventDefault()
		let x = Math.floor((e.clientX - this.canvas.getBoundingClientRect().left) / (this.width / 9))
		let y = Math.floor((e.clientY - this.canvas.getBoundingClientRect().top) / (this.width / 9))
		this.add(x, y)
	}
	touchstart(e) {
		e.preventDefault()
		let x = Math.floor((e.touches[0].clientX - this.canvas.getBoundingClientRect().left) / (this.width / 9))
		let y = Math.floor((e.touches[0].clientY - this.canvas.getBoundingClientRect().top) / (this.width / 9))
		this.add(x, y)
	}
}
// 程序入口
const gameFrame = document.getElementById('gameFrame')
const canvas = document.getElementById("canvas")
// 创建游戏
const game = new Game(canvas, Math.floor(gameFrame.clientWidth))
game.start()