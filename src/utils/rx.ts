import {from} from "rxjs";

export function fromFunction(f) {
	return from(new Promise(resolve => resolve(f())));
}
