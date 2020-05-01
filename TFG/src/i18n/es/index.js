export const calendar = {
	title: 'Calendario',
	helpText: 'Pulsa en un día del calendario para ver más detalles!'
}
export const statistics = {
	title: 'Estadísticas'
}
export const absences = {
	title: 'Ausencias'
}
export const profile = {
	title: 'Perfil',
	screens: [{title: 'Información'}, {title: 'Asignaturas'}, {title: 'Profesores'}]
}
export const settings = {
	title: 'Ajustes',
	headers: ['Perfil', 'Idioma', 'Notificaciones', 'Información del calendario'],
	items: ['Exámen próximo', 'Límite de faltas', 'Mostrar faltas', 'Mostrar vacaciones', 'Mostrar exámenes'],
	actions: ['cambiar...', 'cambiar...']
}

export const commons = {
	calendarLocales: {
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
	},
	helpDialog: {
		title: '¿Necesitas ayuda?',
		actions: ['Aceptar']
	},
	calendarPickerDialog: {
		title: 'Selecciona una fecha',
		actions: ['Cancelar', 'Aplicar']
	},
	languageDialog: {
		title: 'Selecciona un idioma',
		actions: ['Aceptar']
	},
	teacherForm: {
		title: 'Profesor',
		placeholders: ['nombre del profesor...'],
		actions: ['Cancelar', 'Guardar']
	},
	languages: [
		{name: 'Español', iso: 'es'},
		{name: 'Inglés', iso: 'en'}
	]
}
