var div2048 = document.getElementById("div2048")
var width = div2048.clientWidth
var num = []
var numAdded = []
var over = false

function inIt() { //铺设棋盘
  var i, j, tile
  div2048.style.height = width + "px"
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      tile = document.getElementById("tile-" + i + "-" + j)
      tile.style.top = width * (0.04 + 0.24 * i) + "px"
      console.log(tile.style.top)
      tile.style.left = width * (0.04 + 0.24 * j) + "px"
      tile.style.width = width * 0.2 + "px"
      tile.style.height = width * 0.2 + "px"
    }
  }
  for (i = 0; i < 4; i++) {
    num[i] = []
    numAdded[i] = []
    for (j = 0; j < 4; j++) {
      num[i][j] = 0
      numAdded[i][j] = false
    }
  }
}

function newGame() { //新游戏
  over = false
  var i, j
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      num[i][j] = 0
    }
  }
  upData()
  addNum()
  addNum()
  showScore()
}

function addNum() {
  var i, j
  if (noSpace())
    return false
  while (true) {
    i = Math.floor(Math.random() * 4)
    j = Math.floor(Math.random() * 4)
    if (num[i][j] == 0) {
      break
    }
  }
  var randNum = Math.random() < 0.8 ? 2 : 4
  num[i][j] = randNum
  showNum(i, j, randNum)
  return true
}

function moveLeft() {
  var i, j, k
  var moved = false
  if (!canMoveLeft())
    return moved
  for (i = 0; i < 4; i++) {
    for (j = 1; j < 4; j++) {
      if (num[i][j] != 0) {
        for (k = 0; k < j; k++) {
          if (num[i][k] == 0 && canMoveInRow(i, k, j)) {
            showMove(i, j, i, k)
            num[i][k] = num[i][j]
            num[i][j] = 0
            moved = true
            break
          } else if (num[i][k] == num[i][j] && canMoveInRow(i, k, j) && !numAdded[i][k]) {
            showMove(i, j, i, k)
            num[i][k] = num[i][j] * 2
            num[i][j] = 0
            numAdded[i][k] = true
            moved = true
            break
          }
        }
      }
    }
  }
  showScore()
  setTimeout("upData()", 200)
  return moved
}

function moveUp() {
  var i, j, k
  var moved = false
  if (!canMoveUp())
    return moved
  for (j = 0; j < 4; j++) {
    for (i = 1; i < 4; i++) {
      if (num[i][j] != 0) {
        for (k = 0; k < i; k++) {
          if (num[k][j] == 0 && canMoveInCol(j, k, i)) {
            showMove(i, j, k, j)
            num[k][j] = num[i][j]
            num[i][j] = 0
            moved = true
            break
          } else if (num[k][j] == num[i][j] && canMoveInCol(j, k, i) && !numAdded[k][j]) {
            showMove(i, j, k, j)
            num[k][j] = num[i][j] * 2
            num[i][j] = 0
            numAdded[k][j] = true
            moved = true
            break
          }
        }
      }
    }
  }
  showScore()
  setTimeout("upData()", 200)
  return moved
}

function moveRight() {
  var i, j, k
  var moved = false
  if (!canMoveRight())
    return moved
  for (i = 0; i < 4; i++) {
    for (j = 2; j > -1; j--) {
      if (num[i][j] != 0) {
        for (k = 3; k > j; k--) {
          if (num[i][k] == 0 && canMoveInRow(i, j, k)) {
            showMove(i, j, i, k)
            num[i][k] = num[i][j]
            num[i][j] = 0
            moved = true
            break
          } else if (num[i][k] == num[i][j] && canMoveInRow(i, j, k) && !numAdded[i][k]) {
            showMove(i, j, i, k)
            num[i][k] = num[i][j] * 2
            num[i][j] = 0
            numAdded[i][k] = true
            moved = true
            break
          }
        }
      }
    }
  }
  showScore()
  setTimeout("upData()", 200)
  return moved
}

function moveDown() {
  var i, j, k
  var moved = false
  if (!canMoveDown())
    return moved
  for (j = 0; j < 4; j++) {
    for (i = 2; i > -1; i--) {
      if (num[i][j] != 0) {
        for (k = 3; k > i; k--) {
          if (num[k][j] == 0 && canMoveInCol(j, i, k)) {
            showMove(i, j, k, j)
            num[k][j] = num[i][j]
            num[i][j] = 0
            moved = true
            break
          } else if (num[k][j] == num[i][j] && canMoveInCol(j, i, k) && !numAdded[k][j]) {
            showMove(i, j, k, j)
            num[k][j] = num[i][j] * 2
            num[i][j] = 0
            numAdded[k][j] = true
            moved = true
            break
          }
        }
      }
    }
  }
  showScore()
  setTimeout("upData()", 200)
  return moved
}

function isGameOver() {
  if (!canMoveDown() && !canMoveLeft() && !canMoveRight() && !canMoveUp()) {
    over = true
    gameOver()
  }
}

