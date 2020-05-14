/**
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
