### SWITCH

Este componente permite al usuario cambiar el estado de un botón.

```jsx
<Switch/>
```
![comp_switch_example](../assets/2_PROTOTYPE/comp_switch/comp_switch_example.png)
![comp_switch_example](../assets/2_PROTOTYPE/comp_switch/comp_switch_active.png)

**Propiedades**
-

**`initialValue ( optional )`**

Define el texto que va a tener el botón.
<br>
Recibe un `bool`. Por defecto es valor es `false`
```jsx
<Switch initialValue={true}/>
```
![comp_switch_active](../assets/2_PROTOTYPE/comp_switch/comp_switch_active.png)

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