## TEST TIEMTABLES

Input test
-

<table>
<tr>
<td style="vertical-align: top">
<img src="../assets/TESTING/timetables/input_timetables.jpeg" alt="input_timetables" width="200px"/>
</td>
<td style="vertical-align: top">
Si se intenta guardar un horario que no tiene todos los campos rellenos, se mostrará un error en pantalla
</td>
</tr>
<tr>
<td style="vertical-align: top">
<img src="../assets/TESTING/timetables/input_timetables_dates.jpeg" alt="input_exams_schedules" width="200px"/>
</td>
<td style="vertical-align: top">
Si la fecha inicial no es anterior a la fecha final, se mostrará un error en pantalla
</td>
</tr>
</table>

Cada prueba tendrá asociado una representación esquemática de cómo afecta a los diferentes horarios de la aplicación.

Originalmente tenemos dos horarios

![add_case_initial](../assets/TESTING/timetables/add_case_initial.png)

<div style="page-break-after: always;"></div>

Añadir horario
-

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Añadir un horario con los datos:
<pre>
endDate: '2020-08-31'
startDate: '2020-08-01'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Aparecerá un nuevo nodo con los datos:
<pre>
endDate: '2020-08-31'
startDate: '2020-08-01'
</pre>
</td>
</tr>
</table>

![add_case_0](../assets/TESTING/timetables/add_case_0.png)

|	Datos iniciales	|	Datos esperados	|	Test	|
|:-:|:-:|:-:|
|	![add_timetables_0_original](../assets/TESTING/timetables/add_timetables_0_original.png)	|	![add_timetables_0](../assets/TESTING/timetables/add_timetables_0.png)	|	✔️	|

<div style="page-break-after: always;"></div>

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Añadir un horario con los datos:
<pre>
endDate: '2020-08-31'
startDate: '2020-08-10'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Aparecerá un nuevo nodo con los datos:
<pre>
endDate: '2020-08-31'
startDate: '2020-08-10'
</pre>
Se actualizará el campo <code>endDate</code> del horario anterior:
<pre>
endDate: '2020-08-09'
startDate: '2020-07-01'
</pre>
</td>
</tr>
</table>

![add_case_1](../assets/TESTING/timetables/add_case_1.png)

|	Datos iniciales	|	Datos esperados	|	Test	|
|:-:|:-:|:-:|
|	![add_timetables_1_original](../assets/TESTING/timetables/add_timetables_1_original.png)	|	![add_timetables_1](../assets/TESTING/timetables/add_timetables_1.png)	|	✔️	|

<div style="page-break-after: always;"></div>

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Añadir un horario con los datos:
<pre>
endDate: '2020-08-31'
startDate: '2020-07-10'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Aparecerá un nuevo nodo con los datos:
<pre>
endDate: '2020-08-31'
startDate: '2020-07-10'
</pre>
Se actualizará el campo <code>endDate</code> del horario anterior:
<pre>
endDate: '2020-07-09'
startDate: '2020-07-01'
</pre>
Se eliminarán todas las faltas de asistencia entre <code>2020-07-10 - 2020-08-31</code>
<pre>
-M8VxoyFo8FYYvCKPa8L
-M8VyM8HX3s7t-smwqzP
</pre>
Se eliminarán todos los exámenes entre<br><code>2020-07-10 - 2020-08-31</code>
<pre>
-M8Vyn2l_-lZBDM-MrTZ
</pre>
</td>
</tr>
</table>

![add_case_2](../assets/TESTING/timetables/add_case_2.png)

<div style="page-break-after: always;"></div>

|	Datos iniciales	|	Datos esperados	|	Test	|
|:-:|:-:|:-:|
|	![add_timetables_2_original](../assets/TESTING/timetables/add_timetables_2_original.png)	|	![add_timetables_2](../assets/TESTING/timetables/add_timetables_2.png)	|	✔️	|
|	![add_absences_2_original](../assets/TESTING/timetables/add_absences_2_original.png)	|	![add_absences_2](../assets/TESTING/timetables/add_absences_2.png)	|	✔️	|
|	![add_exams_2_original](../assets/TESTING/timetables/add_exams_2_original.png)	|	![add_exams_2](../assets/TESTING/timetables/add_exams_2.png)	|	✔️	|

