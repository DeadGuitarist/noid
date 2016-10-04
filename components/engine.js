import {Observable} from 'rx'

let instance = null

/**
 * @singleton
 */
export function Engine() {
	if(!instance)
		instance = Observable.interval(0)

	return instance
}
