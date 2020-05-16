import firebase from 'firebase';
import {AsyncStorage} from 'react-native';

import * as config from '../config';
import {addDaysToDate, getDatesBetween} from '../utils';

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
		case 'holidays':
			return db.ref(`users/${currFirebaseKey}/profiles/${config.currConfig.profile}/holidays`);
		case 'exams':
			return db.ref(`users/${currFirebaseKey}/profiles/${config.currConfig.profile}/exams`);
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

export function updateTimetable(id_timetable, prevDates, newDates, index) {
	if (prevDates.endDate !== newDates.endDate) {
		ref('schedules').once('value', snapshot => {	// Read schedules
			let data = snapshot.val() || {};
			const entries = Object.entries(data);
			if (entries[index + 1]) {	// If there is another timetable following
				const date = addDaysToDate(newDates.endDate, 1)
				snapshot.ref.child(entries[index + 1][0]).update({startDate: date})	// Updates its startDate
			}
		})
	}
	if (prevDates.startDate !== newDates.startDate) {
		ref('schedules').once('value', snapshot => {	// Read schedules
			let data = snapshot.val() || {};
			const entries = Object.entries(data);
			if (entries[index - 1]) {	// If there is another timetable previous
				const date = addDaysToDate(newDates.startDate, -1)
				snapshot.ref.child(entries[index - 1][0]).update({endDate: date})	// Updates its endDate
			}
		})
	}
}

function removeAbsencesOfTimetable(id_timetable) {
	let references = {};
	ref('absences').once('value', snapshot => {	// Read absences
		let data = snapshot.val() || {}
		Object.entries(data).forEach(e =>	// Iterates over each date
			Object.entries(e[1]).forEach(x => {	// Iterates over each absence
				if (x[1].path.split('/')[0] === id_timetable)	// If the ref to the timetable is equal to the current deleted timetable
					references[`${e[0]}/${x[0]}`] = null	// Add the reference to the absence node
			})
		)
	}).then(result => ref('absences').update({...references}))
}

export function removeTimetable(id_timetable, index, date) {
	ref('schedules').child(id_timetable).remove();	// Removes the timetable
	removeAbsencesOfTimetable(id_timetable);	// Removes all the absences of the timetable
	ref('schedules').once('value', snapshot => {	// Read schedules
		let data = snapshot.val() || {};
		const entries = Object.entries(data);
		if (index > 0)
			snapshot.ref.child(entries[index - 1][0]).update({endDate: date});	// Update endDate of last schedule with the removed endDate
		else
			snapshot.ref.child(entries[0][0]).update({startDate: date});	// Update startDate of first schedule with the removed startDate
	})
}

function _removeTimetableListener(snapshot) {
	let data = snapshot.val() || {};
	const entries = Object.entries(data);
	let references = {};
	entries.forEach((e, index) => {
		if (e[1].startDate > e[1].endDate)
			references[e[0]] = null
	})
	if (Object.keys(references).length > 0)
		ref('schedules').update({...references})
}

function _linkTimetablesListener(snapshot) {
	let data = snapshot.val() || {};
	const entries = Object.entries(data);
	let links = {};
	let dates = {};
	for (let ii = 0; ii < entries.length - 1; ii++) {
		const date = addDaysToDate(entries[ii + 1][1].startDate, -1);
		if (entries[ii][1].endDate !== date) {
			links[`${entries[ii][0]}/endDate`] = date
			getDatesBetween(entries[ii][1].endDate, date).forEach((e, index, arr) => {
				if (index < arr.length - 1 && index > 0)
					dates[e] = null
			});
		}
	}
	if (Object.keys(links).length > 0)
		ref('schedules').update({...links})
	if (Object.keys(dates).length > 0)
		ref('absences').update({...dates})
}

export function addListenersToTimetables() {
	ref('schedules').on('value', _removeTimetableListener);
	ref('schedules').on('value', _linkTimetablesListener);
}

export function removeListenersToTimetables() {
	ref('schedules').off('value', _removeTimetableListener);
	ref('schedules').off('value', _linkTimetablesListener);
}
