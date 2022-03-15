const uName = document.getElementById('name')
const uPassword = document.getElementById('password')

function postLogin() {
    if (uName.value == '' || uPassword.value == '')
		alert('请输入用户名或密码')
	else {
		let xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				let res = JSON.parse(xhttp.response)
				if (res.code == 200)
					jump('/admin')
				else if (res.code == 500)
					alert(res.message)
			}
		}
		xhttp.open('POST', '/admin/login', true)
		xhttp.setRequestHeader('content-type','application/x-www-form-urlencoded')
		xhttp.send(`uName=${uName.value}&uPassword=${uPassword.value}`)
	}
}

function keyDown(event) {
	if(event.keyCode==13)
		postLogin() 
}

uName.addEventListener('keydown', keyDown)
uPassword.addEventListener('keydown', keyDown)