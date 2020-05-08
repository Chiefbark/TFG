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
![comp_icon_example](../assets/2_PROTOTYPE/comp_icon/comp_icon_example.png)

**Propiedades**
-

**`source ( required )`**

Define el texto que va a tener el botón.
<br>
Recibe un `ImageSourcePropType`
```jsx
<Icon source={require('./assets/icons/icon_add.png')}/>
```
![comp_icon](../assets/2_PROTOTYPE/comp_icon/comp_icon.png)

**`iconColor ( optional )`**

Define el color de la imagen que va a tener el icono.
<br>
Recibe un `string`
```jsx
<Icon source={require('./assets/icons/icon_add.png')} iconColor={'#FF0000'}/>
```
![comp_icon_iconColor](../assets/2_PROTOTYPE/comp_icon/comp_icon_iconColor.png)

<div style="page-break-after: always;"></div>

**`size ( optional )`**

Define el tamaño que va a tener el icono.
<br>
Recibe un `string ['small', 'normal', 'large']`. Por defecto es valor es `normal`
```ts
<Button source={require('./assets/icons/icon_add.png')} size={'small'}/>
<Button source={require('./assets/icons/icon_add.png')} size={'large'}/>
```
![comp_icon_sizeSmall](../assets/2_PROTOTYPE/comp_icon/comp_icon_sizeSmall.png)
![comp_icon_sizeLarge](../assets/2_PROTOTYPE/comp_icon/comp_icon_sizeLarge.png)

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
![comp_icon_floating](../assets/2_PROTOTYPE/comp_icon/comp_icon_floating.png)

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