import {AsyncStorage, NativeModules, Platform} from 'react-native';
import * as EN from './en';
import * as ES from './es';
import {LocaleConfig} from 'react-native-calendars';
import * as firebase from '../firebase';

export let currLocale = undefined;
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

export const locale = async () => {
	if (!currLocale) {
		await AsyncStorage.getItem('@locale')
			.then(result => {
				if (!result) setLocale(getDeviceLanguage());
				else setLocale(result);
				return result;
			});
	}
	return currLocale;
};

export function setLocale(lang) {
	currLocale = lang;
	lastModified = new Date().getTime();
	AsyncStorage.setItem('@locale', lang);
	
	firebase.ref().update({lang: lang});
	
	if (!LocaleConfig.locales[currLocale])
		LocaleConfig.locales[currLocale] = get('commons.calendarLocales');
	LocaleConfig.defaultLocale = currLocale;
	
	listeners.forEach((element) => element());
}

export function get(keys) {
	let value;
	switch (currLocale) {
		case 'es':
			value = ES;
			break;
		default:
			value = EN;
	}
	return find(value, ...keys.split('.'));
}

export function getSelectedLang() {
	switch (currLocale) {
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

function getDeviceLanguage() {
	const deviceLanguage =
		Platform.OS === 'ios'
			? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
			: NativeModules.I18nManager.localeIdentifier;
	
	return /^es_/.test(deviceLanguage) ? 'es' : 'en';
}
