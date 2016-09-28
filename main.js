import "./main.css"
import {Observable} from "rx"
import {Player} from "./components/player";

main()

function main() {
	const game = initGame()
	Observable.fromEvent(game.field, 'click')
		.take(1)
		.subscribe(
			(e) => {
				console.log(e)
				game.engine = startGame(game)
			},
			(err) => {
				console.log(err)
			},
			() => {
				console.log('done')
				setTimeout(() => {
					stopGame(game)
				}, 5000)
			}
		)


}


function initGame() {
	let field = document.createElement('main'),
		result = {}
	field.className = 'field'
	document.body.appendChild(field)

	result.player = Player.init(field)
	result.field = field
	// result.ball = Ball.init(game)

	return result
}

function startGame(game) {
	document.body.style.cursor = 'none'

	game.player.runSubscriptions()
	// game.ball.runSubscriptions()
	// game.enemies.forEach(enemy => enemy.runSubscriptions())

	// return setInterval(() => {
	//
	// }, 4)
}

function stopGame(game) {
	document.body.style.cursor = 'auto'
	clearInterval(game.engine)

	game.player.unsubscribe()

	//


}