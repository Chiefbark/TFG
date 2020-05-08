### BUTTON

Este componente permite al usuario interactuar con un elemento en la pantalla.

```jsx
<Button label={'Aceptar'}
		backgroundColor={'#FF0000'}
		textColor={'#FFFFFF'}
		onClick={() => alert('botón pulsado')}
		onLongClick={() => alert('botón mantenido')}
		style={{paddingHorizontal: 50}}/>
```
![comp_button_example](../assets/2_PROTOTYPE/comp_button/comp_button_example.png)

**Propiedades**
-

**`label ( required )`**

Define el texto que va a tener el botón.
<br>
Recibe un `string`
```jsx
<Button label={'Aceptar'}/>
```
![comp_button](../assets/2_PROTOTYPE/comp_button/comp_button.png)

**`backgroundColor ( optional )`**

Define el color de fondo que va a tener el botón.
<br>
Recibe un color
```jsx
<Button label={'Aceptar'} backgroundColor={'#FF0000'}/>
```
![comp_button_backgroundColor](../assets/2_PROTOTYPE/comp_button/comp_button_backgroundColor.png)

<div style="page-break-after: always;"></div>

**`textColor ( optional )`**

Define el color del texto que va a tener el botón.
<br>
Recibe un `string`
```jsx
<Button label={'Aceptar'} textColor={'#FF0000'}/>
```
![comp_button_textColor](../assets/2_PROTOTYPE/comp_button/comp_button_textColor.png)

**`disabled ( optional )`**

Indica si el butón está deshabilitado o no.
<br>
Recibe un `bool`. Por defecto es valor es `false`

**`onClick ( optional )`**

Función llamada cuando el usuario pulsa el botón.
```jsx
<Button label={'Aceptar'} onClick={() => alert('botón pulsado')}/>
```

**`onLongClick ( optional )`**

Función llamada cuando el usuario mantiene pulsado el botón.
```jsx
<Button label={'Aceptar'} onLongClick={() => alert('botón mantenido')}/>
```

**`style ( optional )`**

Añade estilos directamente al componente.
<br>
Recibe un `View.style`
- No se pueden aplicar estilos al texto
- La propiedad `backgroundColor` tiene prioridad

<div style="page-break-after: always;"></div>