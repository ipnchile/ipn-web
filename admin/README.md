# Administración IPN Chile

Panel Vue 3 separado del sitio público. Cloudflare Access protege `admin.ipnchile.cl`; el Worker vuelve a verificar firma RS256, emisor, audiencia, expiración y correo de cada sesión. La lista de roles está en las variables del Worker: `ADMIN_EMAILS` y `EDITOR_EMAILS` (correos separados por coma). No se guardan contraseñas ni claves de R2 en el navegador.

## Estado inicial de esta integración (histórico)

Preparación completada el 7 de septiembre de 2026, **sin despliegue por indicación del usuario**. No se hizo commit ni push a GitHub ni publicación en Netlify.

- Zero Trust Free activado en la cuenta existente. Aplicación de Access `IPN Chile · Administración`, ID `2ed12022-5440-4aa8-bfa6-f0c145b29da7`, para todo el dominio `admin.ipnchile.cl`.
- Política Allow restringida a `master.ipnchile@gmail.com`, sin editores añadidos. Sesión de seis horas y MFA independiente mediante aplicación autenticadora, con duración de seis horas. Cookies HttpOnly y Binding Cookie activadas.
- D1 `ipn-content` creado y migraciones iniciales aplicadas: tres noticias, nueve eventos y un banner.
- Bucket `ipn-admin-private` creado sin habilitar URL pública. `ipn-media` se conserva para las imágenes existentes.
- Emisor, audiencia y enlaces a recursos configurados en `wrangler.jsonc`. La ruta de dominio personalizado se aplicará solo al desplegar el Worker.
- Pendientes para puesta en marcha: desplegar Worker y dominio administrativo, inscribir el autenticador del administrador, probar el inicio de sesión real y después desplegar la web pública desde Netlify. La validación local no sustituye esa prueba de acceso real.

## Uso

1. Ingresar al dominio administrativo con un correo autorizado y completar el segundo factor configurado en Access.
2. Seleccionar Noticias, Eventos o Banner de inicio. Editar o crear una entrada y guardar el borrador.
3. El administrador puede publicar o retirar la versión de la web. Los editores solo preparan borradores.
4. Historial permite recuperar una versión como borrador. Para hacerla pública hay que publicarla expresamente.

El contenido existente se importa con la migración `0002_initial_content.sql`. Guardar un borrador no cambia su versión publicada. Las escrituras verifican el número de versión para impedir sobrescrituras concurrentes. No hay borrado definitivo desde el panel.

Las imágenes nuevas van al bucket **privado** `ipn-admin-private`, con máximo 5 MB por archivo. Se conserva el archivo cargado, sin rediseñarlo. El endpoint público solo devuelve una imagen cuando está referenciada por una publicación vigente. Los archivos previamente publicados en `media.ipnchile.cl` siguen siendo públicos. Retirar una publicación no puede borrar copias ya descargadas por terceros.

## Desarrollo y despliegue

Desde este directorio:

```sh
npm ci
npm test
npm run build
npx wrangler d1 migrations apply ipn-content --local
npx wrangler dev
```

El servidor local mantiene la verificación de Access; no existe un modo de acceso abierto. Las pruebas usan claves RSA de prueba y una instancia efímera de D1/R2 en Miniflare. Para revisar la UI durante desarrollo se puede usar Vite con respuestas de API de prueba fuera del código desplegable.

Antes de desplegar: configurar Access para todo `admin.ipnchile.cl`, limitar el correo, habilitar MFA y copiar el emisor y Application Audience (AUD) a `wrangler.jsonc`. El Worker deniega administración si falta la configuración o se usa un dominio alternativo. `run_worker_first: true` protege también los archivos estáticos.

```sh
npx wrangler d1 migrations apply ipn-content --remote
npm run deploy
```

La lectura pública utiliza `https://ipn-admin.master-ipnchile.workers.dev/public/content`. El sitio Vue admite `VITE_CONTENT_API` para cambiar esa dirección. Si hay una interrupción, conserva lo último recibido durante la sesión y, sin datos previos, utiliza el contenido incluido en la compilación. Esto puede mostrar temporalmente contenido anterior durante una caída; no incluye borradores.

## Mantenimiento

- Para agregar un editor, añadir su correo tanto a la política de Access como a `EDITOR_EMAILS`. Para revocar, retirarlo de ambos y revocar sus sesiones en Access.
- Los registros de versiones en D1 no son una copia externa de seguridad. Usar D1 Time Travel para incidentes y exportar periódicamente con `wrangler d1 export ipn-content --remote --output <archivo.sql>` a una ubicación privada. Una recuperación completa se debe planificar para evitar sobrescribir publicaciones recientes.
- El historial de la UI muestra las últimas 100 versiones de cada entrada; las anteriores siguen en D1.
- Los borradores de imágenes no usados se conservan; revisar el consumo y limpiar solo tras comprobar que ninguna versión los necesita.
- Los planes están sujetos a las cuotas de Cloudflare. No se configuran ampliaciones de pago automáticamente.
- `.wrangler`, `.dev.vars` y credenciales deben permanecer fuera de Git.

