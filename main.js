import "./main.scss"
import {Observable} from "rx"
import {Game} from "./components/game";


main()

function main() {
	const game = new Game()
	game.appendTo(document.body)

	Observable.fromEvent(game.container, 'click')
		.take(1)
		.subscribe(
			(e) => {
				game.start()
			},
			(err) => {
				console.log(err)
			},
			() => {
				console.log('done')
				setTimeout(() => {
					game.stop()
				}, 5000)
			}
		)
}