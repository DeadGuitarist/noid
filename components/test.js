import {Observable} from "rx"

export default function test() {
	Observable.from([1, 2, 3])
		.subscribe((v) => {
			document.write(v)
		})
}
