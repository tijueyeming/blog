const edit = document.getElementById('edit')
const title = document.getElementById('title')
const markdown = document.getElementById('markdown')
const moment = document.getElementById('moment')
const sm = document.getElementById('submit')
const del = document.getElementById('delete')

sm.onclick = () => {
    if (title.value == '')
		alert('请输入标题')
	else if (markdown.value == '')
		alert('请输入内容')
	else if (moment.value == '')
		alert('请输入时间')	
	else {
		let id = edit.getAttribute('articleId')
		let xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				let res = JSON.parse(xhttp.response)
				if (res.code == 200) {
					sm.innerHTML = res.message
					setTimeout(() => window.location.href = '/admin/editArticle/index/1', 1000)
				}
				else if (res.code == 500)
					alert(res.message)
			}
		}
		xhttp.open('POST', '/admin/editArticle', true)
		xhttp.setRequestHeader('content-type','application/x-www-form-urlencoded')
		xhttp.send(`id=${id}&title=${title.value}&markdown=${markdown.value}&moment=${moment.value}`)
	}
}

del.onclick = () => {
	if (confirm('确实要删除该内容吗?')) {
		let id = edit.getAttribute('articleId')
		let xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				let res = JSON.parse(xhttp.response)
				if (res.code == 200) {
					del.innerHTML = res.message
					setTimeout(() => window.location.href = '/admin/editArticle/index/1', 1000)
				}
				else if (res.code == 500)
					alert(res.message)
			}
		}
		xhttp.open('POST', '/admin/deleteArticle', true)
		xhttp.setRequestHeader('content-type','application/x-www-form-urlencoded')
		xhttp.send(`id=${id}`)
	}
}