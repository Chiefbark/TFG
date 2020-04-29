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

export function get(keys) {
	let value;
	switch (locale) {
		case 'es':
			value = ES;
			break;
		default:
			value = EN;
	}
	return find(value, ...keys.split('.'));
}

export function getSelectedLang() {
	switch (locale) {
		case 'es':
			return 0;
			break;
		default:
			return 1;
	}
}

function find(value, ...keys) {
	if (keys.length === 1)
		return value[keys[0]]
	
	value = value[keys[0]]
	keys.shift()
	return value ? find(value, ...keys) : undefined;
}
