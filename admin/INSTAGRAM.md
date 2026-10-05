# Instagram automático

## Estado del despliegue — 17 de septiembre de 2026

Se verificó Workers Free activo y se aplicó únicamente `0007_instagram.sql` en `ipn-content`. Worker desplegado: `7113913e-4c8f-4785-bcb3-16804515c673`, con `INSTAGRAM_ENABLED=true` y cron horario. El secreto fue guardado por el administrador directamente en Cloudflare y no se leyó su valor. Primera sincronización correcta: 12 publicaciones; galería activada y verificada en la página pública. Se normalizan espacios exteriores del secreto y se distinguen errores de transporte, redirecciones y respuestas no JSON sin revelar datos del proveedor. Renovación del token aún manual.

La conexión lee únicamente la cuenta `ipnchilecuentaoficial` (17841478715977677), con Instagram Login y `instagram_business_basic`. No escribe en Instagram ni consulta mensajes, comentarios o estadísticas.

## Preparación y activación

1. Aplicar `0007_instagram.sql` en D1, primero local y después en la base de producción confirmada. La migración agrega una tabla; no modifica noticias manuales.
2. En Cloudflare, abrir Workers & Pages → `ipn-admin` → Settings → Variables and Secrets → Add. Elegir **Secret**, nombre **INSTAGRAM_ACCESS_TOKEN**, pegar el token directamente allí y guardar. Nunca pegarlo en el chat, Git, una variable VITE_, wrangler.jsonc o una línea de comando.
3. Cambiar `INSTAGRAM_ENABLED` a `true` en la configuración de despliegue. Conservar `INSTAGRAM_API_VERSION` en una versión compatible con Meta (inicialmente v25.0). No se necesita la clave secreta de la app para las consultas con el token ya generado.
4. Compilar y desplegar el Worker y el mantenedor después de comprobar el plan Workers Free y D1. Los scripts de despliegue remoto existentes siguen bloqueados por el requisito de coste cero; no se alteran ni habilitan cargas R2.
5. En Noticias → Instagram automático, pulsar **Actualizar ahora**. Solo tras una consulta correcta, pulsar **Activar galería automática**. La activación hace públicas las publicaciones importadas, también en el inicio según su fecha.

## Funcionamiento

- Cron a los 17 minutos de cada hora. Dos consultas a Meta por ejecución (perfil y hasta 12 medios), únicamente cuando la galería está activada.
- Caché en D1 separada de documentos manuales. No descarga ni almacena imágenes en R2: utiliza las URLs temporales de la CDN de Meta. Los reels muestran miniatura y abren en Instagram; los álbumes muestran portada. No importa historias.
- El título usa la primera línea del texto de Instagram. Las noticias manuales con el mismo enlace tienen prioridad para evitar duplicados.
- El panel permite ocultar la galería. Conserva el último resultado ante un fallo y lo oculta al superar 48 horas sin actualizar, para limitar imágenes caducadas. Una consulta válida sin medios vacía la galería.
- El secreto solo se envía a graph.instagram.com mediante Authorization; nunca sale en respuestas públicas, errores o estado del panel. Las acciones del mantenedor requieren administrador y conservan la protección de origen existente.
- **Renovación del token pendiente de automatizar**: no se puede inferir la duración del token entregado por Meta. Cuando caduque o se revoque, generar otro con lectura básica y reemplazar el secreto en Cloudflare, después actualizar desde el panel. La actualización horaria de publicaciones no renueva el token.

## Verificación

Pruebas locales: `node --test admin/tests/*.test.js`, pruebas del sitio y compilaciones Vite. La conexión real solo queda verificada después de instalar el secreto y realizar la primera sincronización en el entorno desplegado.

Referencia: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/
