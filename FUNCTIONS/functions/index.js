const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp();
let db = admin.database();

function getDateFromString(dateString) {
	if (dateString) {
		let arr = dateString.split('-');
		let date = new Date();
		date.setFullYear(arr[0], arr[1] - 1, arr[2]);
		date.setHours(0, 0, 0, 0);
		return date;
	}
	return undefined;
}

function addDaysToDate(dateString, days) {
	let date = getDateFromString(dateString);
	date.setDate(date.getDate() + days);
	return date.toISOString().slice(0, 10);
}

function getDayOfWeek(dateString) {
	let dayOfWeek = getDateFromString(dateString).getDay();
	return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
}

function isDateBetween(date, start, end) {
	return start <= date && date <= end;
}

function getWeeksDiff(first, second) {
	let _first = first;
	let _second = second;
	while (getDayOfWeek(_first) !== 0)
		_first = addDaysToDate(_first, 1);
	while (getDayOfWeek(_second) !== 6)
		_second = addDaysToDate(_second, -1);
	_second = addDaysToDate(_second, 1);
	
	return Math.floor((getDateFromString(_second) - getDateFromString(_first)) / (7 * 24 * 60 * 60 * 1000));
}

function getMinutesFromTime(time) {
	const arr = time.split(':');
	return arr[0] * 60 + parseInt(arr[1])
}

function getStats(profile) {
	const stats = {};
	for (const e in profile.subjects)
		stats[e] = {
			name: profile.subjects[e].name, percentage: profile.subjects[e].percentage,
			total: 0, missed: 0
		};
	for (const e in profile.schedules) {
		let weeks = getWeeksDiff(profile.schedules[e].startDate, profile.schedules[e].endDate);	// Calculates the number of weeks of the schedule
		const remains = {};
		// Adds one to every border day
		let tempDateStart = profile.schedules[e].startDate;
		while (getDayOfWeek(tempDateStart) !== 0) {
			if (!remains[getDayOfWeek(tempDateStart)]) remains[getDayOfWeek(tempDateStart)] = 1;
			else
				remains[getDayOfWeek(tempDateStart)] += 1;
			tempDateStart = addDaysToDate(tempDateStart, 1);
		}
		let tempDateEnd = profile.schedules[e].endDate;
		while (getDayOfWeek(tempDateEnd) !== 6) {
			if (!remains[getDayOfWeek(tempDateEnd)]) remains[getDayOfWeek(tempDateEnd)] = 1;
			else
				remains[getDayOfWeek(tempDateEnd)] += 1;
			tempDateEnd = addDaysToDate(tempDateEnd, -1);
		}
		let checked = [];
		let holidays = undefined;
		if (profile.holidays)
			holidays = Object.entries(profile.holidays).sort((a, b) => {	// Sorts the holidays starting from startDate
				if (a[1].startDate < b[1].startDate)
					return -1;
				if (a[1].startDate > b[1].startDate)
					return 1;
				return 0;
			})
		if (holidays)
			for (const x of holidays) {
				tempDateStart = undefined;
				tempDateEnd = undefined;
				// Sets the start & end date of the current holiday between the bounds of the schedule
				if (isDateBetween(x[1].startDate, x[1].startDate, x[1].endDate) && isDateBetween(x[1].endDate, x[1].startDate, x[1].endDate)) {
					tempDateStart = x[1].startDate;
					tempDateEnd = x[1].endDate;
				}
				if (isDateBetween(x[1].startDate, x[1].startDate, x[1].endDate) && !isDateBetween(x[1].endDate, x[1].startDate, x[1].endDate)) {
					tempDateStart = x[1].startDate;
					tempDateEnd = x[1].endDate;
				}
				if (!isDateBetween(x[1].startDate, x[1].startDate, x[1].endDate) && isDateBetween(x[1].endDate, x[1].startDate, x[1].endDate)) {
					tempDateStart = x[1].startDate;
					tempDateEnd = x[1].endDate;
				}
				if (tempDateStart && tempDateEnd) {	// If start & end date exists (holiday is inside the bounds of the schedule)
					// If the holiday is inside another holiday
					if (checked.find(y => y.startDate <= tempDateStart && y.endDate >= tempDateEnd))
						return;
					let index, found;
					// If the holiday is at the left side of another holiday
					found = checked.find(y => !isDateBetween(tempDateStart, y.startDate, y.endDate) && isDateBetween(tempDateEnd, y.startDate, y.endDate));
					if (found) {
						tempDateEnd = found.endDate;
						index = checked.indexOf(found);
					}
					// If the holiday is at the right side of another holiday
					found = checked.find(y => isDateBetween(tempDateStart, y.startDate, y.endDate) && !isDateBetween(tempDateEnd, y.startDate, y.endDate));
					if (found) {
						tempDateStart = found.startDate;
						index = checked.indexOf(found);
					}
					// Add the holiday or overrides the found
					if (index !== undefined)
						checked[index] = {startDate: tempDateStart, endDate: tempDateEnd};
					else
						checked.push({startDate: tempDateStart, endDate: tempDateEnd});
				}
			}
		checked.forEach(x => {
			weeks -= getWeeksDiff(x.startDate, x.endDate);
			let tempDateStart = x.startDate;
			while (getDayOfWeek(tempDateStart) !== 0) {
				if (!remains[getDayOfWeek(tempDateStart)]) remains[getDayOfWeek(tempDateStart)] = -1;
				else
					remains[getDayOfWeek(tempDateStart)] -= 1;
				tempDateStart = addDaysToDate(tempDateStart, 1);
			}
			let tempDateEnd = x.endDate;
			while (getDayOfWeek(tempDateEnd) !== 6) {
				if (!remains[getDayOfWeek(tempDateEnd)]) remains[getDayOfWeek(tempDateEnd)] = -1;
				else
					remains[getDayOfWeek(tempDateEnd)] -= 1;
				tempDateEnd = addDaysToDate(tempDateEnd, -1);
			}
		})
		
		Object.entries(profile.schedules[e]).forEach(x =>
			Object.entries(x[1]).forEach(y => {
				if (y[1].id_subject) {
					const mult = weeks + (remains[x[0]] || 0);
					remains[x[0]] = 0;
					stats[y[1].id_subject].total += (getMinutesFromTime(y[1].endTime) - getMinutesFromTime(y[1].startTime)) * mult;
				}
			}))
	}
	if (profile.absences)
		Object.entries(profile.absences).forEach(e =>
			Object.entries(e[1]).forEach(x => {
				const arr = x[1].path.split('/');
				if (profile.schedules) {
					const find = Object.entries(profile.schedules).find(y => y[0] === arr[0])
					if (find) {
						const schedule = find[1][arr[1]][x[0]];
						stats[schedule.id_subject].missed += (getMinutesFromTime(schedule.endTime) - getMinutesFromTime(schedule.startTime));
					}
				}
			}))
	return stats;
}

