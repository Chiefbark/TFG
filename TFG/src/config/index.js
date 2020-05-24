import {AsyncStorage} from 'react-native';
import * as firebase from '../firebase';

const defaultConfig = {profile: undefined, notifications: [true, true], calendar: [true, true, true]}

export let currConfig = undefined;
export let currNavigation = 'default';
export let lastModified = undefined;

let configListeners = [];
let navigationListeners = [];

export function addConfigListener(listener) {
	configListeners.push(listener);
}

export function removeConfigListener(listener) {
	let index = configListeners.indexOf(listener);
	if (index > -1)
		configListeners.splice(index, 1);
}

export function addNavigationListener(listener) {
	navigationListeners.push(listener);
}

export const config = async () => {
	if (!currConfig) {
		await AsyncStorage.getItem('@config')
			.then(result => {
				if (!result)
					setConfig(defaultConfig);
				else {
					setConfig(JSON.parse(result));
					if (currConfig.profile !== undefined)
						setNavigation('default');
				}
				return result;
			});
	}
	return currConfig;
}

export function setConfig(config) {
	currConfig = config;
	lastModified = new Date().getTime();
	AsyncStorage.setItem('@config', JSON.stringify(config));
	
	firebase.ref().update({notifications: config.notifications});
	
	configListeners.forEach((element) => element());
}

export function setNavigation(nav) {
	currNavigation = nav;
	lastModified = new Date().getTime();
	
	navigationListeners.forEach((element) => element(nav));
}
