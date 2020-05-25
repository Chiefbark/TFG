### EXAM FORM

Este componente permite crear y editar exámenes dentro de la aplicación.
<br>
El formulario actualiza automáticamente la base de datos, por lo que no hay que añadir ninguna funcionalidad extra para realizar estas funciones.

Si algún campo del formulario no está relleno, saldrá un error cuando se intente confirmar el diálogo.

&#9888; **IMPORTANTE**
<br>
Si se quiere modificar la propiedad `exam` de este componente en tiempo de ejecución, será necesario desmontar el componente y volver a montarlo.
<br>
Así sería una posible implementación
```jsx
<Button label={'Mostrar formulario'} onClick={() => this.setState({visible: true})}/>

{this.state.visible && 
<ExamForm onCancel={() => console.log('cancelado')}
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
Recibe un parámetro `key : String` que representa el id del examen creado/actualizado.

- **onCancel**<br>
Función llamada cuando el usuario cancela el diálogo.

- **onDelete**<br>
Función llamada cuando el usuario elimina el exámen.

<div style="page-break-after: always;"></div>

```jsx
<ExamForm onCancel={() => console.log('cancelado')}
		  onDelete={() => console.log('eliminado')}
		  onSubmit={(key) => console.log(key)}/>
```
![comp_formExam](../assets/2_PROTOTYPE/comp_formExam/comp_formExam.png)

**`exam ( optional )`**

Define el los datos iniciales que se van a cargar en el formulario.
<br>
Recibe un `object` compuesto de dos claves

- `key` : id del horario (required)
- `obj`
<br>
Recibe un `object` => `{name: String, startDate : String, endDate: String}`

  - `date` : fecha del examen (required)
  - `id_subject` : asignatura del examen (required)
  - `schedules` : horarios que ocupa el examen (required)

<div style="page-break-after: always;"></div>

```jsx
<ExamForm onCancel={() => console.log('cancelado')}
		  onDelete={() => console.log('eliminado')}
		  onSubmit={(key) => console.log(key)}
		  subject={{
			  key: 'exam_key',
			  obj: {
				  date: '2020-05-19',
				  id_subject: 'subject_key',
				  schedules: '[...schedule_key]'
			  }
		  }}/>
```
![comp_formExam_Exam](../assets/2_PROTOTYPE/comp_formExam/comp_formExam_Exam.png)

<div style="page-break-after: always;"></div>