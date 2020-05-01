import {AsyncStorage} from 'react-native';

let defaultConfig = {
	notifications: [true, true],
	calendar: [true, true, true]
}
export let currConfig = undefined;
export let lastModified = undefined;

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
let listeners = [];

export function setConfig(config) {
	currConfig = config;
	lastModified = new Date().getTime();
	AsyncStorage.setItem('@config', JSON.stringify(config));
	
	listeners.forEach((element) => element(currConfig));
}
