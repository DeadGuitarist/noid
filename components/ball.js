import {Engine} from "./engine"
import {GameInstance} from './game'

export class Ball {

	constructor() {
		this.container = document.createElement('div')
		this.container.className = 'ball'

		this.speed = 1.3
		this.mV = {
			x: 0.5,
			y: 0.5
		}

		this._lastCollision = null

		this.subs = []

		console.log(this)

	}

	runSubscriptions() {
		this.subs.push(
			Engine().subscribe(() => this._move()),
			// Engine()
			// 	.filter(() => {
			// 		// не сразу же проверять на столкновение с врагом
			// 		return this.container.offsetTop < 300 && this.collision() instanceof Enemy
			// 	})
			// 	.subscribe(),
			Engine().subscribe(() => this._wallCollision())
		)
	}

	_changeDirection(x, y) {
		this.mV.x *= x
		this.mV.y *= y
	}


	_wallCollision() {
		console.log(this.container.offsetTop, this.container.offsetLeft)

		if (
			(this.container.offsetTop <= 0 && this.container.offsetLeft <= 0) ||
			(this.container.offsetTop <= 0 && this.container.offsetLeft >= GameInstance.width - this.container.clientWidth)
		) {
			this._changeDirection(-1, -1)
			return
		}


		if (this.container.offsetTop >= GameInstance.height - this.container.clientHeight) {
			GameInstance.player.die()
			GameInstance.resetGame()
			return
		}



		if (this.container.offsetTop <= 0) {
			this._changeDirection(1, -1)
			return
		}

		if (this.container.offsetLeft <= 0 || this.container.offsetLeft >= GameInstance.width - this.container.clientWidth) {
			this._changeDirection(-1, 1)
			return
		}

		return false
	}

	enemyCollision() {
		//todo Проверяем на столкновение с врагом или стеной после чего возвращаем инстанс того с кем столкнулись
		return null
	}

	unsubscribe() {
		this.subs.forEach(sub => sub.dispose())
	}


	_move() {
		this.container.style.bottom = (parseFloat(this.container.style.bottom) || 26) + (this.mV.y * this.speed) + 'px'
		this.container.style.left = (parseFloat(this.container.style.left) || 438) + (this.mV.x * this.speed) + 'px'
	}

}
