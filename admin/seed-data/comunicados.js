import { septemberMedia } from './septemberMedia.js'

// src/data/comunicados.js

const MEDIA_BASE = 'https://media.ipnchile.cl/eventos/comunicados'

export const comunicados = [
  {
    id: 'conferencias-nacimiento-2026',
    title: 'Conferencias Semestrales 2026 · IPN Nacimiento',
    description: 'Los días 25, 26 y 27 de septiembre se realizarán nuestras Conferencias Semestrales en IPN Nacimiento.',
    date: '2026-09-07',
    image: septemberMedia.conferencePoster,
    thumbnail: septemberMedia.conferenceThumbnail,
    paragraphs: [
      'Compartimos el afiche oficial de las Conferencias Semestrales 2026, que tendrán lugar los días 25, 26 y 27 de septiembre en IPN Nacimiento.',
      'Invitamos a nuestra comunidad a acompañar en oración este encuentro de comunión y fortalecimiento ministerial. Consulte la información del calendario nacional para conocer los datos del evento.'
    ],
    eventLink: '/actualidad/eventos?evento=5',
  },
  {
    id: 'mes-biblia-patria-2026',
    title: 'Septiembre: Mes de la Biblia y de la Patria',
    description: 'Un mes para acercarnos a la Palabra de Dios y dar gracias por nuestro país. Conozca por qué celebramos el Mes de la Biblia.',
    date: '2026-09-07',
    image: septemberMedia.biblePoster,
    thumbnail: septemberMedia.bibleThumbnail,
    paragraphs: [
      'En la tradición evangélica de habla hispana, septiembre recuerda la publicación de la Biblia del Oso en 1569, traducida por Casiodoro de Reina. Su revisión por Cipriano de Valera en 1602 forma parte de la historia de la versión Reina-Valera.',
      'El Mes de la Biblia nos invita a leer, estudiar y compartir las Escrituras, y a poner en práctica sus enseñanzas en nuestra vida diaria. Podemos dedicar tiempo a la lectura personal y en familia, a la oración y a la reflexión en comunidad.',
      'En este mes de la Patria, también damos gracias a Dios por Chile y oramos por sus familias, sus comunidades y quienes sirven a nuestro país. Que la Palabra de Dios ilumine nuestro caminar y nos impulse a amar y servir al prójimo.'
    ],
    source: { label: 'Sociedad Bíblica Chilena: por qué septiembre es el Mes de la Biblia', url: 'https://www.sbch.cl/sitio/por-que-septiembre-es-el-mes-de-la-biblia/' },
  },
  {
    id: 'comunicado-001',
    title: 'Comunicado Oficial',
    description: 'Comunicado oficial de la Iglesia Pentecostal Nazareth.',
    date: '2026-04-26',
    image: `${MEDIA_BASE}/comunicadoOficial-001.webp`
  }
]