exports.absenceFuntion = functions.pubsub.schedule('every day 10:00').onRun((context) => {
	console.log('Starting absences fetch', new Date());
	
	db.ref('users/').once('value').then(snapshot => {
		const users = snapshot.val() || {};
		for (const e in users) {
			if (users[e].notifications[1])
				for (const x of users[e].profiles) {
					const stats = getStats(x);
					const date = new Date();
					date.setDate(date.getDate() + 1);
					const absences = [];
					const schedule = Object.entries(x.schedules).find(y => isDateBetween(date.toISOString().slice(0, 10), y[1].startDate, y[1].endDate))
					if (schedule && x.schedules[schedule[0]][getDayOfWeek(date.toISOString().slice(0, 10))]) {
						const currSchedule = x.schedules[schedule[0]][getDayOfWeek(date.toISOString().slice(0, 10))]
						for (const y in x.schedules[schedule[0]][getDayOfWeek(date.toISOString().slice(0, 10))]) {
							const currStats = stats[currSchedule[y].id_subject];
							const mins = getMinutesFromTime(currSchedule[y].endTime) - getMinutesFromTime(currSchedule[y].startTime);
							if ((100 * currStats.missed / currStats.total) < currStats.percentage && (100 * (currStats.missed + mins) / currStats.total) >= currStats.percentage)
								absences.push(currStats.name);
						}
					}
					if (absences.length > 0 && (!x.holidays || !Object.entries(x.holidays).find(y => isDateBetween(date.toISOString().slice(0, 10), y[1].startDate, y[1].endDate))))
						fetch('https://exp.host/--/api/v2/push/send', {
							method: 'POST',
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								to: users[e].token,
								title: `${x.name} - ${users[e].lang === 'es' ? 'No faltes mañana!' : 'Don\'t miss tomorrow!'}`,
								body: absences.join('\n'),
								sound: 'default'
							})
						})
				}
		}
		return null;
	}).catch(err => console.log(err));
	
	return null;
})

function getExams(profile) {
	const exams = [];
	for (const e in profile.exams) {
		const date = new Date();
		date.setDate(date.getDate() + 1);
		if (profile.exams[e].date === date.toISOString().slice(0, 10))
			exams.push(profile.subjects[profile.exams[e].id_subject].name)
	}
	return exams;
}

exports.examFunction = functions.pubsub.schedule('every day 10:00').onRun((context) => {
	console.log('Starting exams fetch', new Date());
	
	db.ref('users/').once('value').then(snapshot => {
		const users = snapshot.val() || {};
		for (const e in users) {
			if (users[e].notifications[0])
				for (const x of users[e].profiles) {
					const exams = getExams(x);
					if (exams.length > 0)
						fetch('https://exp.host/--/api/v2/push/send', {
							method: 'POST',
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								to: users[e].token,
								title: `${x.name} - ${users[e].lang === 'es' ? 'Mañana tienes examen!' : 'Tomorrow you have an exam!'}`,
								body: exams.join('\n'),
								sound: 'default'
							})
						})
				}
		}
		return null;
	}).catch(err => console.log(err));
	
	return null;
});
