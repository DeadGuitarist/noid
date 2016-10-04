import {Observable} from "rx";
import {GameInstance} from './game'

export class Player {

	constructor() {
		this.lives = 3

		this.container = document.createElement('div')
		this.container.className = 'player'
		this.container.innerText = this.lives

		this.move$ = Observable.fromEvent(document, 'mousemove')
			.pairwise()
			.map(pair => pair[1].screenX - pair[0].screenX)

		this.subs = []
	}


	die() {
		this.lives--

		this.container.innerText = this.lives
		this.container.style.bottom = '10px'
		this.container.style.left = '400px'
	}


	/**
	 *
	 */
	runSubscriptions() {
		this.subs.push(
			this.move$.subscribe(
				(dX) => {
					this._move(dX)
				},
				console.log)
		)
	}

	/**
	 *
	 * @param dX
	 * @returns {*}
	 * @private
	 */
	_move(dX) {
		if (this.container.offsetLeft + dX <= 0)
			return this.container.style.left = '0px'

		if (this.container.offsetLeft + dX >= 800)
			return this.container.style.left = '800px'

		this.container.style.left = this.container.offsetLeft + dX + 'px'
	}


	unsubscribe() {
		this.subs.forEach(sub => sub.dispose())
	}
}


