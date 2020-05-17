export const newProfile = {
	title: 'Profile wizard',
	screens: [
		{
			subtitle: 'Welcome to the Profile Wizard',
			description: [
				'From here you can create a new profile and add all the classes you need.' +
				'\n\nThanks to this profiles you can have different courses in the app and handle them independently.' +
				'\n\nYou can keep track of the absences you have had so that you don\'t have any surprises later!' +
				'\n\n\nPress the button down below to begin'
			],
			prevButton: 'exit',
			nextButton: 'Start'
		},
		{
			subtitle: 'Create your profile',
			description: [
				'Set the name of the profile you are creating.\nIt can be modified later',
				'These dates can be changed whenever you want in the schedule config found at profile screen',
				'When you are done, press the button down below to begin'
			],
			exitDialog: {
				title: 'Are you sure?',
				description: 'All the data you input won\'t be saved',
				actions: ['Cancel', 'Exit']
			},
			helpDialog: {
				placeholders: [
					'First we need to create a profile.' +
					'\nTo do so, set a name to it and set the initial and end date of the course.' +
					'\n\nDon\'t worry if you don\'t set the dates correct right now, you can modify them later',
					'If you need to see this message again, click in the help button'
				]
			}
		},
		{
			subtitle: 'Add teachers',
			description: [
				'You can add as many teachers as you want pressing the button +' +
				'\n\nYou can also edit and delete them if you hold down them',
				'When you are done, press the button down below to begin'
			],
			helpDialog: {
				placeholders: [
					'Once we have our profile, we are going to add some teachers.' +
					'\n\nDon\'t worry if you forget about someone, you can create more later',
					'If you need to see this message again, click in the help button'
				]
			}
		}
	]
}
export const calendar = {
	title: 'Calendar',
	helpText: 'Click on a day in the calendar to see more details!',
	emptySchedule: 'You don\'t have any classes added to the timetable for this day',
	absencesDialog: {
		placeholders: ['Marked subjects have absences this day']
	},
	holidaysDialog: {
		placeholders: ['Holidays!!\nYou don\'t have class today', 'Ends on']
	},
	helpDialog: {
		placeholders: [
			'Colored big dots represents the exams of a subject.\nOnly one is shown',
			'Light pink dots/lines are the holidays',
			'Small dots are the absences.\nMaximum dots are four',
			'You can disable this marking from settings'
		]
	},
	absenceChanged: ['Absence added', 'Absence removed']
}
export const statistics = {
	title: 'Statistics'
}
export const absences = {
	title: 'Absences',
	emptyList: 'You don\'t have any absences\n\nWell done!',
	headers: ['Absences of'],
	filterDialog: {
		title: 'Filter',
		placeholders: ['month...', 'subject...'],
		actions: ['Cancel', 'Clear', 'Apply']
	}
}
export const profile = {
	title: 'Profile',
	screens: [
		{
			title: 'Information',
			headers: ['Information', 'Timetables', 'Holidays', 'Exams'],
			contents: ['Name', 'Start date', 'End date']
		},
		{
			title: 'Subjects',
			emptyList: 'You still don\'t have any subjects!\n\nAdd some subjects by clicking the button +',
			emptyTeacher: 'Unassigned teacher',
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
export const timetable = {
	title: 'Timetable',
	emptyList: 'You still don\'t have any schedules!\n\nAdd some schedules by clicking the button +',
	titles: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	headerRight: 'DONE',
	emptySubject: 'Unassigned subject',
	exitDialog: {
		title: 'Are you done?',
		description: 'Your changes are already saved. If you want to continue editing them, click on cancel',
		actions: ['Cancel', 'Exit']
	},
	confirmDialog: {
		title: 'Are you sure?',
		description: 'All the absences associated to this schedule will be removed as well\nIf you are creating a new timetable, don\'t worry about deleteing it',
		actions: ['Cancel', 'Remove']
	}
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
		toasts: [
			'Please fill all the fields',
			'The end date must be later, not earlier',
			'The end time must be later, not earlier',
			'That hour range is already taken by other class'
		],
		actions: ['Cancel', 'Save', 'Add', 'Continue', 'Remove']
	},
	profileInfoForm: {
		title: 'Edit information',
		placeholders: ['profile\'s name...']
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
	scheduleForm: {
		title: 'Schedule',
		placeholders: [
			'subject...',
			'to'
		]
	},
	timetableForm: {
		title: 'Timetable',
		placeholders: [
			'Specify the start and end date of the new timetable'
		]
	},
	holidayForm: {
		title: 'Vacaciones',
		placeholders: [
			'holiday\'s name...',
			'Specify the start and end date of the new holidays',
			'Both days are included'
		]
	},
	languages: [
		{name: 'Spanish', iso: 'es'},
		{name: 'English', iso: 'en'}
	]
}
