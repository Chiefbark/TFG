export const newProfile = {
	title: 'Asistente de Perfiles',
	nextButton: 'Continuar a',
	screens: [
		{
			subtitle: 'Bienvenido al Asistente de Perfiles',
			description: [
				'Desde aquí podrás crear un nuevo perfil y añadir todas las clases que necesites.' +
				'\n\nGracias a estos perfiles podrás tener diferentes cursos en la aplicación y manejarlos de manera independiente.' +
				'\n\nPodrás llevar la cuenta de las faltas de asistencia que has tenido para que no te lleves ninguna sorpresa luego!' +
				'\n\n\nPara empezar pulsa en "comenzar"'
			],
			prevButton: 'Salir',
			nextButton: 'Comenzar'
		},
		{
			subtitle: 'Crea tu perfil',
			description: [
				'Indica el nombre del perfil que vas a crear.\nLo podrás cambiar más tarde',
				'Estas fechas las puedes cambiar cuando quieras mediante el sistema de horarios que encontrarás en la pantalla de perfil',
				'Cuando hayas acabado pulsa en "continuar"'
			],
			exitDialog: {
				title: 'Estás seguro?',
				description: 'Todos los datos que has introducidos no se guardarán',
				actions: ['Cancelar', 'Salir']
			},
			helpDialog: {
				placeholders: [
					'Primero tenemos que crear un perfil.' +
					'\nPara ello, dale un nombre e indica las fechas de inicio y fin del curso.' +
					'\n\nNo te preocupes si no indicas las fechas correctas ahora, podrás modificarlas después.'
				]
			}
		},
		{
			subtitle: 'Añade profesores',
			description: [
				'Puedes añadir tantos profesores como quieras pulsando sobre el botón +' +
				'\n\nTambién puedes editarlos y borrarlos si los mantienes pulsados',
				'Cuando hayas acabado pulsa en "continuar"'
			],
			helpDialog: {
				placeholders: [
					'Una vez tenemos el perfil creado, vamos a añadir algunos profesores.' +
					'\n\nNo te preocupes si se te olvida alguno, podrás crear más mas adelante'
				]
			}
		},
		{
			subtitle: 'Añade asignaturas',
			description: [
				'Puedes añadir tantas asignaturas como quieras pulsando sobre el botón +' +
				'\n\nTambién puedes editarlas y borrarlas si las mantienes pulsadas',
				'Cuando hayas acabado pulsa en "continuar"'
			],
			helpDialog: {
				placeholders: [
					'Lo siguiente es añadir asignaturas a nuestro perfil.' +
					'\n\nNo te preocupes si se te olvida alguna, podrás crear más mas adelante'
				]
			}
		},
		{
			subtitle: 'Añade tus clases',
			description: [
				'Una vez que ya tienes las asignaturas definidas, puedes empezar a añadir tus clases diarias.' +
				'\n\nEn las siguientes pantallas podrás añadir las clases que tengas cada día de la semana.' +
				'\n\nSi no tienes clase algún dia puedes a la siguiente pantalla',
				'Para empezar pulsa en "comenzar"'
			],
			nextButton: 'Comenzar'
		},
		{
			subtitle: 'clases de los',
			description: [
				'Aquí puedes añadir tus clases pulsando sobre el botón +' +
				'\n\nTambién puedes editarlas y borrarlas si las mantienes pulsadas',
				'Cuando hayas acabado pulsa en "continuar"' +
				'\nSi pulsas en "saltar" terminarás la configuración del perfil y dejarás los días que te falten sin clases'
			],
			helpDialog: {
				placeholders: [
					'Toca añadir las clases diarias.' +
					'\nPara ello, indica qué asignatura tienes y a qué hora empieza y acaba.' +
					'\n\nNo te preocupes si no añades todas tus clases ahora, podrás modificarlas después.'
				]
			},
			prevButton: 'Saltar',
			nextButton: 'Terminar'
		},
		{
			title: 'Ultimos pasos',
			subtitle: 'Bien hecho!',
			description: [
				'Ya has terminado de configurar lo básico de tu perfil!' +
				'\n\nSi necesitas modificar cualquier dato del perfil, puedes hacerlo desde la pestaña de perfil' +
				'\n\nLas vacaciones y exámenes también se pueden añadir desde ahí.' +
				'\n\nRecuerda que puedes añadir y eliminar ausencias desde la petaña de calendario, pulsando cualquier día',
				'Ya estás listo para comenzar a usar la App! Si te sientes perdido, puedes encontrar diálogos de ayuda en toda la aplicación'
			],
			nextButton: 'Terminar'
		}
	]
}
export const calendar = {
	title: 'Calendario',
	loading: 'Cargando datos del calendario...',
	helpText: 'Pulsa en un día del calendario para ver más detalles!',
	emptySchedule: 'No tienes ninguna clase añadida al horario para este día',
	absencesDialog: {
		placeholders: ['Las asignaturas marcadas tienen faltas de asistencia este día']
	},
	holidaysDialog: {
		placeholders: ['Vacaciones!!\nHoy no tienes clase', 'Acaban el']
	},
	helpDialog: {
		placeholders: [
			'Los puntos de color representan los exámenes de las asignaturas.\nSólo se muestra uno',
			'Los puntos o rayas rosa claro son las vacaciones',
			'Los puntitos de colores son las faltas de asistencia.\nComo máximo se muestran cuatro',
			'Puedes desactivar esta información desde ajustes'
		]
	},
	absenceChanged: ['Falta de asistencia añadida', 'Falta de asistencia eliminada']
}
export const statistics = {
	title: 'Estadísticas',
	emptyList: '',
	missed: 'faltado',
	hours: 'horas',
	action: 'ver faltas...'
}
export const absences = {
	title: 'Ausencias',
	emptyList: 'No tienes ninguna falta de asistencia\n\nBien hecho!',
	headers: ['Ausencias de'],
	filterDialog: {
		title: 'Filtrar',
		placeholders: ['mes...', 'asignatura...'],
		actions: ['Cancelar', 'Limpiar', 'Aplicar']
	}
}
export const profile = {
	title: 'Perfil',
	screens: [
		{
			title: 'Información',
			headers: ['Información', 'Horarios', 'Vacaciones', 'Exámenes'],
			contents: ['Nombre', 'Fecha inicio', 'Fecha fin'],
			confirmDialogTimetable: {
				title: 'Estás seguro?',
				description: 'Todas las faltas de asistencia y exámenes del horario serán eliminados también',
				actions: ['Cancelar', 'Eliminar']
			},
			saveDialogTimetable: {
				title: 'Cuidado!',
				description: [
					'Las faltas de asistencia y exámenes entre ',
					' y ',
					' serán eliminados',
					'La fecha de inicio es anterior a otro horario.',
					'horario(s)',
					' serán eliminados, junto con todas sus faltas de asistencia',
					'\nQuieres continuar?'
				],
				actions: ['Cancelar', 'Continuar']
			},
			helpDialogTimetables: {
				description: 'Es posible que tu horario cambie a lo largo del curso.\nDesde aquí puedes editar, añadir o eliminar tus horarios'
			},
			confirmDialogHolidays: {
				title: 'Estás seguro?',
				description: 'Por favor confirma que quieres eliminar estas vacaciones',
				actions: ['Cancelar', 'Eliminar']
			},
			confirmDialogExam: {
				title: 'Estás seguro?',
				description: 'Por favor confirma que quieres eliminar este examen',
				actions: ['Cancelar', 'Eliminar']
			}
		},
		{
			title: 'Asignaturas',
			emptyList: 'No tienes ninguna asignatura añadida!\n\nAñade algunas asignaturas pulsando sobre el botón +',
			emptyTeacher: 'Profesor no asignado',
			confirmDialog: {
				title: 'Estás seguro?',
				description: 'Todas las faltas de asistencia de la(s) asignatura(s) y los exámenes serán eliminadas también',
				actions: ['Cancelar', 'Eliminar']
			}
		},
		{
			title: 'Profesores',
			emptyList: 'No tienes ningún profesor añadido!\n\nAñade algunos profesores pulsando sobre el botón +',
			subtitle: 'asignaturas',
			confirmDialog: {
				title: 'Estás seguro?',
				description: 'Las asigntaruas de el/los profesor(es) no serán eliminadas',
				actions: ['Cancelar', 'Eliminar']
			}
		}
	]
}
export const settings = {
	title: 'Ajustes',
	headers: ['Perfil', 'Idioma', 'Notificaciones', 'Información del calendario'],
	items: ['Exámen próximo', 'Límite de faltas', 'Mostrar faltas', 'Mostrar vacaciones', 'Mostrar exámenes'],
	actions: ['cambiar...', 'cambiar...']
}
export const timetable = {
	title: 'Horario',
	emptyList: 'No tienes ninguna clase añadido!\n\nAñade algunas clases pulsando sobre el botón +',
	titles: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
	headerRight: 'HECHO',
	emptySubject: 'Asignatura no asignada',
	exitDialog: {
		title: 'Ya has acabado?',
		description: 'Tus cambios ya se han guardado. Si quieres seguir editándolos, pulsa en cancelar',
		actions: ['Cancelar', 'Salir']
	},
	confirmDialog: {
		title: 'Estás seguro?',
		description: 'Todas las faltas de asistencia y exámenes asociados a esta hora serán eliminados\nSi estás creando un nuevo horario, no te preocupes por eliminarla',
		actions: ['Cancelar', 'Eliminar']
	}
}

