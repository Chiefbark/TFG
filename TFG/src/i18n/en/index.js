export const calendar = {
	title: 'Calendar',
	helpText: 'Click on a day in the calendar to see more details!'
}
export const statistics = {
	title: 'Statistics'
}
export const absences = {
	title: 'Absences'
}
export const profile = {
	title: 'Profile'
}
export const settings = {
	title: 'Settings',
	headers: ['Profile', 'Language', 'Notifications', 'Calendar information'],
	items: ['Exam close', 'Absences limit', 'Show absences', 'Show holidays', 'Show exams'],
	actions: ['change...', 'change...']
}

export const commons = {
	calendarLocales: {
		monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	},
	helpDialog: {
		title: 'Need help?',
		actions: ['Ok']
	},
	calendarPickerDialog: {
		title: 'Pick a date',
		actions: ['Cancel', 'Select']
	},
	languageDialog: {
		title: 'Select your language',
		actions: ['Ok']
	},
	languages: [
		{name: 'Spanish', iso: 'es'},
		{name: 'English', iso: 'en'}
	]
}
