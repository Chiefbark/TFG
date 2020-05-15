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
		case 'absences':
			return db.ref(`users/${currFirebaseKey}/profiles/${config.currConfig.profile}/absences`);
		case 'currProfile':
			return db.ref(`users/${currFirebaseKey}/profiles/${config.currConfig.profile}`);
		case 'profiles':
			return db.ref(`users/${currFirebaseKey}/profiles`);
		default:
			return db.ref(`users/${currFirebaseKey}`);
	}
}

function removeAbsencesOfSubject(id_subject) {
	let references = {};
	ref('absences').once('value', snapshot1 => {
		let data1 = snapshot1.val() || {};	// Read absences
		Object.entries(data1).forEach(e =>	// Iterates over each day
			Object.entries(e[1]).forEach(x =>	// Iterates over each absence
				ref('schedules').child(`${x[1].path}/${x[0]}`)    // Find the schedule associated to the absence
					.once('value', snapshot2 => {
						let data2 = snapshot2.val() || {};
						if (data2.id_subject === id_subject)	// If the subject id of the absence is equal to the current deleted subject
							references[`${e[0]}/${x[0]}`] = null	// Add the reference to the absence node
					})
			))
	}).then(result => ref('absences').update({...references}));
}

export function removeTeacher(id_teacher) {
	ref('teachers').child(id_teacher).remove();	// Removes the teacher
	let references = {};
	ref('subjects').once('value', snapshot => {	// Read subjects
		let data = snapshot.val() || {};
		Object.entries(data).forEach(e => {	// Iterates over each subject
			if (e[1].id_teacher === id_teacher)	// If the teacher id of the subject is equal to the current deleted
				references[`${e[0]}/id_teacher`] = null	// Add the reference to the id_subject node
		})
	}).then(result => ref('subjects').update({...references}));
}

export function removeSubject(id_subject, id_teacher) {
	ref('subjects').child(id_subject).remove();	// Removes the subject
	removeAbsencesOfSubject(id_subject);	// Removes all the absences of the subject
	if (id_teacher)
		ref('teachers').child(id_teacher).once('value', snapshot =>	// Read specific teacher
			snapshot.ref.update({nSubjects: snapshot.val().nSubjects - 1}));	// Rests one to the subjects count of the teachers
	let references = {};
	ref('schedules').once('value', snapshot => {	// Read schedules
		let data = snapshot.val() || {};
		Object.entries(data).forEach(e =>	// Iterates over each timetable
			Object.entries(e[1]).forEach(x =>	// Iterates over each day
				Object.entries(x[1]).forEach(y => {	// Iterates over each schedule
					if (y[1].id_subject === id_subject)	// If the subject id of the schedule is equal to the current deleted subject
						references[`${e[0]}/${x[0]}/${y[0]}/id_subject`] = null	// Add the reference to the id_subject node
				})
			))
	}).then(result => ref('schedules').update({...references}));
}

export function removeSchedule(path, id_schedule) {
	ref('schedules').child(`${path}/${id_schedule}`).remove(); 	// Removes the schedule
	let references = {};
	ref('absences').once('value', snapshot => {	// Read absences
		let data = snapshot.val() || {};
		Object.entries(data).forEach(e =>	// Iterates over each date
			Object.keys(e[1]).forEach(x => {	// Iterates over each absence
				if (x === id_schedule)	// If the key of the absence is equal to the current deleted schedule
					references[`${e[0]}/${x}`] = null	// Add the reference to the absence node
			})
		)
	}).then(result => ref('absences').update({...references}))
}

export function removeTimetable(id_timetable) {
	firebase.ref('schedules').child(id_timetable).remove();	// Removes the timetable
	// TODO: REMOVE absences associated to that absences
}