## Directorio público — notas de la preparación inicial

Se añadieron 41 iglesias y 91 registros de personas en las migraciones 0003/0004. Los datos provienen del sitio existente; no se verificaron identidades ni direcciones contra fuentes externas. Las autoridades con nombres abreviados siguen separadas hasta confirmar sus correspondencias. El informe directory-import-report.json enumera 120 rutas locales de fotografías inexistentes: quedaron vacías, con el marcador visual del sitio; las fotos institucionales que ya tienen URL de R2 se conservaron.

D1 almacena datos JSON y la URL pública foto_url, nunca fotografías, blobs, base64 ni credenciales. El directorio permite crear, editar borradores, publicar y retirar personas e iglesias. Las iglesias relacionan pastor_id/pastora_id con personas; no se han creado funciones de intranet. Solo el administrador modifica el directorio. Los cambios públicos pueden tardar 60 segundos por la caché. Ante una caída, el sitio puede mostrar el último directorio o la copia incluida en la compilación.

Las cargas del panel están deshabilitadas por defecto (ALLOW_MEDIA_UPLOADS=false), también para noticias. El directorio usa solo URLs públicas existentes de media.ipnchile.cl. No se crean buckets ni recursos adicionales. El directorio tiene un límite preventivo de 1000 registros y 12000 caracteres por versión de cada registro; esto limita su tamaño pero NO constituye un límite de facturación de la cuenta.

Los scripts npm run deploy y npm run db:remote están bloqueados. No se aplicó ninguna migración remota ni se publicó en Netlify. Wrangler ejecutado directamente puede eludir este bloqueo local: NO es un control del proveedor.

Antes de cualquier publicación se requiere verificar Workers Free/D1 y resolver con el propietario la condición de coste cero: D1/Workers Free bloquean al superar sus cuotas, mientras R2 factura almacenamiento y operaciones excedentes. Una alerta no es un tope de gasto. Esta preparación no garantiza una factura de cero ni modifica el contrato de R2 existente. No habilitar servicios pagados ni eludir los bloqueos.

Referencias: https://developers.cloudflare.com/d1/platform/limits/ y https://developers.cloudflare.com/r2/pricing/ (revisadas el 7 de septiembre de 2026).

## Acceso local y vista previa

Compile el panel con npm run admin:build, luego inicie npm run dev desde la raíz. Abra http://localhost:5173/mantenedor/ (o el puerto mostrado por Vite). El menú conserva la sección mediante #news, #event, #banner o #directory. Vista previa muestra borrador sin guardar o versión publicada, con tamaños escritorio y móvil. Es una representación del contenido; no publica.

El adaptador de desarrollo usa las mismas validaciones y operaciones del Worker con D1/R2 locales persistentes en admin/.wrangler/local-admin. Solo acepta conexiones loopback y conserva la validación de origen para escrituras. No contacta Cloudflare ni modifica producción. Las migraciones iniciales se aplican una vez a esa base local. Publicar actualiza el sitio local; recargue la página para comprobarlo.

El Worker de producción mantiene Cloudflare Access y el dominio previsto admin.ipnchile.cl. El adaptador local solo se carga desde Vite en desarrollo. No se ha desplegado el dominio ni hecho push.

## Biblioteca y sitemap dinámicos

La sección Biblioteca de videos permite crear, previsualizar, guardar, publicar y retirar videos con historial. Aplique 0005_video_library.sql y 0006_initial_videos.sql al poner en marcha el Worker. La ampliación de documents conserva su contenido y las referencias de history mediante restricciones diferidas. /public/sitemap.xml consulta eventos e iglesias publicados en cada solicitud. Ninguna publicación invoca un despliegue de Netlify.

## Publicación autorizada — 10 de septiembre de 2026

Worker y dominio admin.ipnchile.cl desplegados. Migraciones 0003 a 0006 aplicadas a D1 remoto; verificadas 3 noticias, 9 eventos, 2 videos y 41 iglesias. La entrada administrativa redirige a Cloudflare Access. API pública y sitemap responden correctamente. No se cambiaron suscripciones ni se habilitaron cargas adicionales de R2 (ALLOW_MEDIA_UPLOADS=false). Los bloqueos npm de operaciones remotas permanecen como protección para ejecuciones futuras; esta publicación se ejecutó con autorización expresa del propietario.

Versión Worker: 1fa0990b-ee77-4554-85bb-efcc95a11d38. La web se publica mediante GitHub/Netlify con las reglas de proxy incluidas. El inicio de sesión interactivo requiere el correo autorizado y el segundo factor del propietario.