function gameOver() {
  var i, j, tile
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      tile = document.getElementById(i + "-" + j)
      tile.textContent = ""
    }
  }
  document.getElementById("1-0").textContent = "G"
  document.getElementById("1-1").textContent = "A"
  document.getElementById("1-2").textContent = "M"
  document.getElementById("1-3").textContent = "E"
  document.getElementById("2-0").textContent = "O"
  document.getElementById("2-1").textContent = "V"
  document.getElementById("2-2").textContent = "E"
  document.getElementById("2-3").textContent = "R"
}
//工具==============================================================================================================
function upData() {
  var i, j, tile
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      tile = document.getElementById(i + "-" + j)
      if (tile)
        tile.parentNode.removeChild(tile)
    }
  }
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      tile = document.createElement('div')
      tile.className = "tile"
      tile.id = i + "-" + j
      div2048.appendChild(tile)
      if (num[i][j] == 0) {
        tile.style.top = width * (0.14 + 0.24 * i) + "px"
        tile.style.left = width * (0.14 + 0.24 * j) + "px"
        tile.style.width = 0
        tile.style.height = 0
        tile.textContent = ""
      } else {
        tile.style.background = getNumBg(num[i][j])
        tile.style.color = getNumColor(num[i][j])
        tile.style.fontSize = getFontSize(num[i][j])
        tile.style.lineHeight = width * 0.2 + "px"
        tile.style.top = width * (0.04 + 0.24 * i) + "px"
        tile.style.left = width * (0.04 + 0.24 * j) + "px"
        tile.style.width = width * 0.2 + "px"
        tile.style.height = width * 0.2 + "px"
        tile.textContent = num[i][j]
      }
      numAdded[i][j] = false
    }
  }
}

function showScore() {
  var score = 0
  var i, j
  for (i = 0; i < 4; i++)
    for (j = 0; j < 4; j++)
      score += num[i][j]
  document.getElementById("score").textContent = String(score)
}

function getNumBg(num) {
  switch (num) {
    case 2:
      return "#eee4da"
      break
    case 4:
      return "#ece0c8"
      break
    case 8:
      return "#f2b179"
      break
    case 16:
      return "#f59563"
      break
    case 32:
      return "#f57c5f"
      break
    case 64:
      return "#f65d3b"
      break
    case 128:
      return "#edce71"
      break
    case 256:
      return "#edcc61"
      break
    case 512:
      return "#ecc850"
      break
    case 1024:
      return "#edc53f"
      break
    case 2048:
      return "#eec22e"
      break
    case 4096:
      return "#98c8eb"
    case 8192:
      return "#50aaeb"
    case 16384:
      return "#808080"
  }
  return "black"
}

function getNumColor(num) {
  if (num <= 4) {
    return "#807766"
  }
  return "#FFFFFF"
}

function getFontSize(num) {
  if (num <= 64) {
    return width * 0.1 + "px"
  } else if (num <= 512) {
    return width * 0.066 + "px"
  } else
    return width * 0.05 + "px"
}

function noSpace() {
  var i, j;
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (num[i][j] == 0)
        return false;
    }
  }
  return true
}

function canMoveLeft() {
  var i, j
  for (i = 0; i < 4; i++) {
    for (j = 1; j < 4; j++) {
      if (num[i][j] != 0) {
        if (num[i][j - 1] == 0 || num[i][j - 1] == num[i][j])
          return true
      }
    }
  }
  return false
}

function canMoveRight() {
  var i, j
  for (i = 0; i < 4; i++) {
    for (j = 2; j >= 0; j--) {
      if (num[i][j] != 0) {
        if (num[i][j + 1] == 0 || num[i][j] == num[i][j + 1])
          return true
      }
    }
  }
  return false
}

function canMoveUp() {
  var i, j
  for (i = 1; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (num[i][j] != 0) {
        if (num[i - 1][j] == 0 || num[i - 1][j] == num[i][j])
          return true
      }
    }
  }
  return false
}

function canMoveDown() {
  var i, j
  for (i = 2; i >= 0; i--) {
    for (j = 0; j < 4; j++) {
      if (num[i][j] != 0) {
        if (num[i + 1][j] == 0 || num[i + 1][j] == num[i][j])
          return true
      }
    }
  }
  return false
}

function canMoveInRow(x, y1, y2) {
  var j
  for (j = y1 + 1; j < y2; j++) {
    if (num[x][j] != 0) {
      return false
    }
  }
  return true
}

function canMoveInCol(y, x1, x2) {
  var i
  for (i = x1 + 1; i < x2; i++) {
    if (num[i][y] != 0) {
      return false
    }
  }
  return true
}
//动画==============================================================================================================
function showNum(i, j, num) {
  var t = 0
  var int, p1, p2
  var p3 = width * 0.24 * i
  var p4 = width * 0.24 * j
  var tile = document.getElementById(i + "-" + j)
  tile.style.background = getNumBg(num)
  tile.style.color = getNumColor(num)
  tile.style.fontSize = getFontSize(num)
  int = setInterval(function() {
    if (t <= 1) {
      t += 0.05
      p1 = t * width * 0.2
      p2 = width * (0.14 - 0.1 * t)
      tile.style.lineHeight = p1 + "px"
      tile.style.top = p2 + p3 + "px"
      tile.style.left = p2 + p4 + "px"
      tile.style.width = p1 + "px"
      tile.style.height = p1 + "px"
      tile.textContent = num
    } else
      clearInterval(int)
  }, 5)
}

function showMove(x1, y1, x2, y2) {
  var t = 0,
    p1, p2
  var p3 = width * (0.04 + 0.24 * x1)
  var p4 = width * (0.04 + 0.24 * y1)
  var int
  var tile = document.getElementById(x1 + "-" + y1)
  int = setInterval(function() {
    if (t <= 1) {
      t += 0.05
      p1 = width * 0.24 * (x2 - x1) * t
      p2 = width * 0.24 * (y2 - y1) * t
      tile.style.top = p1 + p3 + "px"
      tile.style.left = p2 + p4 + "px"
    } else
      clearInterval(int)
  }, 10)
}
