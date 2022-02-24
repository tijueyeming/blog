const name = document.getElementById('name')
const pwd = document.getElementById('password')
const sm = document.getElementById('submit')

window.onkeydown = e => {
	switch (e.keyCode) {
		case 13:
			sm.click()
			break
	}
}

sm.onclick = () => {
    if (name.value == '' || pwd.value == '')
		alert('请输入用户名或密码')
	else {
		let xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				let res = JSON.parse(xhttp.response)
				if (res.code == 200) {
					sm.innerHTML = res.message
					setTimeout(() => window.location.href = "/admin", 1000)
				}
				else if (res.code == 500)
					alert(res.message)
			}
		}
		xhttp.open('POST', '/admin/login', true)
		xhttp.setRequestHeader('content-type','application/x-www-form-urlencoded')
		xhttp.send(`name=${name.value}&pwd=${pwd.value}`)
	}
}