<div style="page-break-after: always;"></div>

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Añadir un horario con los datos:
<pre>
endDate: '2020-08-31'
startDate: '2020-06-25'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Aparecerá un nuevo nodo con los datos:
<pre>
endDate: '2020-08-31'
startDate: '2020-06-25'
</pre>
Se eliminará el horario:
<pre>
-M8VxKh1HefKXQcXdhK8
</pre>
Se actualizará el campo <code>endDate</code> del horario anterior:
<pre>
endDate: '2020-06-24'
startDate: '2020-05-01'
</pre>
Se eliminarán todas las faltas de asistencia entre <code>2020-06-25 - 2020-08-31</code>
<pre>
-M8VxoyFo8FYYvCKPa8L
-M8VyM8HX3s7t-smwqzP
</pre>
Se eliminarán todos los exámenes entre<br><code>2020-06-25 - 2020-08-31</code>
<pre>
-M8NrwZ6A_CFqKuglbS-
-M8Vyn2l_-lZBDM-MrTZ
</pre>
</td>
</tr>
</table>

![add_case_3](../assets/TESTING/timetables/add_case_3.png)

<div style="page-break-after: always;"></div>

|	Datos iniciales	|	Datos esperados	|	Test	|
|:-:|:-:|:-:|
|	![add_timetables_3_original](../assets/TESTING/timetables/add_timetables_3_original.png)	|	![add_timetables_3](../assets/TESTING/timetables/add_timetables_3.png)	|	✔️	|
|	![add_absences_3_original](../assets/TESTING/timetables/add_absences_3_original.png)	|	![add_absences_3](../assets/TESTING/timetables/add_absences_3.png)	|	✔️	|
|	![add_exams_3_original](../assets/TESTING/timetables/add_exams_3_original.png)	|	![add_exams_3](../assets/TESTING/timetables/add_exams_3.png)	|	✔️	|

<div style="page-break-after: always;"></div>

Actualizar horario
-

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Modificar el horario con los datos:
<pre>
endDate: '2020-06-30'
startDate: '2020-05-01'
</pre>
cambiándolos a:
<pre>
endDate: '2020-07-24'
startDate: '2020-05-01'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Se modificará el nodo con los nuevos datos:
<pre>
endDate: '2020-07-24'
startDate: '2020-05-01'
</pre>
Se actualizará el campo <code>startDate</code> del horario posterior:
<pre>
endDate: '2020-07-31'
startDate: '2020-07-25'
</pre>
Se eliminarán todas las faltas de asistencia entre <code>2020-07-01 - 2020-07-24</code>
<pre>
-M8VxoyFo8FYYvCKPa8L
</pre>
Se eliminarán todos los exámenes entre<br><code>2020-07-01 - 2020-07-24</code>
<pre>
-M8Vyn2l_-lZBDM-MrTZ
</pre>
</td>
</tr>
</table>

![update_case_0](../assets/TESTING/timetables/update_case_0.png)

<div style="page-break-after: always;"></div>

|	Datos iniciales	|	Datos esperados	|	Test	|
|:-:|:-:|:-:|
|	![update_timetables_original](../assets/TESTING/timetables/update_timetables_original.png)	|	![update_timetables_0](../assets/TESTING/timetables/update_timetables_0.png)	|	✔️	|
|	![update_absences_0_original](../assets/TESTING/timetables/update_absences_0_original.png)	|	![update_absences_0](../assets/TESTING/timetables/update_absences_0.png)	|	✔️	|
|	![update_exams_0_original](../assets/TESTING/timetables/update_exams_0_original.png)	|	![update_exams_0](../assets/TESTING/timetables/update_exams_0.png)	|	✔️	|

<div style="page-break-after: always;"></div>

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Modificar el horario con los datos:
<pre>
endDate: '2020-07-31'
startDate: '2020-07-01'
</pre>
cambiándolos a:
<pre>
endDate: '2020-07-31'
startDate: '2020-06-09'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Se modificará el nodo con los nuevos datos:
<pre>
endDate: '2020-07-31'
startDate: '2020-06-09'
</pre>
Se actualizará el campo <code>endDate</code> del horario posterior:
<pre>
endDate: '2020-06-08'
startDate: '2020-05-01'
</pre>
Se eliminarán todas las faltas de asistencia entre <code>2020-06-09 - 2020-06-30</code>
<pre>
-M8M46OgKvj2GfGbUMNy
-M8M4FZOyJQquzOQY9Tj
</pre>
Se eliminarán todos los exámenes entre<br><code>2020-06-09 - 2020-06-30</code>
<pre>
-M8Ns2NazixKQ6UXhWJh
-M8NrwZ6A_CFqKuglbS-
</pre>
</td>
</tr>
</table>

