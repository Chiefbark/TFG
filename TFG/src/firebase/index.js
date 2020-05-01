import firebase from "firebase";
import {AsyncStorage} from "react-native";

const firebaseConfig = {
	apiKey: "apiKey",
	authDomain: "authDomain",
	databaseURL: "databaseURL"
};

if (!firebase.apps.length)
	firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export function getDatabase() {
	return db;
}

export async function getUserKey() {
	let key = undefined;
	await AsyncStorage.getItem('@userKey', (error, result) => {
		if (!error) key = result; else console.log(error);
	});
	if (!key) {
		key = db.ref('users/').push({createdAt: new Date().getTime()}).getKey();
		AsyncStorage.setItem('@userKey', key, (error) => console.log(error));
	}
	return key;
}
