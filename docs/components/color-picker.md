### COLOR PICKER

Este componente permite al usuario elegir un color de entre muchos.

```jsx
<ColorPicker data={['#FF0000', '#00FF00', '#0000FF']}
			 marked={['#FF0000', '#0000FF']}
			 initialValue={'#00FF00'}
			 onValueChange={(value) => alert('valor: ' + value)}
			 style={{backgroundColor: 'lightgrey', paddingHorizontal: 10}}/>
```
![comp_colorPicker_example](../assets/2_PROTOTYPE/comp_colorPicker/comp_colorPicker_example.png)

**Propiedades**
-

**`data ( required )`**

Define los elementos que se van a mostrar en el selector.
<br>
Recibe un `array` de `string`
```jsx
<ColorPicker data={['#FF0000', '#00FF00', '#0000FF']}/>
```
![comp_colorPicker_data](../assets/2_PROTOTYPE/comp_colorPicker/comp_colorPicker_data.png)
![comp_colorPicker_data_selected](../assets/2_PROTOTYPE/comp_colorPicker/comp_colorPicker_data_selected.png)

**`marked ( optional )`**

Define qué colores se tienen que marcar.
<br>
Recibe un `array` de `string`
```jsx
<ColorPicker data={['#FF0000', '#00FF00', '#0000FF']}
			 marked={['#FF0000', '#0000FF']}/>
```
![comp_colorPicker_data](../assets/2_PROTOTYPE/comp_colorPicker/comp_colorPicker_data_marked.png)

<div style="page-break-after: always;"></div>

**`initialValue ( optional )`**

Define el color seleccionado por defecto cuando se monta el componente.
<br>
Recibe un `string`
```jsx
<ColorPicker data={['#FF0000', '#00FF00', '#0000FF']}
			 initialValue={'#00FF00'}/>
```
![comp_colorPicker_data_selected](../assets/2_PROTOTYPE/comp_colorPicker/comp_colorPicker_data_selected.png)

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