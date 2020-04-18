# PROPUESTA

| Documento 	|   |
|-----------	|-  |
| Fecha     	| 18/04/2020  |
| Versión   	| 0.0.3 |
| Autor     	| Jorge Chércoles Moreno  |

<br>

**Changelog**

1. Modificada la plataforma de desarrollo
     - **Anterior**: Visual Studio Code
     - **Nueva**: Webstorm

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
- [PROPUESTA](#propuesta)
  - [INTRODUCCION](#introduccion)
  - [DESCRIPCION](#descripcion)
  - [OBJETIVOS](#objetivos)
  - [REQUISITOS](#requisitos)
  - [TECNOLOGIAS](#tecnologias)
  - [PLANIFICACION](#planificacion)
  - [PRESUPUESTO](#presupuesto)
  - [CONTRIBUIDORES](#contribuidores)

<div style="page-break-after: always;"></div>

## INTRODUCCION

Debido a que las faltas de asistencia en tus clases pueden llegar a ser un problema, desde perder el derecho a examen, hasta perder una beca, he decidido crear una aplicación de uso personal para facilitar el control de éstas.

A parte de poder añadir y eliminar tus faltas de asistencia en todos los días, también podrás ver estadísticas de ellas, pudiendo filtrar por asignaturas, profesores, etc.

Y no te preocupes por tus datos, estarán almacenados en la nube y podrás sincronizarlos con otros dispositivos.

También podrás exportar tus horarios para que tus compañeros no tengan que crear el horario. ¡Así solo lo hace una persona!

<div style="page-break-after: always;"></div>

## DESCRIPCION

La aplicación estará disponible en la `Play Store`, al menos al inicio. Posteriormente se valorará la necesidad de subirla a la `Apple Store`.

|                                                  |                                                                                                                                                |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| ![database_remote](./assets/PROPOSAL/database_remote.png) | **Base de datos remota** <br> Disponer de una base de datos remota te permitirá disponer de tus datos desde cualquier dispositivo              |
| ![statistics](./assets/PROPOSAL/statistics.png)           | **Estadísticas** <br> Las estadísticas te permitirán ver en qué asignaturas tienes más faltas ó cuales son los días que más faltas entre otros |
| ![ux_ui](./assets/PROPOSAL/ux_ui.png)                     | **Diseño intuitivo** <br> Una aplicación secilla y facil de usar, para que puedas acceder a todo mucho más rápido                              |
| ![free](./assets/PROPOSAL/free.png)                       | **Gratis** <br> Aplicación totalmente gratuita y sin anuncios!                                                                                 |

<div style="page-break-after: always;"></div>

## OBJETIVOS

El objetivo de esta aplicación es facilitar al alumno el poder administrar sus ausencias para que despues no se lleve ninguna sorpresa si falta demasiado.

| #   | REQUISITOS                                                                                       |
| --- | ------------------------------------------------------------------------------------------------ |
| 1   | Gestionar las faltas de asistencia                                                               |
| 2   | Ver estadísticas de ausencias filtradas por días, profesores, asignaturas, etc                   |
| 3   | Posibilidad de indicar un porcentaje de faltas para mostrar notificación si se llega a ese valor |
| 4   | Sincronización de datos con otros dispositivos a traves de un número de identificación           |
| 5   | Importar y exportar los horarios                                                                 |
| 6   | Aplicación multi idioma (español e ingles)                                                       |

<div style="page-break-after: always;"></div>

## REQUISITOS

- Gestionar ausencias en un determinado día
- Listado de asignaturas por día
- Gestionar diferentes perfiles para diferentes centros formativos, cada uno con sus respectivos horarios, asignaturas y profesores
- Gestionar asignaturas
- Gestionar profesores
- Visualizar estadísticas de ausencias
- Soporte para cambios de horario (se mantendrán los horarios previos al día del cambio, y se utilizarán esos datos para las estadísticas)
- Importación y exportación de perfiles de los cursos
- Sincronización a traves de un número de identificación
- Gestionar días festivos (algunos ya vendrán por defecto activos)

<div style="page-break-after: always;"></div>

## TECNOLOGIAS

|            	|   |   |
|-----------	|-  |:-:|
| Plataforma de desarrollo  | Webstorm            | <img src="./assets/PROPOSAL/webstorm.png" alt="webstorm" style="height: 32px;"> |
| Tecnología de desarrollo  | React Native        | <img src="./assets/PROPOSAL/react_native.png" alt="react_native" style="height: 32px;"> |
| Base de datos remota      | Firebase            | <img src="./assets/PROPOSAL/firebase.png" alt="firebase" style="height: 32px;"> |
| Control de versiones      | Github              | <img src="./assets/commons/github.png" alt="github" style="height: 32px;"> |
| Gestión de proyecto       | Trello              | <img src="./assets/commons/trello.png" alt="trello" style="height: 32px;"> |
| Deseño de layouts         | Figma               | <img src="./assets/commons/figma.png" alt="figma" style="height: 32px;">  |

<div style="page-break-after: always;"></div>

## PLANIFICACION

| FASE                | TIEMPO  | FECHO INICIO | FECHA FIN | PUESTO  |
|-------------------	|:-----:  |:----------:  |:-------:  |:-----:  |
| Propuesta           | 2h  | 20/03/20 | 20/03/20 | analista  |
| **Análisis**        | | | | |
| Aprendizaje         | 20h | 21/03/20 | 23/03/20 | programador |
| Definición          | 10h | 23/03/20 | 24/03/20 | analista |
| Modelos             | 5h  | 24/03/20 | 25/03/20 | analista |
| **Diseño**          | | | | |
| Vistas              | 20h | 25/03/20 | 28/03/20 | diseñador |
| **Implementación**  | | | | |
| Modelo              | 16h | 29/03/20 | 31/03/20 | programador |
| Vistas              | 8h  | 01/04/20 | 02/04/20 | programador |
| Controlador         | 16h | 03/04/20 | 05/04/20 | programador |
| Base de datos       | 5h  | 06/04/20 | 06/04/20 | programador |
| **Pruebas**         | | | | |
| Modelo              | 16h | 07/04/20 | 09/04/20 | tester |
| usabilidad          | 24h | 10/04/20 | 13/04/20 | tester |
| **Memoria**         | | | | |
| Informes            | 32h | 14/04/20 | 18/04/20 | analista |
| Diseño              | 16h | 18/04/20 | 20/04/20 | diseñador |
| Presentación        | 16h | 21/04/20 | 23/04/20 | diseñador |
|                     | | | | |
| **TOTAL**           | **232h** | **1 mes y 3 días** | | |

<div style="page-break-after: always;"></div>

## PRESUPUESTO

| PUESTO      | €/HORA |   HORAS   |   TOTAL   |
| ----------- | :----: | :-------: | :-------: |
| Analista    |  15€   |    49h    |   735€    |
| Programador |  10€   |    65h    |   650€    |
| Diseñador   |  10€   |    52h    |   520€    |
| Tester      |  12€   |    40h    |   480€    |
|             |        | **TOTAL** | **2385€** |

<div style="page-break-after: always;"></div>

## CONTRIBUIDORES

| **Jorge Chércoles Moreno** |
| :-: |
| ![Chiefbark](https://avatars3.githubusercontent.com/u/24280701?s=160&v=2=200) |
| <a href="http://github.com/Chiefbark" target="_blank">`github.com/Chiefbark`</a> |