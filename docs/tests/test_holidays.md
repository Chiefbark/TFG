## TEST HOLIDAYS

Añadir vacaciones
-

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Añadir unas vacaciones con los datos:
<pre>
endDate: '2020-05-28'
name: 'Vacaciones'
startDate: '2020-05-19'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Aparecerá un nuevo nodo con los datos:
<pre>
endDate: '2020-05-28'
name: 'Vacaciones'
startDate: '2020-05-19'
</pre>
Se eliminarán todas las faltas de asistencia entre esos días
<pre>
-M8M43hlRy0MLITYZRh3
-M8M4KNMzOwQYr69abNy
-M8M4OXNi0202P10Oy2i
-M8M3z83kkPB4JMfd3pu
-M8M48GIDflDh4Uf5e5l
</pre>
Se eliminarán todos los exámenes entre esos días
<pre>
-M8M4_WAwFKC6Iz9OXPA
-M8NrwZ6A_CFqKuglbS-
</pre>
</td>
</tr>
</table>

<div style="page-break-after: always;"></div>

|	Datos iniciales	|	Datos esperados	|	Test	|
|:-:|:-:|:-:|
|	![add_holidays_original](../assets/TESTING/holidays/add_holidays_original.png)	|	![add_holidays](../assets/TESTING/holidays/add_holidays.png)	|	✔️	|
|	![add_absences_original](../assets/TESTING/holidays/add_absences_original.png)	|	![add_absences](../assets/TESTING/holidays/add_absences.png)	|	✔️	|
|	![add_exams_original](../assets/TESTING/holidays/add_exams_original.png)	|	![add_exams](../assets/TESTING/holidays/add_exams.png)	|	✔️	|

<div style="page-break-after: always;"></div>