![update_case_1](../assets/TESTING/timetables/update_case_1.png)

<div style="page-break-after: always;"></div>

|	Datos iniciales	|	Datos esperados	|	Test	|
|:-:|:-:|:-:|
|	![update_timetables_original](../assets/TESTING/timetables/update_timetables_original.png)	|	![update_timetables_1](../assets/TESTING/timetables/update_timetables_1.png)	|	✔️	|
|	![update_absences_1_original](../assets/TESTING/timetables/update_absences_1_original.png)	|	![update_absences_1](../assets/TESTING/timetables/update_absences_1.png)	|	✔️	|
|	![update_exams_1_original](../assets/TESTING/timetables/update_exams_1_original.png)	|	![update_exams_1](../assets/TESTING/timetables/update_exams_1.png)	|	✔️	|

<div style="page-break-after: always;"></div>

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Modificar el horario con los datos:
<pre>
endDate: '2020-06-30'
startDate: '2020-05-01'
</pre>
cambiándolos a:
<pre>
endDate: '2020-08-05'
startDate: '2020-05-01'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Se modificará el nodo con los nuevos datos:
<pre>
endDate: '2020-08-05'
startDate: '2020-05-01'
</pre>
Se eliminará el horario:
<pre>
-M8VxKh1HefKXQcXdhK8
</pre>
Se eliminarán todas las faltas de asistencia entre <code>2020-07-01 - 2020-08-05</code>
<pre>
-M8VxoyFo8FYYvCKPa8L
-M8VyM8HX3s7t-smwqzP
</pre>
Se eliminarán todos los exámenes entre<br><code>2020-07-01 - 2020-08-05</code>
<pre>
-M8Vyn2l_-lZBDM-MrTZ
</pre>
</td>
</tr>
</table>

![update_case_2](../assets/TESTING/timetables/update_case_2.png)

<div style="page-break-after: always;"></div>

|	Datos iniciales	|	Datos esperados	|	Test	|
|:-:|:-:|:-:|
|	![update_timetables_original](../assets/TESTING/timetables/update_timetables_original.png)	|	![update_timetables_2](../assets/TESTING/timetables/update_timetables_2.png)	|	✔️	|
|	![update_absences_2_original](../assets/TESTING/timetables/update_absences_2_original.png)	|	![update_absences_2](../assets/TESTING/timetables/update_absences_2.png)	|	✔️	|
|	![update_exams_2_original](../assets/TESTING/timetables/update_exams_2_original.png)	|	![update_exams_2](../assets/TESTING/timetables/update_exams_2.png)	|	✔️	|

<div style="page-break-after: always;"></div>

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Modificar el horario con los datos:
<pre>
endDate: '2020-07-31'
startDate: '2020-07-01'
</pre>
cambiándolos a:
<pre>
endDate: '2020-07-31'
startDate: '2020-04-23'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Se modificará el nodo con los nuevos datos:
<pre>
endDate: '2020-07-31'
startDate: '2020-04-23'
</pre>
Se eliminará el horario:
<pre>
-M8VxKh1HefKXQcXdhK8
</pre>
Se eliminarán todas las faltas de asistencia entre <code>2020-04-23 - 2020-06-30</code>
<pre>
-M8M3rLvPTbNZnuxwl-I
-M8M3tXZP7QIDjLZiVqj
-M8M48GIDflDh4Uf5e5l
-M8M43hlRy0MLITYZRh3
-M8M4KNMzOwQYr69abNy
-M8M4OXNi0202P10Oy2i
-M8M3z83kkPB4JMfd3pu
-M8M48GIDflDh4Uf5e5l
-M8M46OgKvj2GfGbUMNy
-M8M4FZOyJQquzOQY9Tj
</pre>
Se eliminarán todos los exámenes entre<br><code>2020-04-23 - 2020-06-30</code>
<pre>
-M8M4_WAwFKC6Iz9OXPA
-M8NrwZ6A_CFqKuglbS-
-M8Ns2NazixKQ6UXhWJh
-M8NyuaHJJNXAknaqeof
-M8Vzy64yfgHUMIUDYTC
</pre>
</td>
</tr>
</table>