export const offline = {
	description: 'No tienes conexión a internet!',
	action: 'Volver a intentar'
}

export const commons = {
	calendarLocales: {
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
	},
	helpDialog: {
		title: 'Necesitas ayuda?',
		actions: ['Aceptar']
	},
	calendarPickerDialog: {
		title: ['Selecciona una fecha', 'Selecciona las fechas'],
		actions: ['Cancelar', 'Aplicar']
	},
	timePickerDialog: {
		title: 'Selecciona una hora',
		placeholders: ['Horas', 'Minutos'],
		actions: ['Cancelar', 'Aplicar']
	},
	profileDialog: {
		title: 'Selecciona un perfil',
		actions: ['Cancelar']
	},
	languageDialog: {
		title: 'Selecciona un idioma',
		actions: ['Cancelar']
	},
	form: {
		toasts: [
			'Por favor rellena todos los campos',
			'La fecha de fin tiene que ser posterior, no anterior',
			'La hora de fin tiene que ser posterior, no anterior',
			'Ese rango de horas ya está cogido por otra clase',
			'Las horas del examen tienen que ser consecutivas'
		],
		actions: ['Cancelar', 'Guardar', 'Añadir', 'Continuar', 'Eliminar']
	},
	profileInfoForm: {
		title: 'Editar información',
		placeholders: ['nombre del perfil...']
	},
	teacherForm: {
		title: 'Profesor',
		placeholders: ['nombre del profesor...'],
		toast: 'Profesor(es) eliminado(s)'
	},
	subjectForm: {
		title: 'Asignatura',
		placeholders: [
			'nombre de la asignatura...',
			'profesor...',
			'añadir nuevo profesor...',
			'Notificarme cuando me acerque al ',
			' de ausencias',
			'Este color será el que aparezca en el calendario (exámenes/ausencias)',
			'Los colores con una x ya están en uso, aunque puedes volver a usarlos'
		],
		toast: 'Asignatura(s) eliminada(s)'
	},
	scheduleForm: {
		title: 'Horario',
		placeholders: [
			'asignatura...',
			'hasta'
		],
		toast: 'Horario(s) eliminado(s)'
	},
	timetableForm: {
		title: 'Horario',
		placeholders: [
			'Indica la fecha de inicio y fin del nuevo horario'
		],
		toast: 'Horario eliminado'
	},
	holidayForm: {
		title: 'Vacaciones',
		placeholders: [
			'nombre de las vacaciones...',
			'Indica la fecha de inicio y fin de las vacaciones' +
			'\nAmbos días están incluidos',
			'⚠ Todas las ausencias y exámenes de esos días serán eliminados!'
		],
		toast: 'Vacaciones eliminadas'
	},
	examForm: {
		title: 'Examen',
		placeholders: [
			'asignatura...',
			'Elige un día',
			'Elige las horas en las que tienes el examen',
			'⚠ Tienes vacaciones ese día!',
			'horas...',
			'Si el día elegido no tiene ninguna clase, no podrás seleccionarlas'
		],
		toast: 'Examen eliminado'
	},
	languages: [
		{name: 'Español', iso: 'es'},
		{name: 'Inglés', iso: 'en'}
	]
}
