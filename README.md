# IPN Chile — sitio web

Sitio institucional en Vue 3 y Vite. Incluye información de la misión, departamentos, directorio de iglesias con Leaflet, noticias, calendario y formularios de contacto y donaciones.

## Desarrollo

Requiere Node.js 20.19+ o 22.12+ compatible con Vite 7 y npm.

    npm ci
    npm run dev

## Validación

    npm run lint
    npm test
    npm run build
    npm run check

El script lint valida sintaxis JavaScript y compila los componentes Vue; no aplica reglas de estilo de ESLint. Las pruebas de Node verifican el comportamiento del modal y los metadatos. check ejecuta las tres comprobaciones. Para revisar el resultado de producción: npm run preview.

## Estructura y contenido

- src/router/routes.js: rutas y títulos/descripciones de página.
- src/views: páginas institucionales, departamentos, actualidad y contacto.
- src/components/ui: navegación, pie, carrusel y elementos compartidos.
- src/data: iglesias, eventos, comunicados, creencias y galería.
- src/utils: metadatos y ciclo de vida del modal de eventos.
- src/style.css: estilos globales y colores por departamento mediante data-department.
- public: fuentes, iconos y archivos estáticos.

El contenido público inicial se mantiene en archivos locales; el panel separado se encuentra en admin/. Para añadir una página, registre su ruta y sus metadatos. Contacto y Donaciones usan Formspree; el destino se define con FORM_ENDPOINT en cada vista. No envíe solicitudes reales al ejecutar pruebas. La página /privacidad describe los datos transmitidos; debe actualizarse cuando cambien los formularios o los servicios utilizados.

## Publicación

npm run build genera dist. Configure el alojamiento para devolver index.html al acceder a las rutas de la aplicación, porque se utiliza createWebHistory. La configuración actual presupone publicación en la raíz del dominio.

Los títulos y descripciones cambian al navegar en el cliente; index.html incluye metadatos generales. Para vistas previas sociales específicas de cada URL en rastreadores que no ejecutan JavaScript, hace falta prerenderizado o renderizado en servidor.

## Comprobación manual

- Abrir un evento con teclado, recorrer sus controles con Tab y Mayús+Tab, y cerrar con Escape: el foco debe volver al botón de origen.
- Salir con Atrás del navegador mientras el modal está abierto: la página de destino debe permitir desplazamiento e interacción.
- Navegar entre páginas y comprobar título y descripción; después de una ruta inexistente, una ruta válida debe recuperar index, follow.
- Abrir Privacidad desde el pie y desde ambos formularios, también en móvil.

## Septiembre, comunicados y banner

src/config/seasonal.js centraliza la configuración. mode admite auto (solo septiembre, cada año, hora de America/Santiago), on u off. La franja de banderas se actualiza cada minuto y al regresar a la pestaña. showConferenceBanner controla el lienzo principal independientemente del mes; al desactivarlo vuelve el carrusel institucional.

Las imágenes se muestran completas, sin filtros ni recortes. Los archivos WebP de public/media/septiembre-2026 incluyen miniaturas, afiches y tres resoluciones del banner. Se redujo proporcionalmente la resolución de impresión y se codificó sin pérdida adicional.

Para usar Cloudflare R2 (bucket ipn-media), suba los siete WebP a eventos/septiembre-2026/ conservando los nombres. Después configure mediaBaseUrl como https://media.ipnchile.cl/eventos/septiembre-2026 y vuelva a compilar. Hasta entonces se sirven los archivos locales; la dirección del panel dash.cloudflare.com no es una URL pública de imagen.

Los dos comunicados están en src/data/comunicados.js. El texto histórico del Mes de la Biblia enlaza su fuente, la Sociedad Bíblica Chilena. El evento de conferencia conserva el identificador 5, sus fechas y ubicación del calendario existente. /actualidad/eventos?evento=5 abre su detalle directamente.


## Panel de administración

El directorio `admin/` contiene el panel Vue 3, el Worker protegido por Cloudflare Access, migraciones D1 y pruebas de seguridad. Consulte [la guía del panel](admin/README.md) para instalación, uso y publicación. El sitio público consulta solo contenido publicado; admite configurar `VITE_CONTENT_API`. El panel y el sitio se despliegan por separado. No hay despliegue automático asociado a estos cambios locales.

## SEO y descubrimiento de páginas

Las rutas y sus metadatos se declaran en src/router/routes.js, compartido por Vue Router y el generador del sitemap. src/utils/seo.js resuelve títulos, descripciones, canonical y Open Graph/Twitter; App.vue los sincroniza con la ruta y el contenido público, incluidas iglesias y eventos. Los parámetros de seguimiento no forman parte del canonical; evento identifica un evento publicado. Las páginas inexistentes usan noindex sin canonical.

El sitemap se sirve dinámicamente desde el Worker mediante /sitemap.xml. Incluye rutas estáticas y eventos e iglesias publicados en D1. Publicar o retirar contenido actualiza el sitemap sin compilaciones. No se inventan fechas lastmod.

