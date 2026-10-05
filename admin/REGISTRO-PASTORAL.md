# Registro pastoral en Cloudflare D1

La base `ipn-content` contiene el directorio público y las fichas privadas del cuerpo pastoral. Las fechas se almacenan como `AAAA-MM-DD` y los horarios conservan el texto enviado, sin inferir horas ni coordenadas.

- `directory_records`: personas e iglesias, direcciones, horarios y asignación pastoral. El campo `published` es la versión que consulta la web.
- `pastoral_profiles`: nacimiento, RUT, contacto, estado civil, domicilio particular, matrimonio y nombramiento. Solo la administración tiene acceso.
- `pastoral_responses`: las 54 respuestas originales, con fila, fecha de envío e identificador de importación.
- `pastoral_assignments`: asignaciones, direcciones y horarios de cada respuesta, incluyendo respuestas anteriores de la misma iglesia.
- `pastoral_imports`: procedencia y SHA-256 del Excel.
- `pastoral_birthdays`: vista SQL para consultar cumpleaños por mes y día.
- `site_data`: contenido institucional y galerías que antes se incluían en JavaScript.

## Consultas

```sql
SELECT nombre, role, fecha_nacimiento, mes_dia
FROM pastoral_birthdays
WHERE substr(mes_dia, 1, 2) = '10'
ORDER BY mes_dia, nombre;

SELECT id, json_extract(draft, '$.nombre') AS iglesia,
       json_extract(draft, '$.direccion') AS direccion,
       json_extract(draft, '$.horarios') AS horarios
FROM directory_records WHERE kind = 'church';
```

El mantenedor permite consultar cumpleaños por mes y guardar fechas de nacimiento. `GET /api/pastoral`, `PUT /api/pastoral/:id` y `GET /api/pastoral/birthdays?month=10` requieren el rol de administrador y Cloudflare Access. Las escrituras también comprueban origen y versión de la ficha. La API pública omite fechas de nacimiento, RUT y domicilios particulares.

## Decisiones de esta importación

Las respuestas repetidas conservan su historial. Los datos actuales toman la última fecha de envío. La asignación de Rey de Reyes se fijó en Luis Ernesto Vega Catalán por instrucción del usuario. Se conservó el nombre correcto Alex Bernardo Brana Godoy, asociado a su registro existente.

Los años `00xx` se convirtieron a `19xx` siguiendo la instrucción del usuario. El nombramiento de Hernán Sepúlveda Martínez figura como `02/04/0013` en el Excel y queda en `1913-02-04` aplicando esa regla; necesita revisión porque antecede a su nacimiento. El original se conserva en `pastoral_responses`.

Las coordenadas, nombres de búsqueda y enlaces existentes de las iglesias se conservaron. Las siete iglesias nuevas tienen coordenadas vacías. El archivo del listado/mapa no se modificó.

Los archivos de `admin/seed-data` son únicamente insumos históricos y de pruebas, no respaldo para la web. Cuando una consulta falla, la app conserva la última respuesta de BD disponible en memoria y muestra el error para reintentar.

La importación requiere un respaldo remoto actual y comprueba revisiones antes de escribir. Un archivo ya importado no debe aplicarse nuevamente. Los scripts preparatorios generan un plan y SQL privados fuera de `admin/dist`; no se publican los archivos de importación.
