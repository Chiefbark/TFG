# ANALISIS Y PROTOTIPO 2

| Documento 	|   |
|-----------	|-  |
| Fecha     	| 27/04/2020  |
| Versión   	| 0.0.2 |
| Autor     	| Jorge Chércoles Moreno  |

<br>

**Changelog**

*V 0.0.2 - 26-05-2020*
1. Añadida explicación de componente
2. Añadidos nuevos componentes
3. Añadidos nuevos formularios

<br>

| Proyecto      |  |
|-------------	|- |
| Título        | Aplicación de control de asistencias  |
| Descripción   | Aplicación de control de personal de las ausencias a tus diferentes cursos  |

**Recursos**

Pulsa en las imagenes para acceder a mis zonas de trabajo

<span style="margin: 0 20px;">[![github](./assets/commons/github.png)](https://github.com/Chiefbark/TFG)</span>
<span style="margin: 0 20px;">[![figma](./assets/commons/figma.png)](https://www.figma.com/file/QYLYZSbAeCGLE2cEa1kam3/designs)</span>
<span style="margin: 0 20px;">[![trello](./assets/commons/trello.png)](https://trello.com/b/umjDqcx3/tfg)</span>

<br>

<div style="page-break-after: always;"></div>

**Tabla de contenidos**
- [ANALISIS Y PROTOTIPO 2](#analisis-y-prototipo-2)
	- [INTRODUCCION](#introduccion)
		- [Imports](#imports)
		- [Constructor](#constructor)
		- [Funciones](#funciones)
		- [Estilos](#estilos)
	- [COMPONENTES](#componentes)
		- [BUTTON](#button)
		- [ICON](#icon)
		- [SWITCH](#switch)
		- [LIST HEADER](#list-header)
		- [LIST ITEM](#list-item)
		- [COLOR PICKER](#color-picker)
		- [DIALOG](#dialog)
		- [PICKER](#picker)
		- [STEP PICKER](#step-picker)
		- [TIME PICKER](#time-picker)
		- [REACT NATIVE CALENDARS](#react-native-calendars)
		- [CALENDAR DAY](#calendar-day)
		- [CALENDAR PICKER](#calendar-picker)
	- [FORMULARIOS](#formularios)
		- [TEACHER FORM](#teacher-form)
		- [SUBJECT FORM](#subject-form)
		- [SCHEDULE FORM](#schedule-form)
		- [TIMETABLE FORM](#timetable-form)
		- [HOLIDAYS FORM](#holidays-form)
		- [EXAM FORM](#exam-form)
	- [SISTEMAS IMPLEMENTADOS](#sistemas-implementados)
		- [I18N](#i18n)
		- [CONFIG](#config)
	- [CONTRIBUIDORES](#contribuidores)

<div style="page-break-after: always;"></div>

## INTRODUCCION

En este documento se van a explicar todos los componentes creados para la aplicación, así como los sistemas más importantes y su funcionamiento.

El lenguaje utilizado es `Javascript`, con el superconjunto de `ECMAScript 6`.
<br>
`ECMAScript 6` o `ES6` es un super conjunto de javascript que añade funcionalidade extra al lenguaje, como por ejemplo:
- `let` : variables de ámbito
- `const` : constantes
- `Arrow functions` : funciones anónimas
- `Classes` : orientación a componentes

[Aquí](https://ecma-international.org/ecma-262/10.0/index.html) puedes encontrar toda la información referente a ES6.

Para desarrollar el proyecto se utiliza `Expo`, un framework creado a partir de `React Native` que permite crear aplicaciones tanto para IOs como Android utilizando exclusivamente javascript. La documentación de este framework se encuentra [aquí](https://docs.expo.io/).


Esta imagen representa la estructura básica de un componente de React Native.

![component_template](./assets/2_PROTOTYPE/component_template.png)

Es importante saber que para utilizar alguna función o componente en otro archivo, será necesario exportarlo, ya sea con `export default`si sólo es uno o `export` si quieres exportar muchos elementos.

<div style="page-break-after: always;"></div>

Podemos encontrar diferentes secciones en él:

### Imports

Aquí se importan todos los archivos necesarios para que el componente funcione.
<br>
`import React from 'react'` es obligatorio siempre que se quiera crear un componente en el archivo.
<br>
Podemos ver más imports dentro de un archivo. El más común es `import {...} from 'react-native'`.
<br>
Con este import podemos seleccionar los componentes nativos que vamos a utilizar en el archivo. [Aquí](https://reactnative.dev/docs/components-and-apis.html) puedes encontrar la documentación de todos los componentes disponibles.

También se pueden añadir imports a librerías externas que hayan sido incluidas en el archivo `package.json`, o importar archivos `.js` que contengan cierta lógica, funciones, variables, o todo junto.

### Constructor

Cuando se "monta" el componente, la primera función en ejecutarse es el constructor.
<br>
Aquí se crean las variables mínimas para el correcto funcionamiento del componente. La mas importante es `this.state`.
<br>
Esta función recibe un parámetro `props`. Este parámetro representa todos los atributos que tiene el componente cuando es creado.
```jsx
<Component key={...} onPress={...} onLongPress={...} style={...}/>
```
`key, onPress, onLongPress, style` son ejemplos de atributos del componente. Cada componente puede tener distintos atributos e incluso si fuera necesario, puedes crear los que tu consideres. Podrás verlo en la documentación de cada componente.

<div style="page-break-after: always;"></div>

### Funciones

Un componente puede tener tantas funciones como quieras, pero hay algunas funciones que son heredadas de `React.Component`. Las más importantes son:

- **`ShouldComponentUpdate`**
<br>
Esta función determina si, habiendo un cambio en las `props` o en el `state`, es necesario renderizar el componente. Se ejecuta antes de llamar a la función `render` y devuelve `true` si se tiene que volver a renderizar o `false` si no. No es necesario implementar esta función pero permite prevenir renders innecesarios del componente.
<br>
Recibe tres parámetros:
  - `nextProps` : las siguientes propiedades que va a recibir el componente (`props`)
  - `nextState` : el siguiente estado del componente (`state`)
  - `nextContext` : el siguiente contexto del componente

  Cada componente requerirá una lógica diferente en esta función, ajustandose a los requerimientos.
- **`ComponentDidMount`**
<br>
Esta función es llamada justo después del primer `render`. Es ideal para operar con el componente o añadir listeners.
- **`ComponentWillUnmount`**
<br>
Esta función es llamada justo antes de que el componente se "desmonte". Elimina todos los listeners que tengas en esta función, para evitar warnings.
- **`Render`**
<br>
Esta función se encarga de devolver un elemento para mostrar en la pantalla del dispositivo. Puedes añadir cierta lógica gracias a la sintaxis de `{variable}` y utilizar todos los componentes que quieras, ya sean nativos o externos. También puedes añadirle estilos.

<div style="page-break-after: always;"></div>

### Estilos

Por lo general, los estilos del componente se añaden al final del archivo y fuera del ámbito del componente, aunque también podrían estar en un archivo externo y se podría importar utilizando `import styles from './path/to/styles'`.

Para crear una hoja de estilos es necesario importar el módulo ``StyleSheet` de `react-native`.
<br>
Su sintaxis es un objeto tipo `JSON`, donde la clave es el nombre del estilo y el contenido son los propios estilos.

El abanico de propiedades que se pueden usar es muy extenso y bastante similar a las propiedades `css`, salvo que la sintaxis utiliza un sistema *camelCase* en vez de separarla con *-*. Por ejemplo:
<br>
En vez de `font-size`, se utiliza `fontSize`.
<br>
También hay que destacar que React Native no utiliza pixeles si no su propia unidad, aunque siempre podrás utilizar porcentajes.

React Native utiliza `flex` para organizar los componentes en la pantalla, por lo que es importante conocerlo bastante bien. React native facilita un ejemplo [aquí](https://reactnative.dev/docs/style).

<div style="page-break-after: always;"></div>

## COMPONENTES

Los componentes utilizados, tanto propios como externos, para el desarrollo de la aplicación se van a exponer aquí. Los componentes externos tendrán el símbolo &#9432; indicando que son dependencias y pondrán los links para ver su documentación.

<div style="page-break-after: always;"></div>

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
![comp_button_example](./assets/2_PROTOTYPE/comp_button/comp_button_example.png)

**Propiedades**
-

**`label ( required )`**

Define el texto que va a tener el botón.
<br>
Recibe un `string`
```jsx
<Button label={'Aceptar'}/>
```
![comp_button](./assets/2_PROTOTYPE/comp_button/comp_button.png)

**`backgroundColor ( optional )`**

Define el color de fondo que va a tener el botón.
<br>
Recibe un color
```jsx
<Button label={'Aceptar'} backgroundColor={'#FF0000'}/>
```
![comp_button_backgroundColor](./assets/2_PROTOTYPE/comp_button/comp_button_backgroundColor.png)

<div style="page-break-after: always;"></div>

**`textColor ( optional )`**

Define el color del texto que va a tener el botón.
<br>
Recibe un `string`
```jsx
<Button label={'Aceptar'} textColor={'#FF0000'}/>
```
![comp_button_textColor](./assets/2_PROTOTYPE/comp_button/comp_button_textColor.png)

**`disabled ( optional )`**

Indica si el botón está deshabilitado o no.
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

### ICON

Este componente permite al usuario interactuar con un icono en la pantalla.

```jsx
<Icon source={require('./assets/icons/icon_add.png')}
	  size={'large'}
	  iconColor={'#FFFFFF'}
	  style={{backgroundColor: '#FF0000'}}
	  onClick={() => alert('icono pulsado')}
	  onLongClick={() => alert('icono mantenido')}/>
```
![comp_icon_example](./assets/2_PROTOTYPE/comp_icon/comp_icon_example.png)

**Propiedades**
-

**`source ( required )`**

Define el texto que va a tener el botón.
<br>
Recibe un `ImageSourcePropType`
```jsx
<Icon source={require('./assets/icons/icon_add.png')}/>
```
![comp_icon](./assets/2_PROTOTYPE/comp_icon/comp_icon.png)

**`iconColor ( optional )`**

Define el color de la imagen que va a tener el icono.
<br>
Recibe un `string`
```jsx
<Icon source={require('./assets/icons/icon_add.png')} iconColor={'#FF0000'}/>
```
![comp_icon_iconColor](./assets/2_PROTOTYPE/comp_icon/comp_icon_iconColor.png)

<div style="page-break-after: always;"></div>

**`size ( optional )`**

Define el tamaño que va a tener el icono.
<br>
Recibe un `string ['small', 'normal', 'large']`. Por defecto es valor es `normal`
```ts
<Button source={require('./assets/icons/icon_add.png')} size={'small'}/>
<Button source={require('./assets/icons/icon_add.png')} size={'large'}/>
```
![comp_icon_sizeSmall](./assets/2_PROTOTYPE/comp_icon/comp_icon_sizeSmall.png)
![comp_icon_sizeLarge](./assets/2_PROTOTYPE/comp_icon/comp_icon_sizeLarge.png)

**`floating ( optional )`**

Indica si el icono es flotante o no. El botón se colocará automáticamente en la esquina inferior izquierda y tendrá los bordes redondeados.
<br>
Lo ideal es combinar esta propiedad junto con la propiedad `style`, añadiendo un color de fondo.
<br>
Recibe un `bool`. Por defecto es valor es `false`
```jsx
<Icon source={require('./assets/icons/icon_add.png')}
	  floating={true}
	  style={{backgroundColor: '#FF0000'}}/>
```
![comp_icon_floating](./assets/2_PROTOTYPE/comp_icon/comp_icon_floating.png)

**`visible ( optional )`**

Indica si el icono es visible o no.
<br>
Recibe un `bool`. Por defecto es valor es `true`

**`disabled ( optional )`**

Indica si el icono está deshabilitado o no.
<br>
Recibe un `bool`. Por defecto es valor es `false`

**`onClick ( optional )`**

Función llamada cuando el usuario pulsa el icono.
```jsx
<Icon source={require('./assets/icons/icon_add.png')}
	  onClick={() => alert('icono pulsado')}/>
```

<div style="page-break-after: always;"></div>

**`onLongClick ( optional )`**

Función llamada cuando el usuario mantiene pulsado el icono.
```jsx
<Icon source={require('./assets/icons/icon_add.png')}
	  onLongClick={() => alert('icono mantenido')}/>
```

**`style ( optional )`**

Añade estilos directamente al componente.
<br>
Recibe un `View.style`
- No se pueden aplicar estilos al icono
- Sobreescribir el `padding` del componente puede dar resultados inesperados si el icono es flotante. Utiliza `width` y `height` en su lugar

<div style="page-break-after: always;"></div>

### SWITCH

Este componente permite al usuario cambiar el estado de un botón.

```jsx
<Switch/>
```
![comp_switch_example](./assets/2_PROTOTYPE/comp_switch/comp_switch_example.png)
![comp_switch_example](./assets/2_PROTOTYPE/comp_switch/comp_switch_active.png)

**Propiedades**
-

**`initialValue ( optional )`**

Define el texto que va a tener el botón.
<br>
Recibe un `bool`. Por defecto es valor es `false`
```jsx
<Switch initialValue={true}/>
```
![comp_switch_active](./assets/2_PROTOTYPE/comp_switch/comp_switch_active.png)

**`onChange ( optional )`**

Función llamada cuando el estado del botón cambia.
<br>
Recibe un parámetro `value : Bool` que indica el nuevo valor del componente
```jsx
<Icon onChange={(value) => alert('valor: '+ value)}/>
```

**`style ( optional )`**

Añade estilos directamente al componente.
<br>
Recibe un `View.style`
- No se puede cambiar el color del track del componente
- No se puede cambiar el color del círculo del componente

<div style="page-break-after: always;"></div>

### LIST HEADER

Este componente permite añadir elementos para mostrar diferente información y aplicar acciones al componente.

```jsx
<ListHeader label={'label'}
			textColor={'#000000'}
			rightItem={() => <Text style={{marginRight: 16}}>derecha</Text>}
			style={{backgroundColor: '#FF0000'}}/>
```
![comp_listHeader_example](./assets/2_PROTOTYPE/comp_listHeader/comp_listItem_example.png)

**Propiedades**
-

**`label ( required )`**

Define el título que va a tener el componente.
<br>
Recibe un `string`
```jsx
<ListHeader label={'label'}/>
```
![comp_listHeader](./assets/2_PROTOTYPE/comp_listHeader/comp_listItem.png)

**`textColor ( optional )`**

Define los estilos que va a tener el título del componente.
<br>
Recibe un `string`
```jsx
<ListHeader label={'label'} textColor={'#000000'}/>
```
![comp_listHeader_textColor](./assets/2_PROTOTYPE/comp_listHeader/comp_listItem_textColor.png)

<div style="page-break-after: always;"></div>

**`rightItem ( optional )`**

Renderiza un componente a la derecha del componente.
<br>
Recibe una `function` que devuelve un `component`
```jsx
<ListHeader label={'label'}
			rightItem={() => <Text style={{marginRight: 16}}>derecha</Text>}/>
```
![comp_listHeader_rightItem](./assets/2_PROTOTYPE/comp_listHeader/comp_listItem_rightItem.png)

**`style ( optional )`**

Añade estilos directamente al componente.
<br>
Recibe un `View.style`
- No se pueden cambiar los estilos del label
- No se pueden cambiar los estilos del elemento `rightItem`

<div style="page-break-after: always;"></div>

### LIST ITEM

Este componente permite añadir elementos para mostrar diferente información y aplicar acciones al componente.

```jsx
<ListItem title={'título'} 
		  subtitle={'subtítulo'}
		  rightItem={() => <Text style={{marginRight: 16}}>derecha</Text>}
		  onClick={() => alert('elemento pulsado')}
		  onLongClick={() => alert('elemento mantenido')}
		  style={{backgroundColor: #FF6666'}}/>
```
![comp_itemList_example](./assets/2_PROTOTYPE/comp_listItem/comp_listItem_example.png)

**Propiedades**
-

**`title ( required )`**

Define el título que va a tener el componente.
<br>
Recibe un `string`
```jsx
<ListItem title={'título'}/>
```
![comp_listItem](./assets/2_PROTOTYPE/comp_listItem/comp_listItem.png)

**`titleStyles ( optional )`**

Define los estilos que va a tener el título del componente.
<br>
Recibe un `View.style`
```jsx
<ListItem title={'título'} titleStyles={{color: '#FF0000'}}/>
```
![comp_listItem_titleStyles](./assets/2_PROTOTYPE/comp_listItem/comp_listItem_titleStyles.png)

<div style="page-break-after: always;"></div>

**`containerStyle ( optional )`**

Define los estilos del contenedor del título y los subtítulos.
<br>
Recibe un `View.style`
```jsx
<ListItem title={'título'} containerStyle={{paddingHorizontal: 0}}/>
```
![comp_listItem_containerStyle](./assets/2_PROTOTYPE/comp_listItem/comp_listItem_containerStyle.png)

**`subtitle ( optional )`**

Define el subtítulo que va a tener el componente. Puede ser una pequeña descripción.
<br>
Recibe un `string`
```jsx
<ListItem title={'título'} subtitle={'subtítulo'}/>
```
![comp_listItem_subtitle](./assets/2_PROTOTYPE/comp_listItem/comp_listItem_subtitle.png)

**`rightItem ( optional )`**

Renderiza un componente a la derecha del componente.
<br>
Recibe una `function` que devuelve un `component`
```jsx
<ListItem title={'título'}
		  rightItem={() => <Text style={{marginRight: 16}}>derecha</Text>}/>
```
![comp_listItem_rightItem_](./assets/2_PROTOTYPE/comp_listItem/comp_listItem_rightItem.png)

**`feedback ( optional )`**

Especifica si el componente muestra un feedkback o no cuando se pulsa. El feedback es un efecto de opacidad.
<br>
Recibe un `bool`. Por defecto el valor es `true`

**`onClick ( optional )`**

Función llamada cuando el usuario pulsa el componente.
```jsx
<ListItem title={'título'} onClick={() => alert('elemento pulsado')}/>
```

**`onLongClick ( optional )`**

Función llamada cuando el usuario mantiene pulsado el componente.
```jsx
<ListItem title={'título'} onLongClick={() => alert('elemento mantenido')}/>
```

<div style="page-break-after: always;"></div>

**`style ( optional )`**

Añade estilos directamente al componente.
<br>
Recibe un `View.style`
- No se pueden cambiar los estilos del subtítulo
- No se pueden cambiar los estilos del elemento `rightItem`

<div style="page-break-after: always;"></div>

### COLOR PICKER

Este componente permite al usuario elegir un color de entre muchos.

```jsx
<ColorPicker data={['#FF0000', '#00FF00', '#0000FF']}
			 marked={['#FF0000', '#0000FF']}
			 initialValue={'#00FF00'}
			 onValueChange={(value) => alert('valor: ' + value)}
			 style={{backgroundColor: 'lightgrey', paddingHorizontal: 10}}/>
```
![comp_colorPicker_example](./assets/2_PROTOTYPE/comp_colorPicker/comp_colorPicker_example.png)

**Propiedades**
-

**`data ( required )`**

Define los elementos que se van a mostrar en el selector.
<br>
Recibe un `array` de `string`
```jsx
<ColorPicker data={['#FF0000', '#00FF00', '#0000FF']}/>
```
![comp_colorPicker_data](./assets/2_PROTOTYPE/comp_colorPicker/comp_colorPicker_data.png)
![comp_colorPicker_data_selected](./assets/2_PROTOTYPE/comp_colorPicker/comp_colorPicker_data_selected.png)

**`marked ( optional )`**

Define qué colores se tienen que marcar.
<br>
Recibe un `array` de `string`
```jsx
<ColorPicker data={['#FF0000', '#00FF00', '#0000FF']}
			 marked={['#FF0000', '#0000FF']}/>
```
![comp_colorPicker_data](./assets/2_PROTOTYPE/comp_colorPicker/comp_colorPicker_data_marked.png)

<div style="page-break-after: always;"></div>

**`initialValue ( optional )`**

Define el color seleccionado por defecto cuando se monta el componente.
<br>
Recibe un `string`
```jsx
<ColorPicker data={['#FF0000', '#00FF00', '#0000FF']}
			 initialValue={'#00FF00'}/>
```
![comp_colorPicker_data_selected](./assets/2_PROTOTYPE/comp_colorPicker/comp_colorPicker_data_selected.png)

**`onValueChange ( optional )`**

Función llamada cuando el color seleccionado cambia.
<br>
Recibe un parámetro `value : String` que indica el nuevo valor del componente
```jsx
<ColorPicker data={['#FF0000', '#00FF00', '#0000FF']}
			 onValueChange={(value) => alert('valor: ' + value)}/>
```

**`style ( optional )`**

Añade estilos directamente al componente.
<br>
Recibe un `View.style`
- No se pueden aplicar estilos a los puntos del selector
- No se puede cambiar los estilos del elemento seleccionado
- El contenedor es un `ScrollView` horizontal por lo que estilos como `flexWrap` y similares no funcionarán

<div style="page-break-after: always;"></div>

### DIALOG

Este componente permite mostrar diálogos modales personalizables.
<br>
Si el contenido del diálogo es muy grande, añadirá un scroll automaticamente para poder visualizar todo.

```jsx
this.state = {visible: true};

<Dialog title={'Diálogo'} visible={this.state.visible}
		buttons={() => 
		<Fragment>
			<Button label={'Cancelar'} 
					onClick={() => this.setState({visible: false})}/>
			<Button label={'Aceptar'} 
					backgroundColor={'#FF0000'}
					textColor={'#FFFFFF'}
					onClick={() => this.setState({visible: false})}/>
		</Fragment>
		}
		content={() => <Text>Contenido</Text>}/>
```
![comp_dialog_example](./assets/2_PROTOTYPE/comp_dialog/comp_dialog_example.png)

**Propiedades**
-

**`title, buttons ( required )`**

- **Title**<br>
Define el título que va a tener el diálogo.
<br>
Recibe un `string`

- **Buttons**<br>
Renderiza un componente que hace la función de acciones del diálogo. Lo ideal es devolver un `Fragment` con los botones dentro. Por comodidad, estamos utilizando el componente [Button](button.md).
<br>
Recibe una `function` que devuelve un `component`

<div style="page-break-after: always;"></div>

```jsx
<Dialog title={'Diálogo'} visible={true}
		buttons={() => 
		<Button label={'Aceptar'} backgroundColor={'#FF0000'} textColor={'#FFFFFF'}/>
		}/>
```
![comp_dialog](./assets/2_PROTOTYPE/comp_dialog/comp_dialog.png)

**`content ( optional )`**

Renderiza un componente que hace la función de contenido del diálogo. Lo ideal es devolver un `Fragment` con el contenido dentro.
<br>
Recibe una `function` que devuelve un `component`
```jsx
<Dialog title={'Diálogo'} visible={true}
		buttons={() => <Button label={'Aceptar'} backgroundColor={'#FF0000'} textColor={'#FFFFFF'}/>}
		content={() => <Text>Contenido</Text>}/>
```
![comp_dialog_content](./assets/2_PROTOTYPE/comp_dialog/comp_dialog_content.png)

**`visible ( optional )`**

Especifica si el componente es visible o no.
<br>
Recibe un `bool`. Por defecto el valor es `false`

**`loading ( optional )`**

Indica si el diálogo está cargando o no.
<br>
Recibe un `bool`. Por defecto el valor es `false`

<div style="page-break-after: always;"></div>

**`onClickExit ( optional )`**

Función llamada cuando el usuario pulsa fuera del diálogo.
```jsx
<Dialog title={'Diálogo'} visible={true}
		buttons={() => <Button label={'Aceptar'} backgroundColor={'#FF0000'} textColor={'#FFFFFF'}/>}
		content={() => <Text>Contenido</Text>}
		onClickExit={() => alert('Diálogo pulsado')}/>
```


<div style="page-break-after: always;"></div>

### PICKER

Este componente permite al usuario seleccionar uno o más elementos de entre varios.

&#9888; **IMPORTANTE**
<br>
Si se quiere modificar la propiedad `initialValue` de este componente en tiempo de ejecución, será necesario desmontar el componente y volver a montarlo.
<br>
Así sería una posible implementación
```jsx
<Button label={'Mostrar diálogo'} onClick={() => this.setState({visible: true})}/>

{this.state.visible && 
<Picker initialValue={'2'} placeholder={'Selecciona un elemento...'}
		data={[
			{label: 'elemento 1', value: '1', color: 'red'},
			{label: 'elemento 2', value: '2'},
			{label: 'elemento 3', value: '3', disabled: true}
		]}
		onValueChange={(value) => alert('valor: ' + value)}/>
}
```
![comp_picker_example](./assets/2_PROTOTYPE/comp_picker/comp_picker_example.png)
![comp_picker_example_open](./assets/2_PROTOTYPE/comp_picker/comp_picker_example_open.png)

**Propiedades**
-

**`data ( required )`**

Define los elementos que se van a mostrar en el componente.
<br>
Recibe un `array` de `object` => `{ label: String, value: String, color : String }`

- `label` : texto que se va a mostrar (required)
- `value` : valor que tiene el elemento (required)
- `color` : indica el color de texto del `label` (optional)
- `disabled` : indica si el elemento es clickable o no (optional)

<div style="page-break-after: always;"></div>

```jsx
<Picker data={[
			{label: 'elemento 1', value: '1', color: 'red'},
			{label: 'elemento 2', value: '2'},
			{label: 'elemento 3', value: '3', disabled: true}
		]}/>
```
![comp_picker_data](./assets/2_PROTOTYPE/comp_picker/comp_picker_data.png)
![comp_picker_data_open](./assets/2_PROTOTYPE/comp_picker/comp_picker_data_open.png)

**`initialValue ( optional )`**

Define el elemento seleccionado por defecto cuando se monta el componente. Selecciona el elemento cuyo `value` corresponda con esta propiedad.
<br>
Recibe un `string`
```jsx
<Picker data={[
			{label: 'elemento 1', value: '1', color: 'red'},
			{label: 'elemento 2', value: '2'},
			{label: 'elemento 3', value: '3', disabled: true}
		]}
		initialValue={'2'}/>
```
![comp_picker_initialValue](./assets/2_PROTOTYPE/comp_picker/comp_picker_initialValue.png)

&#9888; Si `multiple = true`, entonces la propiedad recibe  un `Array[string]`
```jsx
<Picker data={[
			{label: 'elemento 1', value: '1', color: 'red'},
			{label: 'elemento 2', value: '2'},
			{label: 'elemento 3', value: '3', disabled: true}
		]}
		multiple={true}
		initialValue={['1','2']}/>
```
![comp_picker_initialValue_multiple](./assets/2_PROTOTYPE/comp_picker/comp_picker_initialValue_multiple.png)

**`placeholder ( optional )`**

Define el placeholder que tendrá el componente. También hace la función de título del diálogo.
<br>
Recibe un `string`
```jsx
<Picker data={[
			{label: 'elemento 1', value: '1', color: 'red'},
			{label: 'elemento 2', value: '2'},
			{label: 'elemento 3', value: '3', disabled: true}
		]}
		placeholder={'Selecciona un elemento...'}/>
```
![comp_picker_placeholder](./assets/2_PROTOTYPE/comp_picker/comp_picker_placeholder.png)
![comp_picker_placeholder](./assets/2_PROTOTYPE/comp_picker/comp_picker_placeholder_open.png)

**`error ( optional )`**

Especifica si el componente tiene que mostrar un error o no.
<br>
Recibe un `bool`. Por defecto es valor es `false`
```jsx
<Picker data={[
			{label: 'elemento 1', value: '1', color: 'red'},
			{label: 'elemento 2', value: '2'},
			{label: 'elemento 3', value: '3', disabled: true}
		]}
		error={true}/>
```
![comp_picker_error](./assets/2_PROTOTYPE/comp_picker/comp_picker_error.png)

<div style="page-break-after: always;"></div>

**`multiple ( optional )`**

Indica si el componente permite seleccionar varios elementos o no.
<br>
Recibe un `bool`. Por defecto el valor es `false`
```jsx
<Picker data={[
			{label: 'elemento 1', value: '1', color: 'red'},
			{label: 'elemento 2', value: '2'},
			{label: 'elemento 3', value: '3', disabled: true}
		]}
		multiple={true} initialValue={['1', '2']}/>
```
![comp_picker_multiple](./assets/2_PROTOTYPE/comp_picker/comp_picker_multiple.png)

**`textExit ( optional )`**

Indica el texto del botón cuando `multiple = true`.
<br>
Recibe un `string`
```jsx
<Picker data={[
			{label: 'elemento 1', value: '1', color: 'red'},
			{label: 'elemento 2', value: '2'},
			{label: 'elemento 3', value: '3', disabled: true}
		]}
		textExit={'Seleccionar'} multiple={true} initialValue={['1', '2']}/>
```
![comp_picker_textExit](./assets/2_PROTOTYPE/comp_picker/comp_picker_textExit.png)

<div style="page-break-after: always;"></div>

**`disabled ( optional )`**

Indica si el componente está deshabilitado o no.
<br>
Recibe un `bool`. Por defecto es valor es `false`

**`onValueChange ( optional )`**

Función llamada cuando el elemento seleccionado cambia.
<br>
Recibe un parámetro `value : String` que indica el nuevo valor del componente (propiedad `value` del objecto `data`)
```jsx
<Picker data={[
			{label: 'elemento 1', value: '1', color: 'red'},
			{label: 'elemento 2', value: '2'},
			{label: 'elemento 3', value: '3', disabled: true}
		]}
		onValueChange={(value) => alert('valor: ' + value)}/>
```

**`style ( optional )`**

Añade estilos directamente al componente.
<br>
Recibe un `View.style`
- No se pueden aplicar estilos a los elementos del componente
- No se pueden cambiar los estilos del error
- No se puede cambiar el diálogo de selección
- No se puede cambiar los estilos del botón de seleccionar cuando `multiple = true`

<div style="page-break-after: always;"></div>

### STEP PICKER	

Este componente permite al usuario interactuar con un elemento en la pantalla.

&#9888; **IMPORTANTE**
<br>
Si se quiere modificar la propiedad `initialValue` de este componente en tiempo de ejecución, será necesario desmontar el componente y volver a montarlo.
<br>
Así sería una posible implementación
```jsx
<Button label={'Mostrar diálogo'} onClick={() => this.setState({visible: true})}/>

{this.state.visible && 
<StepPicker data={[{label: '1'}, {label: '2'}, {label: '3'}]}
			initialValue={1}
			cyclic={true} onCycleChange={() => alert('Ciclo cambiado')}
			onValueChange={(value) => alert('valor: ' + value)}/>
}
```
![comp_stepPicker_example](./assets/2_PROTOTYPE/comp_stepPicker/comp_stepPicker_example.png)

**Propiedades**
-

**`data ( required )`**

Define el texto que va a tener el botón.
<br>
Recibe un `array` de `object` => `{ label: String }`

- `label` : texto que se muestra en el componente (required)
- Se pueden añadir tantas propiedades como se quiera

```jsx
<StepPicker data={[{label: '1'}, {label: '2'}, {label: '3'}]}/>
```
![comp_stepPicker_data](./assets/2_PROTOTYPE/comp_stepPicker/comp_stepPicker_data.png)

<div style="page-break-after: always;"></div>

**`initialValue ( optional )`**

Define el elemento seleccionado por defecto cuando se monta el componente. Selecciona el elemento cuyo índice corresponda con esta propiedad.
<br>
Recibe un `number`. Por defecto el valor es `0`
```jsx
<StepPicker data={[{label: '1'}, {label: '2'}, {label: '3'}]}
			initialValue={1}/>
```
![comp_stepPicker_initialValue](./assets/2_PROTOTYPE/comp_stepPicker/comp_stepPicker_example.png)

**`cyclic ( optional )`**

Indica si el componente permite un scroll infinito.
<br>
Recibe un `bool`. Por defecto es valor es `true`

**`onCycleChange ( optional )`**

Función llamada cuando el componente completa un ciclo. Sólo se aplica cuando `cyclic = true`.
```jsx
<StepPicker data={[{label: '1'}, {label: '2'}, {label: '3'}]}
			cyclic={true} onCycleChange={() => alert('Ciclo cambiado')}/>
```

**`onValueChange ( optional )`**

Función llamada cuando el valor ha cambiado.
<br>
Recibe un parámetro `value` que representa el valor seleccionado `data prop`
```jsx
<StepPicker data={[{label: '1'}, {label: '2'}, {label: '3'}]}
			onValueChange={(value) => alert('valor: ' + value)}/>
```

<div style="page-break-after: always;"></div>

### TIME PICKER

Este componente permite al usuario seleccionar una hora y minutos.

&#9888; **IMPORTANTE**
<br>
Si se quiere modificar las propiedades `initialHours` y `initialMinutes` de este componente en tiempo de ejecución, será necesario desmontar el componente y volver a montarlo.
<br>
Así sería una posible implementación
```jsx
<Button label={'Mostrar diálogo'} onClick={() => this.setState({visible: true})}/>

{this.state.visible && 
<TimePicker onCancel={() => console.log('cancelado')}
			onSubmit={(hours, minutes) => alert(`${hours}:${minutes}`)}
			initialHours={12} initialMinutes={30}/>
}
```
![comp_timePicker_example](./assets/2_PROTOTYPE/comp_timePicker/comp_timePicker_example.png)

**Propiedades**
-

**`onSubmit, onCancel ( required )`**

- **onSubmit**<br>
Función llamada cuando el usuario acepta el diálogo.
<br>
Recibe dos parámetros `hours : Number , minutes : Number/String` que representan la hora y minutos seleccionados.

- **onCancel**<br>
Función llamada cuando el usuario cancela el diálogo.

```jsx
<TimePicker onCancel={() => console.log('cancelado')}
			onSubmit={(hours, minutes) => console.log(hours, minutes)}
/>
```

<div style="page-break-after: always;"></div>

**`initialHours ( optional )`**

Indica la hora inicial seleccionada del componente.
<br>
Recibe un `number`. Los valores posibles son `[0-23]`. Por defecto el valor es `0`
```jsx
<TimePicker onCancel={() => console.log('cancelado')}
			onSubmit={(hours, minutes) => alert(hours, minutes)}
			initialHours={12}/>
```
![comp_timePicker_initialHours](./assets/2_PROTOTYPE/comp_timePicker/comp_timePicker_initialHours.png)

**`initialMinutes ( optional )`**

Indica los minutos iniciales seleccionados del componente.
<br>
Recibe un `number`. Los valores posibles son `[0, 15, 30, 45]`. Por defecto el valor es `0`
```jsx
<TimePicker onCancel={() => console.log('cancelado')}
			onSubmit={(hours, minutes) => alert(hours, minutes)}
			initialMinutes={30}/>
```
![comp_timePicker_initialMinutes](./assets/2_PROTOTYPE/comp_timePicker/comp_timePicker_initialMinutes.png)

<div style="page-break-after: always;"></div>

### REACT NATIVE CALENDARS

&#9432; *dependencia externa*

Componente de React-Native que permite incluir calendarios en la aplicación.
<br>
Toda la información acerca de cómo implementar este componente y sus propiedades está en [github](https://github.com/wix/react-native-calendars).

<div style="page-break-after: always;"></div>

### CALENDAR DAY

Con este componente se eliminan las restricciones del componente [React native Calendars](https://www.npmjs.com/package/react-native-calendars) de soportar sólo un tipo de marcado.

Para implementarlo hay que utilizar la propiedad `dayComponent={({date, state, marking}) => ...}` de `Calendar` y devolver este componente.

![comp_calendar_example](./assets/2_PROTOTYPE/comp_calendarDay/comp_calendar_example.png)

**Propiedades**
-

**`date ( required )`**

Día del calendario.
<br>
Recibe un `object` => `{ day: Number, month: Number, year: Number, timestamp: Number, dateString: String }`

- `day` : día del calendario (1-31) (required)
- `month` : mes del calendario (1-12) (required)
- `year` : año del calendario (required)
- `timestamp` : tiempo en milisegundos del calendario (required)
- `dateString` : fecha formateada (`yyyy-MM-dd`) del calendario (required)

```jsx
<CalendarDay date={{day: 6, month: 5, year: 2020, timestamp: 1588716000000, dateString: '2020-05-06'}}/>
```
![comp_calendarDay](./assets/2_PROTOTYPE/comp_calendarDay/comp_calendarDay.png)

<div style="page-break-after: always;"></div>

**`state ( optional )`**

Estado del día
<br>
Recibe un `string ['disabled', '', 'today']`. Por defecto el valor es `''`
```ts
<CalendarDay date={date} state={'disabled'}/>
<CalendarDay date={date} state={'today'}/>
```
![comp_calendarDay_stateDisabled](./assets/2_PROTOTYPE/comp_calendarDay/comp_calendarDay_stateDisabled.png)
![comp_calendarDay_stateToday](./assets/2_PROTOTYPE/comp_calendarDay/comp_calendarDay_stateToday.png)

**`marking ( optional )`**

Marcas que tiene el día
<br>
Recibe un `object` compuesto por tres claves. Por defecto el valor es `{}`

- `single`
<br>
Recibe un `object` => `{ color: String, textColor: String }`

  - `color` : color de fondo del día (required)
  - `textColor` : color del texto del día (required)

```jsx
<CalendarDay date={date} marking={{single: {color: '#FF0000', textColor: '#FFFFFF'}}}/>
```
![comp_calendarDay_single](./assets/2_PROTOTYPE/comp_calendarDay/comp_calendarDay_single.png)

- `multi`
<br>
Recibe un `array` de `object` => `{ color: String }`

  - `color` : color de fondo del círculo del día (required)

```jsx
<CalendarDay date={date}
			 marking={{multi: [
				 {color: '#FF0000'},
				 {color: '#00FF00'},
				 {color: '#0000FF'}
			 ]}}/>
```
![comp_calendarDay_multi](./assets/2_PROTOTYPE/comp_calendarDay/comp_calendarDay_multi.png)

<div style="page-break-after: always;"></div>

- `selection`
<br>
Recibe un `object` => `{ color: String, isStart: Bool, isEnd: Bool }`

  - `color` : color de fondo del día (required)
  - `isStart` : indica si el día es el comienzo de la selección (optional)
  - `isEnd` : indica si el día es el final de la selección (optional)

```ts
<CalendarDay date={date}
			 marking={{selection: {color: '#FF6666'}}}/>
<CalendarDay date={date}
			 marking={{selection: {color: '#FF6666', isStart: true}}}/>
<CalendarDay date={date}
			 marking={{selection: {color: '#FF6666', isEnd: true}}}/>
<CalendarDay date={date}
			 marking={{selection: {color: '#FF6666', isStart: true, isEnd: true}}}/>
```
![comp_calendarDay_selection](./assets/2_PROTOTYPE/comp_calendarDay/comp_calendarDay_selection.png)
![comp_calendarDay_selectionStart](./assets/2_PROTOTYPE/comp_calendarDay/comp_calendarDay_selectionStart.png)
![comp_calendarDay_selectionEnd](./assets/2_PROTOTYPE/comp_calendarDay/comp_calendarDay_selectionEnd.png)
![comp_calendarDay_selectionStartEnd](./assets/2_PROTOTYPE/comp_calendarDay/comp_calendarDay_selectionStartEnd.png)

El resultado de combinar las anteriores es:

![comp_calendarDay_marking](./assets/2_PROTOTYPE/comp_calendarDay/comp_calendarDay_marking.png)

**`onClick ( optional )`**

Función llamada cuando el usuario pulsa el componente.
<br>
Recibe un parámetro `value` que indica el objecto `date` del día pulsado
```jsx
<CalendarDay date={date} onClick={(value) => alert('valor: ' + value)}/>
```

**`onLongClick ( optional )`**

Función llamada cuando el usuario mantiene pulsado el componente.
<br>
Recibe un parámetro `value` que indica el objecto `date` del día mantenido
```jsx
<CalendarDay date={date} onLongClick={(value) => alert('valor: ' + value)}/>
```

<div style="page-break-after: always;"></div>

### CALENDAR PICKER

Este componente es una especialización del componente [React native Calendars](https://www.npmjs.com/package/react-native-calendars) que permite al usuario seleccionar rangos de fechas.

&#9888; **IMPORTANTE**
<br>
Si se quiere modificar las propiedades `startDate` y `endDate` de este componente en tiempo de ejecución, será necesario desmontar el componente y volver a montarlo.
<br>
Así sería una posible implementación
```jsx
<Button label={'Mostrar diálogo'} onClick={() => this.setState({visible: true})}/>

{this.state.visible && 
<CalendarPicker onCancel={() => this.setState({visible: false})}
				onSubmit={(startDate, endDate) => 
					this.setState({
						startDate: startDate,
						endDate: endDate,
						visible: false
					})
				}
				startDate={this.state.startDate}
				endDate={this.state.endDate}
/>}
```
|	|	|	|
|:-:|:-:|:-:|
|	![comp_calendarPicker_example](./assets/2_PROTOTYPE/comp_calendarPicker/comp_calendarPicker_empty.png) |	![comp_calendarPicker_example](./assets/2_PROTOTYPE/comp_calendarPicker/comp_calendarPicker_multiple0.png) |	![comp_calendarPicker_example](./assets/2_PROTOTYPE/comp_calendarPicker/comp_calendarPicker_multiple1.png) |

<div style="page-break-after: always;"></div>

**Propiedades**
-

**`onSubmit, onCancel ( required )`**

- **onSubmit**<br>
Función llamada cuando el usuario acepta el diálogo.
<br>
Recibe dos parámetros `startDate : String , endDate : String` que representan las fechas inicial y final selccionadas. Ambos datos con el formato `yyyy-MM-dd`.

- **onCancel**<br>
Función llamada cuando el usuario cancela el diálogo.

```jsx
<CalendarPicker onCancel={() => console.log('cancelado')}
				onSubmit={(startDate, endDate) => console.log(startDate, endDate)}
/>
```

**`multiple ( optional )`**

Especifica si el componente permite selección múltiple o no.
<br>
Recibe un `bool`. Por defecto el valor es `true`
```jsx
<CalendarPicker onCancel={() => console.log('cancelado')}
				onSubmit={(startDate, endDate) => console.log(startDate, endDate)}
				multiple={false}
/>
```
![comp_calendarPicker_single](./assets/2_PROTOTYPE/comp_calendarPicker/comp_calendarPicker_multipleFalse.png)

<div style="page-break-after: always;"></div>

**`startDate ( optional )`**

Indica la fecha inicial de la selección del componente.
<br>
Recibe un `string` con el formato `yyyy-MM-dd`
```jsx
<CalendarPicker onCancel={() => console.log('cancelado')}
				onSubmit={(startDate, endDate) => console.log(startDate, endDate)}
				startDate={'2020-05-13'}
/>
```

**`endDate ( optional )`**

Indica la fecha final de la selección del componente. Si la propiedad `startDate` no está definida, esta propiedad no se tendrá en cuenta.
<br>
Recibe un `string` con el formato `yyyy-MM-dd`
```jsx

<CalendarPicker onCancel={() => console.log('cancelado')}
				onSubmit={(startDate, endDate) => console.log(startDate, endDate)}
				startDate={'2020-05-13'}
				endDate={'2020-05-30'}
/>
```
![comp_calendarPicker_startDate](./assets/2_PROTOTYPE/comp_calendarPicker/comp_calendarPicker_multiple0.png)
![comp_calendarPicker_startEndDate](./assets/2_PROTOTYPE/comp_calendarPicker/comp_calendarPicker_multiple1.png)

<div style="page-break-after: always;"></div>

**Propiedades**
-

**`onSubmit, onCancel ( required )`**

- **onSubmit**<br>
Función llamada cuando el usuario acepta el diálogo.
<br>
Recibe dos parámetros `startDate : String , endDate : String` que representan las fechas inicial y final selccionadas. Ambos datos con el formato `yyyy-MM-dd`.

- **onCancel**<br>
Función llamada cuando el usuario cancela el diálogo.

```jsx
<CalendarPicker onCancel={() => console.log('cancelado')}
				onSubmit={(startDate, endDate) => console.log(startDate, endDate)}
/>
```

**`multiple ( optional )`**

Especifica si el componente permite selección múltiple o no.
<br>
Recibe un `bool`. Por defecto el valor es `true`
```jsx
<CalendarPicker onCancel={() => console.log('cancelado')}
				onSubmit={(startDate, endDate) => console.log(startDate, endDate)}
				multiple={false}
/>
```
![comp_calendarPicker_single](./assets/2_PROTOTYPE/comp_calendarPicker/comp_calendarPicker_multipleFalse.png)

<div style="page-break-after: always;"></div>

**`startDate ( optional )`**

Indica la fecha inicial de la selección del componente.
<br>
Recibe un `string` con el formato `yyyy-MM-dd`
```jsx
<CalendarPicker onCancel={() => console.log('cancelado')}
				onSubmit={(startDate, endDate) => console.log(startDate, endDate)}
				startDate={'2020-05-13'}
/>
```

**`endDate ( optional )`**

Indica la fecha final de la selección del componente. Si la propiedad `startDate` no está definida, esta propiedad no se tendrá en cuenta.
<br>
Recibe un `string` con el formato `yyyy-MM-dd`
```jsx

<CalendarPicker onCancel={() => console.log('cancelado')}
				onSubmit={(startDate, endDate) => console.log(startDate, endDate)}
				startDate={'2020-05-13'}
				endDate={'2020-05-30'}
/>
```
![comp_calendarPicker_startDate](./assets/2_PROTOTYPE/comp_calendarPicker/comp_calendarPicker_multiple0.png)
![comp_calendarPicker_startEndDate](./assets/2_PROTOTYPE/comp_calendarPicker/comp_calendarPicker_multiple1.png)

<div style="page-break-after: always;"></div>

## FORMULARIOS

Los formularios son componentes de la aplicación tambien, pero están formados por sub-componentes y su lógiva es más complicada.

<div style="page-break-after: always;"></div>

### TEACHER FORM

Este componente permite crear y editar profesores dentro de la aplicación.
<br>
El formulario actualiza automáticamente la base de datos, por lo que no hay que añadir ninguna funcionalidad extra para realizar estas funciones.

Si algún campo del formulario no está relleno, saldrá un error cuando se intente confirmar el diálogo.

&#9888; **IMPORTANTE**
<br>
Si se quiere modificar la propiedad `teacher` de este componente en tiempo de ejecución, será necesario desmontar el componente y volver a montarlo.
<br>
Así sería una posible implementación
```jsx
<Button label={'Mostrar formulario'} onClick={() => this.setState({visible: true})}/>

{this.state.visible && 
<TeacherForm onCancel={() => this.setState({visible: false})}
			 onSubmit={(key) => {
				 console.log(key);
				 this.setState({visible: false});
			 }
/>}
```

**Propiedades**
-

**`onSubmit, onCancel ( required )`**

- **onSubmit**<br>
Función llamada cuando el usuario acepta el diálogo.
<br>
Recibe un parámetro `key : String` que representa el id del profesor creado/actualizado.

- **onCancel**<br>
Función llamada cuando el usuario cancela el diálogo.

```jsx
<TeacherForm onCancel={() => console.log('cancelado')}
			 onSubmit={(key) => console.log(key)}/>
```
![comp_formTeacher](./assets/2_PROTOTYPE/comp_formTeacher/comp_formTeacher.png)

<div style="page-break-after: always;"></div>

**`teacher ( optional )`**

Define el los datos iniciales que se van a cargar en el formulario.
<br>
Recibe un `object` compuesto de dos claves

- `key` : id del profesor (required)
- `obj`
<br>
Recibe un `object` => `{name : String}`

  - `name` : nombre del profesor (required)

```jsx
<TeacherForm onCancel={() => console.log('cancelado')}
			 onSubmit={(key) => console.log(key)}
			 subject={{
				 key: 'teacher_key',
				 obj: {name: 'Antonio Otero'}
			 }}/>
```
![comp_formTeacher_teacher](./assets/2_PROTOTYPE/comp_formTeacher/comp_formTeacher_teacher.png)

<div style="page-break-after: always;"></div>

### SUBJECT FORM

Este componente permite crear y editar asignaturas dentro de la aplicación.
<br>
El formulario actualiza automáticamente la base de datos, por lo que no hay que añadir ninguna funcionalidad extra para realizar estas funciones.

Si algún campo del formulario no está relleno, saldrá un error cuando se intente confirmar el diálogo.

Permite crear profesores pulsando en el icono `+` del campo de profesor. Gracias a esto el usuario no tiene que cancelar el formulario para crear un profesor que no tenia.

&#9888; **IMPORTANTE**
<br>
Si se quiere modificar la propiedad `subject` de este componente en tiempo de ejecución, será necesario desmontar el componente y volver a montarlo.
<br>
Así sería una posible implementación
```jsx
<Button label={'Mostrar formulario'} onClick={() => this.setState({visible: true})}/>

{this.state.visible && 
<SubjectForm onCancel={() => this.setState({visible: false})}
			 onSubmit={(key) => {
				 console.log(key);
				 this.setState({visible: false});
			 }
/>}
```

**Propiedades**
-

**`onSubmit, onCancel ( required )`**

- **onSubmit**<br>
Función llamada cuando el usuario acepta el diálogo.
<br>
Recibe un parámetro `key : String` que representa el id de la asignatua creada/actualizada.

- **onCancel**<br>
Función llamada cuando el usuario cancela el diálogo.

<div style="page-break-after: always;"></div>

```jsx
<SubjectForm onCancel={() => console.log('cancelado')}
			 onSubmit={(key) => console.log(key)}/>
```
![comp_formSubject](./assets/2_PROTOTYPE/comp_formSubject/comp_formSubject.png)

**`subject ( optional )`**

Define el los datos iniciales que se van a cargar en el formulario.
<br>
Recibe un `object` compuesto de dos claves

- `key` : id del profesor (required)
- `obj`
<br>
Recibe un `object` => `{name : String, percentage: Number. color: String, id_teacher: String}`

  - `name` : nombre de la asignatura (required)
  - `percentage` : porcentage de la asignatura (required)
  - `color` : color de la asignatura (required)
  - `id_teacher` : id del profesor asociado (optional)

<div style="page-break-after: always;"></div>

&#9888; **Por qué `id_teacher` puede ser opcional**
<br>
Este valor puede ser opcional debido a que el usuario puede eliminar el profesor asociado a dicha asignatura. Cuando esto pasa, la asignatura no se elimina, por lo que es posible que se diera el caso.
<br>
Cuando se edite una asignatura que no tenga profesor, se marcará como vacío dicho cambio.

```jsx
<SubjectForm onCancel={() => console.log('cancelado')}
			 onSubmit={(key) => console.log(key)}
			 subject={{
				 key: 'subject_key',
				 obj: {
					 name: 'Acceso a Datos',
					 percentage: 30,
					 color: '#FF0000',
					 id_teacher: 'teacher_key'
				 }
			 }}/>
```
![comp_formSubject_subject](./assets/2_PROTOTYPE/comp_formSubject/comp_formSubject_subject.png)

<div style="page-break-after: always;"></div>

### SCHEDULE FORM

Este componente permite crear y editar clases dentro de la aplicación.
<br>
El formulario actualiza automáticamente la base de datos, por lo que no hay que añadir ninguna funcionalidad extra para realizar estas funciones.

Si algún campo del formulario no está relleno, saldrá un error cuando se intente confirmar el diálogo.

Permite crear asignaturas pulsando en el icono `+` del campo de asignatura. Gracias a esto el usuario no tiene que cancelar el formulario para crear una asignatura que no tenia.

&#9888; **IMPORTANTE**
<br>
Si se quiere modificar la propiedad `schedule` de este componente en tiempo de ejecución, será necesario desmontar el componente y volver a montarlo.
<br>
Así sería una posible implementación
```jsx
<Button label={'Mostrar formulario'} onClick={() => this.setState({visible: true})}/>

{this.state.visible && 
<ScheduleForm onCancel={() => console.log('cancelado')}
			  onSubmit={(key) => {
				 console.log(key);
				 this.setState({visible: false});
			 }
/>}
```

**Propiedades**
-

**`onSubmit, onCancel ( required )`**

- **onSubmit**<br>
Función llamada cuando el usuario acepta el diálogo.
<br>
Recibe un parámetro `key : String` que representa el id del horario creado/actualizado.

- **onCancel**<br>
Función llamada cuando el usuario cancela el diálogo.

<div style="page-break-after: always;"></div>

```jsx
<ScheduleForm onCancel={() => console.log('cancelado')}
			  onSubmit={(key) => console.log(key)}/>
```
![comp_formSchedule](./assets/2_PROTOTYPE/comp_formSchedule/comp_formSchedule.png)

**`schedule ( optional )`**

Define el los datos iniciales que se van a cargar en el formulario.
<br>
Recibe un `object` compuesto de dos claves

- `key` : id del horario (required)
- `obj`
<br>
Recibe un `object` => `{startTime : String, endTime: String, id_subject: String}`

  - `startTime` : hora de inicio de la clase (required)
  - `endTime` : hora de fin de la clase (required)
  - `id_subject` : id de la asignatura asociada (optional)

<div style="page-break-after: always;"></div>

&#9888; **Por qué `id_subject` puede ser opcional**
<br>
Este valor puede ser opcional debido a que el usuario puede eliminar la asignatra asociada a dicho horario. Cuando esto pasa, el horario no se elimina, por lo que es posible que se diera el caso.
<br>
Cuando se edite un horario que no tenga asignatura, se marcará como vacío dicho cambio.

```jsx
<SubjectForm onCancel={() => console.log('cancelado')}
			 onSubmit={(key) => console.log(key)}
			 subject={{
				 key: 'schedule_key',
				 obj: {
					 startTime: '8:30',
					 endTime: '10:30',
					 id_subject: 'subject_key'
				 }
			 }}/>
```
![comp_formSchedule_schedule](./assets/2_PROTOTYPE/comp_formSchedule/comp_formSchedule_schedule.png)

<div style="page-break-after: always;"></div>

### TIMETABLE FORM

Este componente permite crear y editar horarios dentro de la aplicación.
<br>
El formulario actualiza automáticamente la base de datos, por lo que no hay que añadir ninguna funcionalidad extra para realizar estas funciones.

Si algún campo del formulario no está relleno, saldrá un error cuando se intente confirmar el diálogo.

Estos horarios permiten tener diferentes rangos de tiempo con diferentes asignaturas.

&#9888; **IMPORTANTE**
<br>
Si se quiere modificar la propiedad `timetable` de este componente en tiempo de ejecución, será necesario desmontar el componente y volver a montarlo.
<br>
Así sería una posible implementación
```jsx
<Button label={'Mostrar formulario'} onClick={() => this.setState({visible: true})}/>

{this.state.visible && 
<TimetableForm onCancel={() => console.log('cancelado')}
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
Función llamada cuando el usuario elimina el horario.

<div style="page-break-after: always;"></div>

```jsx
<TimetableForm onCancel={() => console.log('cancelado')}
			   onDelete={() => console.log('eliminado')}
			   onSubmit={(key) => console.log(key)}/>
```
![comp_formTimetable](./assets/2_PROTOTYPE/comp_formTimetable/comp_formTimetable.png)

**`timetable ( optional )`**

Define el los datos iniciales que se van a cargar en el formulario.
<br>
Recibe un `object` compuesto de tres claves

- `key` : id del horario (required)
- `index` : índice del horario (1º, 2º, etc) (required)
- `obj`
<br>
Recibe un `object` => `{startDate : String, endDate: String}`

  - `startDate` : fecha de inicio del horario (required)
  - `endDate` :fecha de fin del horario (required)

<div style="page-break-after: always;"></div>

```jsx
<TimetableForm onCancel={() => console.log('cancelado')}
			   onDelete={() => console.log('eliminado')}
			   onSubmit={(key) => console.log(key)}
			   subject={{
				   key: 'timetable_key',
				   index: '1',
				   obj: {
					   startDate: '2020-01-01',
					   endDate: '2020-05-18'
				   }
			   }}/>
```
![comp_formTimetable_timetable](./assets/2_PROTOTYPE/comp_formTimetable/comp_formTimetable_timetable.png)

<div style="page-break-after: always;"></div>

### HOLIDAYS FORM

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
![comp_formHolidays](./assets/2_PROTOTYPE/comp_formHolidays/comp_formHolidays.png)

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
![comp_formHolidays_holidays](./assets/2_PROTOTYPE/comp_formHolidays/comp_formHolidays_holidays.png)

<div style="page-break-after: always;"></div>

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
![comp_formExam](./assets/2_PROTOTYPE/comp_formExam/comp_formExam.png)

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
![comp_formExam_Exam](./assets/2_PROTOTYPE/comp_formExam/comp_formExam_Exam.png)

<div style="page-break-after: always;"></div>

## SISTEMAS IMPLEMENTADOS

En esta sección del documento se van a explicar los sistemas implementados para añadir ciertas funcionalidades a la aplicación.

<div style="page-break-after: always;"></div>

### I18N

El i18n es un controlador creado para manejar qué idiomas tiene la aplicación y qué idioma tiene seleccionado la aplicación.

**¿Por qué i18n?**

La nomenclatura de i18n viene de `Internationalization`, I - 18 letras - N.

**Cómo funciona**

Para una mejor experiencia de usuario, el i18n permite modificar el idioma de la aplicación desde la pantalla de ajustes.
<br>
En el caso de que sea la primera vez que se abra la aplicación, este módulo detectará automáticamente el idioma del dispositivo y seleccionará entre `español` (si tu dispositivo tiene configurado algún idioma derivado del español) o `inglés` en cualquier otro caso.

Aquí se muestra una imagen con el diagrama de cómo funciona dentro de la aplicación.

![diagram_i18n](./assets/2_PROTOTYPE/diagram_i18n.png)

<div style="page-break-after: always;"></div>

Podemos distinguir 4 bloques principales:
- **i18n** : es el controlador en sí
- **Screens** : todas las pantallas de la aplicación
- **Components** : todos los componentes que tengan un contenido estático, y que por consiguiente tengan que mostrar dicho texto en un idioma o en otro
- **Languages available** : idiomas disponibles en la aplicación

También podemos ver que a la derecha hay un componente llamado **evento**. Este componente indica al i18n que tiene que cambiar de idioma.

El flujo que sigue este diagrama comienza con la renderización del componente (1).
- Lo primero que hacen las pantallas es renderizar todo su contenido en la pantalla.
- Acto seguido se ejecuta una función llamada `componentDidMount`. Dentro de esta función (sólo en las pantallas), se añade un `listener` al i18n. Básicamente suscribe a la pantalla para que sea notificada cuando haya algún cambio.
- Este comportamiento se produce en el punto 3, cuando un evento hace que se tenga que actualizar el idioma de la aplicación, con la función `setLocale`.
- Esto nos lleva al punto 4, donde se notifica a todas las pantallas que se hayan suscrito al i18n (paso 2), para forzar una actualización en sus vistas (5).
- Una vez que se ha llegado al punto 5, el ciclo se cierra, volviendo al apartado 1. En este caso, la suscripción al i18n no vuelve a ocurrir ya que la pantalla no se desrenderiza.

Con este sistema, podemos actualizar el idioma de toda la aplicación sin necesidad de reiniciar la aplicación.

Esta configuración se guarda automáticamente en la memoria local del dispositivo, para preservar el idioma.

<div style="page-break-after: always;"></div>

### CONFIG

El i18n es un controlador creado para manejar qué idiomas tiene la aplicación y qué idioma tiene seleccionado la aplicación.

**Cómo funciona**

Para una mejor experiencia de usuario, se puede confiruar ciertas partes de la aplicación, como la información mostrada en el calendario.
<br>
En el caso de que sea la primera vez que se abra la aplicación, este módulo cargará automáticamente una configuración por defecto que activará todo.

Aquí se muestra una imagen con el diagrama de cómo funciona dentro de la aplicación.

![diagram_config](./assets/2_PROTOTYPE/diagram_config.png)

El funcionamiento de este sistema es igual que el sistema de [i18n](#i18n).
<br>
La mayor diferencia es que aquí no hace falta suscribir todas las pantallas al sistema, sólo aquellas que se puedan ver afectadas por el cambio. En nuestro caso sólo es la pantalla Calendario.

Igual que con el i18n, la configuración se guarda automáticamente en la memoria local del dispositivo.

<div style="page-break-after: always;"></div>

## CONTRIBUIDORES

| **Jorge Chércoles Moreno** |
| :-: |
| ![Chiefbark](https://avatars3.githubusercontent.com/u/24280701?s=160&v=2=200) |
| <a href="http://github.com/Chiefbark" target="_blank">`github.com/Chiefbark`</a> |