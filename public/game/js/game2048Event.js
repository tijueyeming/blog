window.onload = function() {
  inIt()
  newGame()
}

window.onresize = function() {
  var i, j, tile
  width = div2048.clientWidth
  div2048.style.height = width + "px"
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      tile = document.getElementById("tile-" + i + "-" + j)
      tile.style.top = width * (0.04 + 0.24 * i) + "px"
      tile.style.left = width * (0.04 + 0.24 * j) + "px"
      tile.style.width = width * 0.2 + "px"
      tile.style.height = width * 0.2 + "px"
    }
  }
  upData()
}

document.getElementById("restart").onclick = function() {
  newGame()
}

window.onkeydown = function(e) {
  var key
  if (window.event) { // IE
    key = e.keyCode
  } else if (e.which) { // Netscape/Firefox/Opera
    key = e.which
  }
  if (!over) {
    switch (key) {
      case 37:
        if (moveLeft()) {
          setTimeout("addNum()", 210)
          setTimeout("isGameOver()", 300)
        }
        break
      case 38:
        if (moveUp()) {
          setTimeout("addNum()", 210)
          setTimeout("isGameOver()", 300)
        }
        break
      case 39:
        if (moveRight()) {
          setTimeout("addNum()", 210)
          setTimeout("isGameOver()", 300)
        }
        break
      case 40:
        if (moveDown()) {
          setTimeout("addNum()", 210)
          setTimeout("isGameOver()", 300)
        }
        break
    }
  }
}

let startx = 0
let starty = 0
let endx = 0
let endy = 0
let div = document.getElementById("div2048")
div.addEventListener('touchstart', function(e) {
  startx = e.touches[0].pageX
  starty = e.touches[0].pageY
})
div.addEventListener('touchmove', function(e) {
  e.preventDefault()
})
div.addEventListener('touchend', function(e) {
  endx = e.changedTouches[0].pageX
  endy = e.changedTouches[0].pageY
  var deltax = endx - startx
  var deltay = endy - starty
  if (Math.abs(deltax) < 0.03 * width && Math.abs(deltay) < 0.03 * width) {
    return
  }
  if (Math.abs(deltax) >= Math.abs(deltay)) {
    if (deltax > 0) {
      if (moveRight()) {
        setTimeout("addNum()", 210)
        setTimeout("isGameOver()", 300)
      }
    } else {
      if (moveLeft()) {
        setTimeout("addNum()", 210)
        setTimeout("isGameOver()", 300)
      }
    }
  } else {
    if (deltay > 0) {
      if (moveDown()) {
        setTimeout("addNum()", 210)
        setTimeout("isGameOver()", 300)
      }
    } else {
      if (moveUp()) {
        setTimeout("addNum()", 210)
        setTimeout("isGameOver()", 300)
      }
    }
  }
})
