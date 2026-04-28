// src/data/jumixGallery.js

const MEDIA_BASE = 'https://media.ipnchile.cl/eventos/jumix-2026'

export const galleryBlocks = [
    {
        id: 'bloque1',
        title: 'Bloque 1 - Jumix Nacional 2026',
        description: 'Registro fotográfico del primer bloque del Jumix Nacional 2026.',
        folder: 'bloque1',
        filePrefix: 'jumix-2026-bloque1',
        total: 58
    },
    {
        id: 'bloque2',
        title: 'Bloque 2 - Jumix Nacional 2026',
        description: 'Registro fotográfico del segundo bloque del Jumix Nacional 2026.',
        folder: 'bloque2',
        filePrefix: 'jumix-2026-bloque2',
        total: 40
    }

    // Cuando subas más carpetas, agrega aquí:
    /*
    ,
    {
      id: 'clausura',
      title: 'Servicio de Clausura - Jumix Nacional 2026',
      description: 'Registro fotográfico del servicio de clausura del Jumix Nacional 2026.',
      folder: 'clausura',
      filePrefix: 'clausura',
      total: 35
    },
    {
      id: 'evangelismo',
      title: 'Evangelismo en las calles de Talagante',
      description: 'Registro fotográfico de la jornada de evangelismo del Jumix Nacional 2026.',
      folder: 'evangelismo',
      filePrefix: 'evangelismo',
      total: 30
    },
    {
      id: 'servicioGeneral',
      title: 'Servicio General - Jumix Nacional 2026',
      description: 'Registro fotográfico del servicio general del Jumix Nacional 2026.',
      folder: 'servicioGeneral',
      filePrefix: 'servicio-general',
      total: 45
    }
    */
]

export const galleryPhotos = galleryBlocks.flatMap((block) =>
    Array.from({ length: block.total }, (_, index) => {
        const number = String(index + 1).padStart(3, '0')

        return {
            id: `${block.id}-${number}`,
            blockId: block.id,
            src: `${MEDIA_BASE}/${block.folder}/${block.filePrefix}-${number}.webp`,
            title: block.title,
            description: block.description
        }
    })
)