![update_case_3](../assets/TESTING/timetables/update_case_3.png)

<div style="page-break-after: always;"></div>

|	Datos iniciales	|	Datos esperados	|	Test	|
|:-:|:-:|:-:|
|	![update_timetables_original](../assets/TESTING/timetables/update_timetables_original.png)	|	![update_timetables_3](../assets/TESTING/timetables/update_timetables_3.png)	|	✔️	|
|	![update_absences_3_original](../assets/TESTING/timetables/update_absences_3_original.png)	|	![update_absences_3](../assets/TESTING/timetables/update_absences_3.png)	|	✔️	|
|	![update_exams_3_original](../assets/TESTING/timetables/update_exams_3_original.png)	|	![update_exams_3](../assets/TESTING/timetables/update_exams_3.png)	|	✔️	|

<div style="page-break-after: always;"></div>

Eliminar horario
-

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Eliminar el horario con los datos:
<pre>
endDate: '2020-06-30'
startDate: '2020-05-01'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Se eliminará el nodo con los datos:
<pre>
endDate: '2020-06-30'
startDate: '2020-05-01'
</pre>
Se eliminarán todas las faltas de asistencia entre <code>2020-05-01 - 2020-06-30</code>
<pre>
-M8M3rLvPTbNZnuxwl-I
-M8M3tXZP7QIDjLZiVqj
-M8M48GIDflDh4Uf5e5l
-M8M43hlRy0MLITYZRh3
-M8M4KNMzOwQYr69abNy
-M8M4OXNi0202P10Oy2i
-M8M3z83kkPB4JMfd3pu
-M8M48GIDflDh4Uf5e5l
-M8M46OgKvj2GfGbUMNy
-M8M4FZOyJQquzOQY9Tj
</pre>
Se eliminarán todos los exámenes entre<br><code>2020-05-01 - 2020-06-30</code>
<pre>
-M8M4_WAwFKC6Iz9OXPA
-M8NrwZ6A_CFqKuglbS-
-M8Ns2NazixKQ6UXhWJh
-M8NyuaHJJNXAknaqeof
-M8Vzy64yfgHUMIUDYTC
</pre>
</td>
</tr>
</table>

![delete_case_0](../assets/TESTING/timetables/delete_case_0.png)

<div style="page-break-after: always;"></div>

|	Datos iniciales	|	Datos esperados	|	Test	|
|:-:|:-:|:-:|
|	![delete_timetables_original](../assets/TESTING/timetables/update_timetables_original.png)	|	![delete_timetables_0](../assets/TESTING/timetables/delete_timetables_0.png)	|	✔️	|
|	Mismas que en el caso de **Update 2**	|	Mismas que en el caso de **Update 2**	|	✔️	|
|	Mismas que en el caso de **Update 2**	|	Mismas que en el caso de **Update 2**	|	✔️	|

<div style="page-break-after: always;"></div>

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Eliminar el horario con los datos:
<pre>
endDate: '2020-07-31'
startDate: '2020-07-01'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Se eliminará el nodo con los datos:
<pre>
endDate: '2020-07-31'
startDate: '2020-07-01'
</pre>
Se eliminarán todas las faltas de asistencia entre <code>2020-07-01 - 2020-07-31</code>
<pre>
-M8VxoyFo8FYYvCKPa8L
-M8VyM8HX3s7t-smwqzP
</pre>
Se eliminarán todos los exámenes entre<br><code>2020-07-01 - 2020-07-31</code>
<pre>
-M8Vyn2l_-lZBDM-MrTZ
</pre>
</td>
</tr>
</table>
</td>
</tr>
</table>

![delete_case_1](../assets/TESTING/timetables/delete_case_1.png)

<div style="page-break-after: always;"></div>

|	Datos iniciales	|	Datos esperados	|	Test	|
|:-:|:-:|:-:|
|	![delete_timetables_original](../assets/TESTING/timetables/update_timetables_original.png)	|	![delete_timetables_1](../assets/TESTING/timetables/delete_timetables_1.png)	|	✔️	|
|	Mismas que en el caso de **Update 3**	|	Mismas que en el caso de **Update 3**	|	✔️	|
|	Mismas que en el caso de **Update 3**	|	Mismas que en el caso de **Update 3**	|	✔️	|

<div style="page-break-after: always;"></div>