export const newProfile = {
	title: 'Asistente de Perfiles',
	screens: [
		{
			subtitle: 'Bienvenido al Asistente de Perfiles',
			description: [
				'Desde aquí podrás crear un nuevo perfil y añadir todas las clases que necesites.' +
				'\n\nGracias a estos perfiles podrás tener diferentes cursos en la aplicación y manejarlos de manera independiente.' +
				'\n\nPodrás llevar la cuenta de las faltas de asistencia que has tenido para que no te lleves ninguna sorpresa luego!' +
				'\n\n\nPara empezar pulsa el botón de abajo'
			],
			prevButton: 'Salir',
			nextButton: 'Comenzar'
		},
		{
			subtitle: 'Crea tu perfil',
			description: [
				'Indica el nombre del perfil que vas a crear.\nLo podrás cambiar más tarde',
				'Estas fechas las puedes cambiar cuando quieras mediante el sistema de horarios que encontrarás en la pantalla de perfil',
				'Cuando hayas acabado pulsa el botón de abajo'
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
					'\n\nNo te preocupes si no indicas las fechas correctas ahora, podrás modificarlas después.',
					'Si necesitas ver este mensaje de nuevo, pulsa en el botón de ayuda'
				]
			}
		},
		{
			subtitle: 'Añade profesores',
			description: [
				'Puedes añadir tantos profesores como quieras pulsando sobre el botón +' +
				'\n\nTambién puedes editarlos y borrarlos si los mantienes pulsados',
				'Cuando hayas acabado pulsa el botón de abajo'
			],
			helpDialog: {
				placeholders: [
					'Una vez tenemos el perfil creado, vamos a añadir algunos profesores.' +
					'\n\nNo te preocupes si se te olvida alguno, podrás crear más mas adelante',
					'Si necesitas ver este mensaje de nuevo, pulsa en el botón de ayuda'
				]
			}
		}
	]
}
export const calendar = {
	title: 'Calendario',
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
	title: 'Estadísticas'
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
			editInfoDialog: {
				title: 'Editar información',
				placeholders: ['nombre del perfil...'],
				actions: ['Cancelar', 'Save']
			}
		},
		{
			title: 'Asignaturas',
			emptyList: 'No tienes ninguna asignatura añadida!\n\nAñade algunas asignaturas pulsando sobre el botón +',
			emptyTeacher: 'Profesor no asignado',
			confirmDialog: {
				title: 'Estás seguro?',
				description: 'Todas las faltas de asistencia de la(s) asignatura(s) serán eliminadas también',
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
		description: 'Todas las faltas de asistencia asociadas a esta hora serán eliminadas\nSi estás creando un nuevo horario, no te preocupes por eliminarla',
		actions: ['Cancelar', 'Eliminar']
	}
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
		title: 'Selecciona una fecha',
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
			'Ese rango de horas ya está cogido por otra clase'
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
		]
	},
	scheduleForm: {
		title: 'Horario',
		placeholders: [
			'asignatura...',
			'hasta'
		]
	},
	timetableForm: {
		title: 'Horario',
		placeholders: [
			'Indica la fecha de inicio y fin del nuevo horario'
		]
	},
	holidayForm: {
		title: 'Vacaciones',
		placeholders: [
			'nombre de las vacaciones...',
			'Indica la fecha de inicio y fin de las vacaciones',
			'Ambos días están incluidos'
		]
	},
	languages: [
		{name: 'Español', iso: 'es'},
		{name: 'Inglés', iso: 'en'}
	]
}
