### TIMETABLE FORM

Este componente permite crear y editar vacaciones dentro de la aplicación.
<br>
El formulario actualiza automáticamente la base de datos, por lo que no hay que añadir ninguna funcionalidad extra para realizar estas funciones.

Si algún campo del formulario no está relleno, saldrá un error cuando se intente confirmar el diálogo.

&#9888; **IMPORTANTE**
<br>
Si se quiere modificar la propiedad `holiday` de este componente en tiempo de ejecución, será necesario desmontar el componente y volver a montarlo.
<br>
Así sería una posible implementación
```jsx
<Button label={'Mostrar formulario'} onClick={() => this.setState({visible: true})}/>

{this.state.visible && 
<HolidayForm onCancel={() => console.log('cancelado')}
			 onDelete={() => console.log('eliminado')}
			 onSubmit={(key) => {
				console.log(key);
				this.setState({visible: false});
			 }
/>}
```

**Propiedades**
-

**`onSubmit, onCancel, onDelete ( required )`**

- **onSubmit**<br>
Función llamada cuando el usuario acepta el diálogo.
<br>
Recibe un parámetro `key : String` que representa el id del horario creado/actualizado.

- **onCancel**<br>
Función llamada cuando el usuario cancela el diálogo.

- **onDelete**<br>
Función llamada cuando el usuario elimina las vacaciones.

<div style="page-break-after: always;"></div>

```jsx
<HolidayForm onCancel={() => console.log('cancelado')}
			 onDelete={() => console.log('eliminado')}
			 onSubmit={(key) => console.log(key)}/>
```
![comp_formHolidays](../assets/2_PROTOTYPE/comp_formHolidays/comp_formHolidays.png)

**`holiday ( optional )`**

Define el los datos iniciales que se van a cargar en el formulario.
<br>
Recibe un `object` compuesto de dos claves

- `key` : id del horario (required)
- `obj`
<br>
Recibe un `object` => `{name: String, startDate : String, endDate: String}`

  - `name` : el nombre de las vacaciones (required)
  - `startDate` : fecha de inicio del horario (required)
  - `endDate` :fecha de fin del horario (required)

<div style="page-break-after: always;"></div>

```jsx
<HolidayForm onCancel={() => console.log('cancelado')}
			 onDelete={() => console.log('eliminado')}
			 onSubmit={(key) => console.log(key)}
			 subject={{
				 key: 'holiday_key',
				 obj: {
					 name: 'Vacaciones',
					 startDate: '2020-05-27',
					 endDate: '2020-05-31'
				 }
			 }}/>
```
![comp_formHolidays_holidays](../assets/2_PROTOTYPE/comp_formHolidays/comp_formHolidays_holidays.png)

<div style="page-break-after: always;"></div>