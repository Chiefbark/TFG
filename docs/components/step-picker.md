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
![comp_stepPicker_example](../assets/2_PROTOTYPE/comp_stepPicker/comp_stepPicker_example.png)

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
![comp_stepPicker_data](../assets/2_PROTOTYPE/comp_stepPicker/comp_stepPicker_data.png)

<div style="page-break-after: always;"></div>

**`initialValue ( optional )`**

Define el elemento seleccionado por defecto cuando se monta el componente. Selecciona el elemento cuyo índice corresponda con esta propiedad.
<br>
Recibe un `number`. Por defecto el valor es `0`
```jsx
<StepPicker data={[{label: '1'}, {label: '2'}, {label: '3'}]}
			initialValue={1}/>
```
![comp_stepPicker_initialValue](../assets/2_PROTOTYPE/comp_stepPicker/comp_stepPicker_example.png)

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