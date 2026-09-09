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

npm run build genera dist/sitemap.xml con las rutas estáticas indexables, los slugs reales del directorio y los eventos publicados. Sin endpoints configurados se usa el contenido público incluido en src/data. Si VITE_DIRECTORY_API o VITE_CONTENT_API están configurados, el generador consulta esos endpoints públicos y falla si no puede obtenerlos: nunca consulta el API administrativo ni incluye borradores. Al publicar o retirar contenido remoto hay que volver a ejecutar la compilación de Netlify para actualizar el sitemap. No se usa la fecha del evento ni la fecha de compilación como lastmod.

public/robots.txt permite el rastreo público. public/_redirects configura el fallback de Netlify sin forzarlo sobre archivos existentes: robots.txt y sitemap.xml se sirven como archivos reales. El contenido privado sigue dependiendo de los controles de Access y del Worker, nunca de robots.txt.

Publicación: revisar pruebas y build, subir a main para activar Netlify, comprobar HTTP y contenido de robots.txt/sitemap.xml, abrir rutas directamente y comprobar metadatos tras navegar. Después enviar https://ipnchile.cl/sitemap.xml en Search Console y solicitar una vez la indexación de la portada actualizada. No se garantizan posiciones. Los rastreadores sociales que no ejecutan JavaScript seguirán viendo los metadatos de portada del HTML base; esta integración conserva la SPA y no requiere SSR.

Mientras el Worker no esté desplegado, deje VITE_CONTENT_API y VITE_DIRECTORY_API sin configurar: la web utiliza los datos públicos incluidos y no intenta consultar el servicio pendiente. Al habilitarlo, configure ambos endpoints públicos en Netlify y vuelva a compilar.

## Identidad estructurada del sitio

src/utils/structuredData.js define un único grafo JSON-LD WebSite/Organization con identificadores estables, nombres oficiales, logo y perfiles sociales existentes. vite.config.js lo incluye en el HTML inicial de dist/index.html (también al desarrollar). App.vue reutiliza el bloque en portada, lo retira en otras rutas y lo restaura al regresar. La SPA sirve el mismo HTML base al abrir otras rutas directamente; ese HTML contiene la identidad global hasta que Vue resuelve la ruta. No contiene datos particulares de iglesias o eventos y no requiere SSR.

El logo es el isotipo institucional existente en /isotipo-ipn.png; no se ha rediseñado. Los datos no incluyen domicilios, teléfonos ni fechas adicionales. Se conservan los metadatos, canonical y sitemap anteriores.

Referencias oficiales: https://developers.google.com/search/docs/appearance/site-names y https://developers.google.com/search/docs/appearance/structured-data/organization. La coherencia de identidad no garantiza que Google deje de corregir una consulta ni posiciones en resultados.

Acción manual pendiente del propietario: usar “IPN Chile — Iglesia Pentecostal Nazareth” y enlazar https://ipnchile.cl/ en las biografías oficiales de Facebook, Instagram y YouTube. Esta implementación no modifica cuentas externas.
