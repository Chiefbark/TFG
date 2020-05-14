import firebase from 'firebase';
import {AsyncStorage} from 'react-native';

import * as config from '../config';

const firebaseConfig = {
	apiKey: "apiKey",
	authDomain: "authDomain",
	databaseURL: "databaseURL"
};

let currFirebaseKey = undefined;

if (!firebase.apps.length)
	firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export const firebaseKey = async () => {
	if (!currFirebaseKey) {
		await AsyncStorage.getItem('@firebaseKey')
			.then(result => {
				if (!result) {
					currFirebaseKey = db.ref('users/').push({createdAt: new Date().getTime()}).getKey();
					db.ref(`users/${currFirebaseKey}/profiles/0`).set({name: 'Profile 01'});
				} else
					currFirebaseKey = result;
				AsyncStorage.setItem('@firebaseKey', currFirebaseKey);
				return result;
			});
	}
	return currFirebaseKey;
}

export function ref(node) {
	switch (node) {
		case 'teachers':
			return db.ref(`users/${currFirebaseKey}/profiles/${config.currConfig.profile}/teachers`);
		case 'subjects':
			return db.ref(`users/${currFirebaseKey}/profiles/${config.currConfig.profile}/subjects`);
		case 'schedules':
			return db.ref(`users/${currFirebaseKey}/profiles/${config.currConfig.profile}/schedules`);
		case 'currProfile':
			return db.ref(`users/${currFirebaseKey}/profiles/${config.currConfig.profile}`);
		case 'profiles':
			return db.ref(`users/${currFirebaseKey}/profiles`);
		default:
			return db.ref(`users/${currFirebaseKey}`);
	}
}
