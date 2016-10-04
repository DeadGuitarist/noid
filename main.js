import "./main.scss"
import {Game} from "./components/game";


main()

function main() {
	const game = new Game()
	game.appendTo(document.body)
	game.init()
}