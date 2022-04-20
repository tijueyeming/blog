const type = document.getElementById('type')
const index = document.getElementById('index')
const question = document.getElementById('question')
const selectA = document.getElementById('selectA')
const selectB = document.getElementById('selectB')
const selectC = document.getElementById('selectC')
const selectD = document.getElementById('selectD')
var data = []
var current = []

function load() {
	let xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4) {
			let res = JSON.parse(xhttp.response)
			if (res.code == 200) {
				data = res.data
				let userData = data[0][0]
				if (userData.data1 == '单选题')
					current = data[1][userData.data2]
				else if (userData.data1 == '多选题')
					current = data[2][userData.data2]
				else if (userData.data1 == '判断题')
					current = data[3][userData.data2]
				show()
			}
			else if (res.code == 500)
				alert(res.message)
		}
	}
	xhttp.open('POST', '/AnGuiKaoShi/load', true)
	xhttp.setRequestHeader('content-type','application/x-www-form-urlencoded')
	xhttp.send()
}

function show() {
	let options = type.options
	if (current.type == '单选题')
		options[0].selected = true
	else if (current.type == '多选题')
		options[1].selected = true
	else if (current.type == '判断题')
		options[2].selected = true
	index.value = current.index
	question.innerHTML = current.question
	selectA.innerHTML = 'A.' + current.A
	selectB.innerHTML = 'B.' + current.B
	selectC.innerHTML = 'C.' + current.C
	selectD.innerHTML = 'D.' + current.D
}