import {Observable} from "rx";

export class Player {

	constructor() {
		this.container = document.createElement('div')
		this.container.className = 'player'

		this.move$ = Observable.fromEvent(document, 'mousemove')
			.startWith({screenX: 0})
			.pairwise()
			.map(pair => pair[1].screenX - pair[0].screenX)
			.filter(dX => {
				let newX = this.container.offsetLeft + dX
				return newX > 0 && newX < 800
			})

		this.subs = []
	}

	static init(game) {
		let player = new Player()
		game.appendChild(player.container)
		return player
	}

	runSubscriptions() {
		this.subs.push(this.move$.subscribe(
			(dX) => {
				// console.log(dX)
				this.container.style.left = this.container.offsetLeft + dX + 'px'
			}
		))
	}

	unsubscribe() {
		this.subs.forEach(sub => sub.dispose())
	}
}


