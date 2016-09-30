import {Observable} from 'rx'

export class Ball {

	constructor() {
		this.container = document.createElement('div')
		this.container.className = 'ball'

		this.speed = 1
		this.mV = {
			x: 0.5,
			y: 0.5
		}

		// this.move$ = Observable.interval(0)

		this.subs = []
	}

	runSubscriptions() {
		this.subs.push(
			this.move$
				.subscribe(this._move)
		)
	}

	_move() {

	}

}