public/robots.txt permite el rastreo público. public/_redirects configura el fallback de Netlify sin forzarlo sobre archivos existentes: robots.txt y sitemap.xml se sirven como archivos reales. El contenido privado sigue dependiendo de los controles de Access y del Worker, nunca de robots.txt.

Publicación: revisar pruebas y build, subir a main para activar Netlify, comprobar HTTP y contenido de robots.txt/sitemap.xml, abrir rutas directamente y comprobar metadatos tras navegar. Después enviar https://ipnchile.cl/sitemap.xml en Search Console y solicitar una vez la indexación de la portada actualizada. No se garantizan posiciones. Los rastreadores sociales que no ejecutan JavaScript seguirán viendo los metadatos de portada del HTML base; esta integración conserva la SPA y no requiere SSR.

La web consulta /public/content y /public/directory. En desarrollo los sirve el adaptador local; en Netlify, public/_redirects los envía al Worker. Desplegar el Worker y aplicar sus migraciones antes del despliegue inicial de la web. Las variables VITE_CONTENT_API y VITE_DIRECTORY_API solo son necesarias para cambiar estos destinos.

## Identidad estructurada del sitio

src/utils/structuredData.js define un único grafo JSON-LD WebSite/Organization con identificadores estables, nombres oficiales, logo y perfiles sociales existentes. vite.config.js lo incluye en el HTML inicial de dist/index.html (también al desarrollar). App.vue reutiliza el bloque en portada, lo retira en otras rutas y lo restaura al regresar. La SPA sirve el mismo HTML base al abrir otras rutas directamente; ese HTML contiene la identidad global hasta que Vue resuelve la ruta. No contiene datos particulares de iglesias o eventos y no requiere SSR.

El logo es el isotipo institucional existente en /isotipo-ipn.png; no se ha rediseñado. Los datos no incluyen domicilios, teléfonos ni fechas adicionales. Se conservan los metadatos, canonical y sitemap anteriores.

Referencias oficiales: https://developers.google.com/search/docs/appearance/site-names y https://developers.google.com/search/docs/appearance/structured-data/organization. La coherencia de identidad no garantiza que Google deje de corregir una consulta ni posiciones en resultados.

Acción manual pendiente del propietario: usar “IPN Chile — Iglesia Pentecostal Nazareth” y enlazar https://ipnchile.cl/ en las biografías oficiales de Facebook, Instagram y YouTube. Esta implementación no modifica cuentas externas.

## Video de conferencias

El modal global abre la previa VEPseBfwQZE tras consultar el contenido publicado (máximo 5 segundos si falla la API). Cada video/modo abre una vez por carga del sitio; navegar no lo reabre. Cerrar elimina el iframe y detiene el audio. El botón permanece en todas las páginas. Los cambios publicados se consultan cada minuto y al volver a la pestaña. Se conserva el último contenido válido ante fallos de red.

En el mantenedor: Banner de inicio → Video de conferencias. Seleccione previa, en vivo o desactivado; ingrese los enlaces; guarde y publique. La configuración es independiente de la casilla Mostrar banner. Retirar toda la publicación del banner también oculta el video cuando responde la API. Las publicaciones antiguas sin configuración usan la previa incluida. No hay programación ni detección automática del estado del directo: al finalizar debe cambiar el modo y publicar.

El autoplay se solicita con sonido, con controles y enlace alternativo a YouTube. El navegador puede exigir una pulsación; el canal debe permitir inserción. Referencia: https://developers.google.com/youtube/player_parameters. El reproductor se carga desde youtube-nocookie.com.

Desplegar sitio y mantenedor juntos para habilitar edición. No requiere migración D1 ni claves de YouTube.

## Contenido sin despliegues

Biblioteca de videos tiene documentos publicados en D1, con enlace YouTube validado, título, descripción, categoría, orden y botón opcional. Las migraciones 0005/0006 conservan documentos e historial e importan los dos videos existentes una vez. Se mantienen los datos locales iniciales como respaldo si la API no responde; una biblioteca publicada vacía sí se muestra vacía. El video de entrada es independiente.

El sitemap no usa un archivo de dist ni solicita recompilaciones. /sitemap.xml se reescribe hacia /public/sitemap.xml del Worker y lee solo publicaciones actuales. Retirar eventos e iglesias los quita del siguiente sitemap. Los videos se muestran en la página de Noticias, sin inventar páginas individuales.

La puesta en marcha exige aplicar las migraciones D1, desplegar el Worker/panel y desplegar una vez la web con las reglas de proxy. Después publicar contenidos no llama a Netlify ni a un build hook. Solo cambiar código/diseño requiere despliegue. No se ha hecho push, migración remota ni despliegue desde esta tarea.

Referencias: https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/ y https://developers.cloudflare.com/d1/sql-api/foreign-keys/.
