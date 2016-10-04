import {Player} from "./player";
import {Ball} from "./ball";
import {Observable} from 'rx'

export let GameInstance = null

export class Game {

	constructor() {
		if(!GameInstance)
			GameInstance = this
		else {
			return GameInstance
		}

		this.container = document.createElement('main')
		this.container.className = 'field'

		this.player = new Player()
		this.container.appendChild(this.player.container)

		this.ball = new Ball()
		this.container.appendChild(this.ball.container)

		this.width = 900
		this.height = 600

	}


	newBall() {
		this.ball = new Ball()
		this.container.appendChild(this.ball.container)
	}


	appendTo(parent) {
		parent.appendChild(this.container)
	}


	init() {
		Observable.fromEvent(this.container, 'click')
			.take(1)
			.subscribe(
				(e) => {
					this.start()
				},
				(err) => {
					console.log(err)
				},
				() => {
					// setTimeout(() => {
					// 	this.stop()
					// }, 5000)
				}
			)
	}


	resetGame() {
		this.stop()
		this.ball.container.remove()
		delete this.ball
		if(this.player.lives !== 0) {
			this.newBall()
			this.init()
		}
	}


	start() {
		document.body.style.cursor = 'none'
		this.player.runSubscriptions()
		this.ball.runSubscriptions()
	}

	stop() {
		document.body.style.cursor = 'auto'
		this.player.unsubscribe()
		this.ball.unsubscribe()
	}
}
