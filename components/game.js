import {Player} from "./player";
import {Ball} from "./ball";

export class Game {
	constructor() {
		this.container = document.createElement('main')
		this.container.className = 'field'

		// this.frames$ = Observable.interval(0)

		this.player = new Player()
		this.container.appendChild(this.player.container)

		this.ball = new Ball()
		this.container.appendChild(this.ball.container)

	}

	appendTo(parent) {
		parent.appendChild(this.container)
	}

	start() {
		document.body.style.cursor = 'none'
		this.player.runSubscriptions()
	}

	stop() {
		document.body.style.cursor = 'auto'
		this.player.unsubscribe()
	}
}
