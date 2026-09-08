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

- src/router/index.js: rutas y títulos/descripciones de página.
- src/views: páginas institucionales, departamentos, actualidad y contacto.
- src/components/ui: navegación, pie, carrusel y elementos compartidos.
- src/data: iglesias, eventos, comunicados, creencias y galería.
- src/utils: metadatos y ciclo de vida del modal de eventos.
- src/style.css: estilos globales y colores por departamento mediante data-department.
- public: fuentes, iconos y archivos estáticos.

El contenido se mantiene en archivos locales; no hay un panel de administración en este repositorio. Para añadir una página, registre su ruta y sus metadatos. Contacto y Donaciones usan Formspree; el destino se define con FORM_ENDPOINT en cada vista. No envíe solicitudes reales al ejecutar pruebas. La página /privacidad describe los datos transmitidos; debe actualizarse cuando cambien los formularios o los servicios utilizados.

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
