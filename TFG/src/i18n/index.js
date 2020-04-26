import * as EN from './en';
import * as ES from './es';

export let locale = 'es';
let listeners = [];

export function setLocale(lang) {
	locale = lang;
	listeners.forEach((element) => element(locale));
}

export function addListener(listener) {
	listeners.push(listener);
	listener();
}

export function removeListener(listener) {
	let index = listeners.indexOf(listener);
	if (index > -1)
		listeners.splice(index, 1);
}

export function get(key) {
	switch (locale) {
		case 'es':
			return ES[key];
		default:
			return EN[key];
	}
}
