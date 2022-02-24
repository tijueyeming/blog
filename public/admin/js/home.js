const editArticle = document.getElementById('editArticle')
const createArticle = document.getElementById('createArticle')
const editGame = document.getElementById('editGame')
const createGame = document.getElementById('createGame')

editArticle.onclick = () => window.location.href = `/admin/editArticle/index/1`

createArticle.onclick = () => window.location.href = `/admin/createArticle`

editGame.onclick = () => window.location.href = `/admin/editGame/index/1`

createGame.onclick = () => window.location.href = `/admin/createGame`