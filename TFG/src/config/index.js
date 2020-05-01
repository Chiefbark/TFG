import {AsyncStorage} from 'react-native';

const defaultConfig = {notifications: [true, true], calendar: [true, true, true]}

export let currConfig = undefined;
export let lastModified = undefined;

let listeners = [];

export function addListener(listener) {
	listeners.push(listener);
}

export function removeListener(listener) {
	let index = listeners.indexOf(listener);
	if (index > -1)
		listeners.splice(index, 1);
}

export const config = async () => {
	if (!currConfig) {
		await AsyncStorage.getItem('@config')
			.then(result => {
				if (!result)
					setConfig(defaultConfig);
				else
					setConfig(JSON.parse(result));
				return result;
			});
	}
	return currConfig;
}

export function setConfig(config) {
	currConfig = config;
	lastModified = new Date().getTime();
	AsyncStorage.setItem('@config', JSON.stringify(config));
	
	listeners.forEach((element) => element());
}
