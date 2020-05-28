## TEST SUBJECTS

Input test
-

<table>
<tr>
<td style="vertical-align: top">
<img src="../assets/TESTING/subjects/input_subjects.jpeg" alt="input_subjects" width="200px"/>
</td>
<td style="vertical-align: top">
Si se intenta guardar una asignatura que no tiene todos los campos rellenos, se mostrará un error en pantalla
</td>
</tr>
</table>

<div style="page-break-after: always;"></div>

Añadir asignatura
-

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Añadir una nueva asignatura con los datos:
<pre>
color: '#080808'
id_teacher: -M8M2pJRkPTugcXc99G3
name: 'Subject Added'
percentage: 15
</pre>
<code>id_teacher</code> corresponde con el profesor:
<pre>
nSubjects: 1
name: 'Antonio Otero'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Aparecerá un nuevo nodo con los datos:
<pre>
color: '#080808'
id_teacher: -M8M2pJRkPTugcXc99G3
name: 'Subject Added'
percentage: 15
</pre>
Se incrementará el campo <code>nSubjects</code> del profesor
<pre>
nSubjects: 2
name: 'Antonio Otero'
</pre>
</td>
</tr>
</table>

|	Datos iniciales	|	Datos esperados	|	Test	|
|:-:|:-:|:-:|
|	![add_subjects_original](../assets/TESTING/subjects/add_subjects_original.png)	|	![add_subjects](../assets/TESTING/subjects/add_subjects.png)	|	✔️	|
|	![add_teachers_original](../assets/TESTING/subjects/add_teachers_original.png)	|	![add_teachers](../assets/TESTING/subjects/add_teachers.png)	|	✔️	|

<div style="page-break-after: always;"></div>

Actualizar asignatura
-

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Modificar la asignatura con los datos:
<pre>
color: '#0000FF'
id_teacher: -M8M2syA325hatTz8Zc0
name: 'Empresa e Iniciativa Emprendedora'
percentage: 15
</pre>
<code>id_teacher</code> corresponde con el profesor:
<pre>
nSubjects: 1
name: 'Miguel Salmerón'
</pre>
cambiándolos a:
<pre>
color: '#800080'
id_teacher: -M8MhAfhTDIX7yH8DsIw
name: 'Subject Updated'
percentage: 15
</pre>
<code>id_teacher</code> corresponde con el profesor:
<pre>
nSubjects: 1
name: 'Francisco Javier Cárceles'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Se modificará el nodo con los nuevos datos:
<pre>
color: '#800080'
id_teacher: -M8MhAfhTDIX7yH8DsIw
name: 'Subject Updated'
percentage: 15
</pre>
Se descrementará el campo <code>nSubjects</code> del profesor anterior
<pre>
nSubjects: 0
name: 'Miguel Salmerón'
</pre>
Se incrementará el campo <code>nSubjects</code> del nuevo profesor
<pre>
nSubjects: 2
name: 'Francisco Javier Cárceles'
</pre>
</td>
</tr>
</table>

<div style="page-break-after: always;"></div>

|	Datos iniciales	|	Datos esperados	|	Test	|
|:-:|:-:|:-:|
|	![update_subjects_original](../assets/TESTING/subjects/update_subjects_original.png)	|	![update_subjects](../assets/TESTING/subjects/update_subjects.png)	|	✔️	|
|	![update_teachers_original](../assets/TESTING/subjects/update_teachers_original.png)	|	![update_teachers](../assets/TESTING/subjects/update_teachers.png)	|	✔️	|

<div style="page-break-after: always;"></div>

Eliminar asignatura
-

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Eliminar la asignatura con los datos:
<pre>
color: '#FF6F6F'
id_teacher: -M8MhAfhTDIX7yH8DsIw
name: 'Programación Multimedia Y Dispositivos Móviles'
percentage: 15
</pre>
<code>id_teacher</code> corresponde con el profesor:
<pre>
nSubjects: 1
name: 'Francisco Javier Cárceles'
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Se eliminará el nodo con los datos:
<pre>
color: '#FF6F6F'
id_teacher: -M8MhAfhTDIX7yH8DsIw
name: 'Programación Multimedia Y Dispositivos Móviles'
percentage: 15
</pre>
Se descrementará el campo <code>nSubjects</code> del profesor
<pre>
nSubjects: 0
name: 'Francisco Javier Cárceles'
</pre>
Se eliminarán los exámenes asociados a la asignatura
<pre>
-M8M4_WAwFKC6Iz9OXPA
</pre>
Se eliminarán las ausencias asociadas a la asignatura
<pre>
-M8M3tXZP7QIDjLZiVqj
-M8M43hlRy0MLITYZRh3
</pre>
Se eliminará el campo <code>id_subject</code> de las clases asociadas a la asignatura
<pre>
-M8M3tXZP7QIDjLZiVqj
-M8M43hlRy0MLITYZRh3
</pre>
</td>
</tr>
</table>

<div style="page-break-after: always;"></div>

|	Datos iniciales	|	Datos tras actualización	|	Test	|
|:-:|:-:|:-:|
|	![delete_subjects_original](../assets/TESTING/subjects/delete_subjects_original.png)	|	![delete_subjects](../assets/TESTING/subjects/delete_subjects.png)	|	✔️	|
|	![delete_teachers_original](../assets/TESTING/subjects/delete_teachers_original.png)	|	![delete_teachers](../assets/TESTING/subjects/delete_teachers.png)	|	✔️	|
|	![delete_exams_original](../assets/TESTING/subjects/delete_exams_original.png)	|	![delete_exams](../assets/TESTING/subjects/delete_exams.png)	|	✔️	|
|	![delete_absences_original](../assets/TESTING/subjects/delete_absences_original.png)	|	![delete_absences](../assets/TESTING/subjects/delete_absences.png)	|	✔️	|
|	![delete_schedules_original](../assets/TESTING/subjects/delete_schedules_original.png)	|	![delete_schedules](../assets/TESTING/subjects/delete_schedules.png)	|	✔️	|

<div style="page-break-after: always;"></div>