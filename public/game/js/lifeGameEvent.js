const nextStep = document.getElementById('nextStep')
const restart = document.getElementById('restart')
const sel = document.getElementById('select')
const imp = document.getElementById('import')

window.onload = () => sel.selectedIndex = -1

nextStep.onclick = () => game.evolution()

restart.onclick = () =>	game.init()

imp.onclick = () => {
	let index = sel.selectedIndex
	game.importTemplate(index)
}
