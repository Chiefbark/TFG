import firebase from 'firebase';
import {AsyncStorage} from 'react-native';

const firebaseConfig = {
	apiKey: "apiKey",
	authDomain: "authDomain",
	databaseURL: "databaseURL"
};

export let currFirebaseKey = undefined;

if (!firebase.apps.length)
	firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export function getDatabase() {
	return db;
}

export const firebaseKey = async () => {
	if (!currFirebaseKey) {
		await AsyncStorage.getItem('@firebaseKey')
			.then(result => {
				if (!result) currFirebaseKey = db.ref('users/').push({createdAt: new Date().getTime()}).getKey();
				else
					currFirebaseKey = result;
				AsyncStorage.setItem('@firebaseKey', currFirebaseKey, (error) => console.log(error));
				return result;
			});
	}
	return currFirebaseKey;
}
