import {AsyncStorage} from 'react-native';

let defaultConfig = {
	notifications: [true, true],
	calendar: [true, true, true]
}
let currConfig = undefined;

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
	console.log(currConfig);
	return currConfig;
}
let listeners = [];

export function setConfig(config) {
	currConfig = config;
	AsyncStorage.setItem('@config', JSON.stringify(config));
	
	listeners.forEach((element) => element(currConfig));
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
