import * as i18n from '../i18n';

/**
 * Compares two times (HH:mm)
 *
 * @param time1 - first time to compare
 * @param time2 - second time to compare
 * @return {number} -1 if time1 is bigger, 0 if equals and 1 if time2 bigger
 */
export function compareTimes(time1, time2) {
	const start = {hours: parseInt(time1.split(':')[0]), minutes: parseInt(time1.split(':')[1])};
	const end = {hours: parseInt(time2.split(':')[0]), minutes: parseInt(time2.split(':')[1])};
	
	if (start.hours > end.hours)
		return -1;
	if (start.hours === end.hours && start.minutes === end.minutes)
		return 0;
	if (start.hours === end.hours && start.minutes > end.minutes)
		return -1;
	else
		return 1;
}

/**
 * Returns the day of the week as number [0: monday, 6: sunday]
 * @param dateString - yyyy-MM-dd
 * @return {number} The day of the week as number
 */
export function getDayOfWeek(dateString) {
	let dayOfWeek = getDateFromString(dateString).getDay();
	return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
}

/**
 * Returns the ISO date with the format dd MMMM yyyy
 * @param dateString - yyyy-MM-dd
 * @return {string} The ISO date
 */
export function getISODate(dateString) {
	const arr = dateString.split('-');
	const month = i18n.get(`commons.calendarLocales.monthNames.${parseInt(arr[1]) - 1}`)
	return `${arr[2]} ${month} ${arr[0]}`;
}

/**
 * Returns all the dates between the two specified (both included)
 *
 * @param first - The first date
 * @param second - The second date
 * @return {[]} Array of the dates between the two specified
 */
export function getDatesBetween(first, second) {
	let startDate = getDateFromString(first);
	let endDate = getDateFromString(second);
	if (startDate.getTime() > endDate.getTime()) {
		let temp = startDate;
		startDate = endDate;
		endDate = temp;
	}
	let dates = [];
	startDate.setDate(startDate.getDate() + 1);
	dates.push(startDate.toISOString().slice(0, 10));
	if (endDate) {
		while (startDate.getTime() < endDate.getTime()) {
			startDate.setDate(startDate.getDate() + 1);
			dates.push(startDate.toISOString().slice(0, 10));
		}
		endDate.setDate(endDate.getDate() + 1);
		dates.push(endDate.toISOString().slice(0, 10));
	}
	return dates;
}

/**
 * Checks if the date is between the two specified (both included)
 *
 * @param date - The date to check
 * @param start - The initial date
 * @param end - The final date
 * @return {bool} TRUE if the date is between, false otherwise
 */
export function isDateBetween(date, start, end) {
	return getDatesBetween(start, end).find(e => e == date);
}

/**
 * Adds a specific number of days to the specific date
 *
 * @param dateString - The date where to add days
 * @param days - The number of days to add
 * @return {string} yyyy-MM-dd
 */
export function addDaysToDate(dateString, days) {
	let date = getDateFromString(dateString);
	date.setDate(date.getDate() + days + 1);
	return date.toISOString().slice(0, 10);
}

/**
 * Returns the Date object of the current date string (yyyy-MM-dd)
 *
 * @param dateString - yyyy-MM-dd
 * @return {undefined|Date} undefined if dateString is undefined, Date() otherwise
 */
export function getDateFromString(dateString) {
	if (dateString) {
		let arr = dateString.split('-');
		let date = new Date();
		date.setFullYear(arr[0], arr[1] - 1, arr[2]);
		date.setHours(0, 0, 0, 0);
		return date;
	}
	return undefined;
}
