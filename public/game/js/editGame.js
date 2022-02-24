const edit = document.getElementById('edit')
const title = document.getElementById('title')
const code = document.getElementById('code')
const manual = document.getElementById('manual')
const sm = document.getElementById('submit')

sm.onclick = () => {
    if (title.value == '')
		alert('请输入标题')
	else if (code.value == '')
		alert('请输入代号')
	else if (manual.value == '')
		alert('请输入手册')
	else {
		let id = edit.getAttribute('gameId')
		let xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				let res = JSON.parse(xhttp.response)
				if (res.code == 200) {
					sm.innerHTML = res.message
					setTimeout(() => window.location.href = `/game/${id}/1`, 1000)
				}
				else if (res.code == 500)
					alert(res.message)
			}
		}
		xhttp.open('POST', '/editGame', true)
		xhttp.setRequestHeader('content-type','application/x-www-form-urlencoded')
		xhttp.send(`id=${id}&title=${title.value}&code=${code.value}&manual=${manual.value}`)
	}
}