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
	title: 'Profile',
	screens: [
		{title: 'Information'},
		{
			title: 'Subjects',
			emptyList: 'You still don\'t have any subjects!\n\nAdd some subjects by clicking the button +',
			emptySubtitle: 'Unassigned teacher',
			confirmDialog: {
				title: 'Are you sure?',
				description: 'All the absences associated to the subject(s) will be removed as well',
				actions: ['Cancel', 'Remove']
			}
		},
		{
			title: 'Teachers',
			emptyList: 'You still don\'t have any teachers!\n\nAdd some teachers by clicking the button +',
			subtitle: 'subjects',
			confirmDialog: {
				title: 'Are you sure?',
				description: 'The subjects associated to the teacher(s) won\'t be removed',
				actions: ['Cancel', 'Remove']
			}
		}
	]
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
	timePickerDialog: {
		title: 'Pick a time',
		placeholders: ['Hours', 'Minutes'],
		actions: ['Cancel', 'Select']
	},
	profileDialog: {
		title: 'Select your profile',
		actions: ['Cancel']
	},
	languageDialog: {
		title: 'Select your language',
		actions: ['Cancel']
	},
	form: {
		toast: 'Please fill all the fields',
		actions: ['Cancel', 'Save']
	},
	teacherForm: {
		title: 'Teacher',
		placeholders: ['teacher\'s name...']
	},
	subjectForm: {
		title: 'Subject',
		placeholders: [
			'subject\'s name...',
			'teacher...',
			'add new teacher...',
			'Notify me when i get close to ',
			' of absences',
			'This will be the color shown in the calendar (exams/absences)',
			'Colors marked with x are already in use, but you can use them again'
		]
	},
	languages: [
		{name: 'Spanish', iso: 'es'},
		{name: 'English', iso: 'en'}
	]
}
