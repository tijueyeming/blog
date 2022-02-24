const title = document.getElementById('title')
const code = document.getElementById('code')
const markdown = document.getElementById('markdown')
const sm = document.getElementById('submit')

sm.onclick = () => {
    if (title.value == '')
		alert('请输入标题')
	else if (code.value == '')
		alert('请输入代号')
	else if (markdown.value == '')
		alert('请输入手册')
	else {
		let xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				let res = JSON.parse(xhttp.response)
				if (res.code == 200) {
					sm.innerHTML = res.message
					setTimeout(() => window.location.href = '/admin/editGame/index/1', 1000)
				}
				else if (res.code == 500)
					alert(res.message)
			}
		}
		xhttp.open('POST', '/admin/createGame', true)
		xhttp.setRequestHeader('content-type','application/x-www-form-urlencoded')
		xhttp.send(`title=${title.value}&code=${code.value}&markdown=${markdown.value}`)
	}
}