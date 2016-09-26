import "./main.css"
import {Observable} from "rx"

function main() {
	let game = document.getElementById('game')
	let startSubscription = Observable.fromEvent(game, 'click')
		.debounce(100)
		.subscribe(() => {
			startGame()
			startSubscription.unsubscribe()
		})
}

function startGame() {

}

function endGame() {

}