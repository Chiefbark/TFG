## TEST TEACHERS

Input test
-

<table>
<tr>
<td style="vertical-align: top">
<img src="../assets/TESTING/teachers/input_teachers.jpeg" alt="input_teachers" width="200px"/>
</td>
<td style="vertical-align: top">
Si se intenta guardar un profesor que no tiene todos los campos rellenos, se mostrará un error en pantalla
</td>
</tr>
</table>

<div style="page-break-after: always;"></div>

Añadir profesor
-

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Añadir un profesor con los datos:
<pre>
name: 'Teacher Added'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Aparecerá un nuevo nodo con los datos:
<pre>
nSubjects: 0
name: 'Teacher Added'
</pre>
</td>
</tr>
</table>

|	Datos iniciales	|	Datos tras actualización	|	Test	|
|:-:|:-:|:-:|
|	![add_teachers_original](../assets/TESTING/teachers/add_teachers_original.png)	|	![add_teachers](../assets/TESTING/teachers/add_teachers.png)	|	✔️	|

<div style="page-break-after: always;"></div>

Actualizar profesor
-

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Modificar el profesor con los datos:
<pre>
name: 'Jose Angel Martín'
</pre>
cambiándolos a:
<pre>
name: 'Teacher Updated'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Se modificará el nodo con los nuevos datos:
<pre>
name: 'Teacher Updated'
</pre>
</td>
</tr>
</table>

|	Datos iniciales	|	Datos tras actualización	|	Test	|
|:-:|:-:|:-:|
|	![update_teachers_original](../assets/TESTING/teachers/update_teachers_original.png)	|	![update_teachers](../assets/TESTING/teachers/update_teachers.png)	|	✔️	|

<div style="page-break-after: always;"></div>

Eliminar profesor
-

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Eliminar el profesor con los datos:
<pre>
name: 'Jose Angel Martín'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Se eliminará el nodo con los datos:
<pre>
nSubjects: 1
name: 'Jose Angel Martín'
</pre>
Se eliminará el campo <code>id_teacher</code> de la asignatura con datos:
<pre>
color: '#8844FF'
id_teacher: -M8Mh8NtMPi1XC79tHOh
name: 'Inglés Técnico'
percentage: 15
</pre>
</td>
</tr>
</table>

|	Datos iniciales	|	Datos tras actualización	|	Test	|
|:-:|:-:|:-:|
|	![delete_teachers_original](../assets/TESTING/teachers/delete_teachers_original.png)	|	![delete_teachers](../assets/TESTING/teachers/delete_teachers.png)	|	✔️	|
|	![delete_subjects_original](../assets/TESTING/teachers/delete_subjects_original.png)	|	![delete_subjects](../assets/TESTING/teachers/delete_subjects.png)	|	✔️	|

<div style="page-break-after: always;"></div>