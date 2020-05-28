## TEST ABSENCES

Añadir ausencia
-

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Añadir una ausencia el día <code>2020-05-14</code> con los datos:
<pre>
-M8M4C246nqriWbpp170: {
id_subject: -M8M35u5sszS3YsSSpf4
path: -M8M2ntTmOhJ8Pgp81aL/3
}
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Aparecerá un nuevo nodo con el día <code>2020-05-14</code> con los datos:
<pre>
-M8M4C246nqriWbpp170: {
id_subject: -M8M35u5sszS3YsSSpf4
path: -M8M2ntTmOhJ8Pgp81aL/3
}
</pre>
</td>
</tr>
</table>

|	Datos iniciales	|	Datos tras actualización	|	Test	|
|:-:|:-:|:-:|
|	![add_absences_original](../assets/TESTING/absences/add_absences_original.png)	|	![add_absences](../assets/TESTING/absences/add_absences.png)	|	✔️	|

<div style="page-break-after: always;"></div>

Eliminar ausencia
-

<table style="width: 100%">
<tr><th>Premisa</th><th>Esperado</th></tr>
<tr>
<td style="vertical-align: top; width: 50%">
Eliminar la ausencia del día <code>2020-05-20</code> con los datos:
<pre>
-M8M43hlRy0MLITYZRh3: {
id_subject: -M8M3PQGkynQcee_bC5j
path: -M8M2ntTmOhJ8Pgp81aL/2
}
</pre>
</td>
<td style="vertical-align: top; width: 50%">
Se eliminará el nodo del día <code>2020-05-20</code> con los datos:
<pre>
-M8M43hlRy0MLITYZRh3: {
id_subject: -M8M3PQGkynQcee_bC5j
path: -M8M2ntTmOhJ8Pgp81aL/2
}
</pre>
</td>
</tr>
</table>

|	Datos iniciales	|	Datos tras actualización	|	Test	|
|:-:|:-:|:-:|
|	![delete_absences_original](../assets/TESTING/absences/delete_absences_original.png)	|	![delete_absences](../assets/TESTING/absences/delete_absences.png)	|	✔️	|

<div style="page-break-after: always;"></div>