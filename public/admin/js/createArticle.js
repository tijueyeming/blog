const title = document.getElementById('title')
const markdown = document.getElementById('markdown')

function postArticle() {
    if (title.value == '')
		alert('请输入标题')
	else if (markdown.value == '')
		alert('请输入内容')
	else {
		let xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				let res = JSON.parse(xhttp.response)
				if (res.code == 200)
					jump('/admin/editArticle/index/1')
				else if (res.code == 500)
					alert(res.message)
			}
		}
		xhttp.open('POST', '/admin/createArticle', true)
		xhttp.setRequestHeader('content-type','application/x-www-form-urlencoded')
		xhttp.send(`title=${title.value}&markdown=${markdown.value}`)
	}
}