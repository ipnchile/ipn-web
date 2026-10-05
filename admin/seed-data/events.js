import { septemberMedia } from './septemberMedia.js'

export const calendar = [
  {
    month: 'ENERO',
    events: [
      {
        id: 1,
        month: 'ENERO',
        dateLabel: '10/01/2026',
        startDate: '2026-01-10',
        endDate: '2026-01-10',
        title: 'Convención Nacional JUMIX',
        location: 'IPN Putú',
        type: 'Congreso / Convención',
        description:
          'Actividad nacional correspondiente a la Convención Nacional JUMIX, programada para el mes de enero.',
        notes: ''
      }
    ]
  },
  {
    month: 'FEBRERO',
    events: [
      {
        id: 2,
        month: 'FEBRERO',
        dateLabel: '06, 07 y 08 de febrero de 2026',
        startDate: '2026-02-06',
        endDate: '2026-02-08',
        title: 'Conferencia Anual de Pastores, Pastoras y Delegados',
        location: 'Chillán',
        type: 'Conferencia',
        description:
          'Encuentro anual orientado a pastores, pastoras y delegados, enfocado en comunión, coordinación y fortalecimiento ministerial.',
        notes: ''
      }
    ]
  },
  {
    month: 'MARZO',
    events: []
  },
  {
    month: 'ABRIL',
    events: [
      {
        id: 3,
        month: 'ABRIL',
        dateLabel: '03 y 04 de abril de 2026',
        startDate: '2026-04-03',
        endDate: '2026-04-04',
        title: 'Congreso Nacional JUMIX',
        location: 'IPN Talagante - La Vid',
        type: 'Congreso',
        description:
          'Congreso nacional juvenil orientado a fortalecer la vida espiritual, la comunión y el compromiso de la juventud cristiana.',
        notes: ''
      }
    ]
  },
  {
    month: 'MAYO',
    events: []
  },
  {
    month: 'JUNIO',
    events: []
  },
  {
    month: 'JULIO',
    events: [
      {
        id: 4,
        month: 'JULIO',
        dateLabel: '04/07/2026',
        startDate: '2026-07-04',
        endDate: '2026-07-04',
        title: 'Cierre 1er semestre SEM',
        location: 'Aurora, Talca',
        type: 'Cierre semestral',
        description:
          'Actividad correspondiente al cierre del primer semestre del SEM.',
        notes: ''
      }
    ]
  },
  {
    month: 'AGOSTO',
    events: []
  },
  {
    month: 'SEPTIEMBRE',
    events: [
      {
        id: 5,
        month: 'SEPTIEMBRE',
        dateLabel: '25, 26 y 27 de septiembre de 2026',
        startDate: '2026-09-25',
        endDate: '2026-09-27',
        title: 'Conferencias Semestrales Pastores y Pastoras 2026',
        image: septemberMedia.conferencePoster,
        location: 'IPN Nacimiento',
        type: 'Conferencia',
        description:
          'Encuentro nacional orientado a pastores y pastoras, con énfasis en comunión, dirección y fortalecimiento ministerial.',
        notes: ''
      }
    ]
  },
  {
    month: 'OCTUBRE',
    events: [
      {
        id: 6,
        month: 'OCTUBRE',
        dateLabel: '23 y 24 de octubre de 2026',
        startDate: '2026-10-23',
        endDate: '2026-10-24',
        title: 'Congreso Nacional de Dorcas',
        location: 'IPN El Monte',
        type: 'Congreso',
        description:
          'Congreso nacional del Departamento Dorcas, enfocado en comunión, servicio y edificación espiritual.',
        notes: ''
      }
    ]
  },
  {
    month: 'NOVIEMBRE',
    events: [
      {
        id: 7,
        month: 'NOVIEMBRE',
        dateLabel: '07/11/2026',
        startDate: '2026-11-07',
        endDate: '2026-11-07',
        title: 'Cierre 2do semestre SEM y Graduación 1a Generación',
        location: 'Aurora, Talca',
        type: 'Cierre / Graduación',
        description:
          'Actividad de cierre del segundo semestre del SEM, incluyendo la graduación de la primera generación.',
        notes: ''
      },
      {
        id: 8,
        month: 'NOVIEMBRE',
        dateLabel: '21 y 22 de noviembre de 2026',
        startDate: '2026-11-21',
        endDate: '2026-11-22',
        title: '3er Congreso Nacional Varones',
        location: 'IPN Quilicura',
        type: 'Congreso',
        description:
          'Congreso nacional del Departamento de Varones, enfocado en comunión, formación y servicio cristiano.',
        notes: ''
      }
    ]
  },
  {
    month: 'DICIEMBRE',
    events: [
      {
        id: 9,
        month: 'DICIEMBRE',
        dateLabel: '1er fin de semana de diciembre de 2026',
        startDate: '2026-12-05',
        endDate: '2026-12-06',
        title: 'Encuentro de Matrimonios',
        location: 'Lugar por confirmar',
        type: 'Encuentro',
        description:
          'Encuentro nacional orientado a matrimonios, programado para el primer fin de semana de diciembre.',
        notes: 'El lugar se encuentra pendiente de confirmación.'
      }
    ]
  }
]

export const monthOrder = [
  'ENERO',
  'FEBRERO',
  'MARZO',
  'ABRIL',
  'MAYO',
  'JUNIO',
  'JULIO',
  'AGOSTO',
  'SEPTIEMBRE',
  'OCTUBRE',
  'NOVIEMBRE',
  'DICIEMBRE'
]

export const allEvents = calendar.flatMap((month) => month.events)
