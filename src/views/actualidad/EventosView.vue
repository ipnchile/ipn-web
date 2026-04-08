<template>
  <main class="events-page">
    <!-- HERO -->
    <section class="section-container section-block events-hero">
      <div class="glass-panel events-hero__panel">
        <div class="events-hero__copy">
          <p class="section-eyebrow">Actualidad</p>
          <h1>Eventos</h1>
          <p class="events-hero__text">
            Conozca las actividades, campañas, congresos, reuniones especiales y eventos
            próximos de la Iglesia Pentecostal Nazareth en sus diferentes áreas y departamentos.
          </p>
        </div>

        <aside class="card events-hero__highlight">
          <p class="events-hero__label">Calendario nacional</p>
          <h2>Actividades Nacionales 2026</h2>
          <p>
            Revise aquí el calendario anual con encuentros, congresos, conferencias y
            actividades relevantes de nuestra misión.
          </p>
        </aside>
      </div>
    </section>

    <!-- CALENDARIO -->
    <section class="section-container section-block">
      <div class="section-heading">
        <p class="section-eyebrow">Calendario anual</p>
        <h2 class="section-title">Actividades por mes</h2>
        <p class="section-description">
          Seleccione una actividad para ver más información. Cada evento se identifica
          automáticamente como próximo, en curso o realizado según su fecha.
        </p>
      </div>

      <div class="annual-calendar">
        <article
          v-for="month in calendar"
          :key="month.month"
          :ref="setMonthRef(month.month)"
          class="annual-calendar__row card"
          :class="{ 'annual-calendar__row--current': month.month === currentMonthName }"
        >
          <div class="annual-calendar__month">
            <span>{{ month.month }}</span>
          </div>

          <div class="annual-calendar__content">
            <template v-if="month.events.length">
              <button
                v-for="event in month.events"
                :key="event.id"
                type="button"
                class="annual-calendar__event"
                :class="eventStateClass(event)"
                @click="openEvent(event)"
              >
                <div class="annual-calendar__event-date">
                  <span>{{ event.dateLabel }}</span>

                  <div
                    class="annual-calendar__event-status"
                    :class="eventStatusBadgeClass(event)"
                  >
                    <font-awesome-icon :icon="eventStatusIcon(event)" />
                    <span>{{ eventStatusLabel(event) }}</span>
                  </div>
                </div>

                <div class="annual-calendar__event-body">
                  <h3>
                    {{ event.title }}
                    <span
                      class="annual-calendar__event-check"
                      :class="eventStatusTextClass(event)"
                    >
                      <font-awesome-icon :icon="eventStatusIcon(event)" />
                    </span>
                  </h3>
                  <p>{{ event.location }}</p>
                </div>
              </button>
            </template>

            <div v-else class="annual-calendar__empty">
              Sin actividades nacionales registradas
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- MODAL -->
    <Teleport to="body">
      <Transition name="event-modal-fade">
        <div
          v-if="selectedEvent"
          class="event-modal"
          @click.self="closeEvent"
        >
          <div class="event-modal__dialog glass-panel--strong">
            <button
              type="button"
              class="event-modal__close"
              aria-label="Cerrar"
              @click="closeEvent"
            >
              ×
            </button>

            <div class="event-modal__content">
              <p class="section-eyebrow">{{ selectedEvent.month }}</p>
              <h2>{{ selectedEvent.title }}</h2>

              <div class="event-modal__meta">
                <p><strong>Fecha:</strong> {{ selectedEvent.dateLabel }}</p>
                <p><strong>Lugar:</strong> {{ selectedEvent.location }}</p>
                <p><strong>Tipo:</strong> {{ selectedEvent.type }}</p>
                <p>
                  <strong>Estado:</strong> {{ eventStatusLabel(selectedEvent) }}
                </p>
              </div>

              <p class="event-modal__description">
                {{ selectedEvent.description }}
              </p>

              <div v-if="selectedEvent.notes" class="event-modal__notes">
                <h3>Observaciones</h3>
                <p>{{ selectedEvent.notes }}</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'

const selectedEvent = ref(null)
const monthRefs = ref({})

const calendar = [
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
        title: 'Conferencias Semetrales Pastores y Pastoras 2026',
        location: 'IPN Nacimiento',
        type: 'Conferencia',
        description:
          'Encuentro nacional orientado a pastores y pastoras, con énfasis en comunión, dirección y fortalecimiento ministerial.',
        notes: 'El texto original del calendario indica “Semetrales”.'
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

const monthOrder = [
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

const currentMonthName = monthOrder[new Date().getMonth()]

function setMonthRef(month) {
  return (el) => {
    if (el) {
      monthRefs.value[month] = el
    }
  }
}

function getTodayKey() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getEventStatus(event) {
  const today = getTodayKey()

  if (today < event.startDate) return 'upcoming'
  if (today > event.endDate) return 'completed'
  return 'ongoing'
}

function eventStatusLabel(event) {
  const status = getEventStatus(event)

  if (status === 'completed') return 'Realizado'
  if (status === 'ongoing') return 'En curso'
  return 'Próximo'
}

function eventStatusIcon(event) {
  const status = getEventStatus(event)

  if (status === 'completed') return ['fas', 'check']
  if (status === 'ongoing') return ['fas', 'clock']
  return ['fas', 'calendar-days']
}

function eventStateClass(event) {
  const status = getEventStatus(event)

  return {
    'annual-calendar__event--done': status === 'completed',
    'annual-calendar__event--ongoing': status === 'ongoing',
    'annual-calendar__event--upcoming': status === 'upcoming'
  }
}

function eventStatusBadgeClass(event) {
  const status = getEventStatus(event)

  return {
    'annual-calendar__event-status--done': status === 'completed',
    'annual-calendar__event-status--ongoing': status === 'ongoing',
    'annual-calendar__event-status--upcoming': status === 'upcoming'
  }
}

function eventStatusTextClass(event) {
  const status = getEventStatus(event)

  return {
    'annual-calendar__event-check--done': status === 'completed',
    'annual-calendar__event-check--ongoing': status === 'ongoing',
    'annual-calendar__event-check--upcoming': status === 'upcoming'
  }
}

function openEvent(event) {
  selectedEvent.value = event
  document.body.style.overflow = 'hidden'
}

function closeEvent() {
  selectedEvent.value = null
  document.body.style.overflow = ''
}

onMounted(async () => {
  await nextTick()

  const currentMonthElement = monthRefs.value[currentMonthName]

  if (currentMonthElement) {
    currentMonthElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
})
</script>

<style scoped>
.events-page {
  min-height: 100vh;
  padding-bottom: 4rem;
}

.events-hero {
  padding-top: 1rem;
}

.events-hero__panel {
  display: grid;
  grid-template-columns: 1.45fr 0.95fr;
  gap: 1.5rem;
  padding: 2rem;
}

.events-hero__copy h1 {
  margin-bottom: 1rem;
  font-size: clamp(2.6rem, 5vw, 4.8rem);
  line-height: 1.02;
}

.events-hero__text {
  max-width: 65ch;
  margin-bottom: 0;
  color: var(--theme-text-soft);
  font-size: 1.06rem;
  line-height: 1.8;
}

.events-hero__highlight {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.events-hero__label {
  margin: 0 0 0.5rem;
  color: var(--theme-secondary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.events-hero__highlight h2 {
  margin-bottom: 0.8rem;
}

.events-hero__highlight p:last-child {
  margin-bottom: 0;
  color: var(--theme-text-soft);
}

.annual-calendar {
  display: grid;
  gap: 1rem;
}

.annual-calendar__row {
  display: grid;
  grid-template-columns: 180px 1fr;
  overflow: hidden;
  scroll-margin-top: 120px;
}

.annual-calendar__row--current {
  box-shadow:
    0 0 0 1px rgba(var(--theme-secondary-rgb), 0.22),
    0 10px 26px rgba(0, 0, 0, 0.16);
}

.annual-calendar__month {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  background:
    linear-gradient(180deg, rgba(var(--theme-primary-rgb), 0.95), rgba(var(--theme-primary-rgb), 0.8));
  border-right: 1px solid var(--theme-border-soft);
  text-align: center;
}

.annual-calendar__month span {
  color: var(--theme-text);
  font-weight: 800;
  letter-spacing: 0.08em;
}

.annual-calendar__content {
  padding: 0;
  display: grid;
  gap: 0;
}

.annual-calendar__event {
  display: grid;
  grid-template-columns: 280px 1fr;
  width: 100%;
  border: 0;
  border-bottom: 1px solid rgba(var(--theme-secondary-rgb), 0.12);
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    background var(--transition-base),
    transform var(--transition-base);
}

.annual-calendar__event:hover {
  background: rgba(255, 255, 255, 0.035);
}

.annual-calendar__event:last-child {
  border-bottom: 0;
}

.annual-calendar__event--done {
  background: rgba(68, 174, 110, 0.08);
}

.annual-calendar__event--done:hover {
  background: rgba(68, 174, 110, 0.12);
}

.annual-calendar__event--ongoing {
  background: rgba(228, 172, 66, 0.10);
}

.annual-calendar__event--ongoing:hover {
  background: rgba(228, 172, 66, 0.16);
}

.annual-calendar__event--upcoming {
  background: transparent;
}

.annual-calendar__event-date {
  padding: 1rem 1.1rem;
  font-weight: 700;
  color: var(--theme-secondary);
  border-right: 1px solid rgba(var(--theme-secondary-rgb), 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.annual-calendar__event-status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  width: fit-content;
  padding: 0.28rem 0.65rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.03em;
}

.annual-calendar__event-status--done {
  background: rgba(68, 174, 110, 0.16);
  color: #8ce3aa;
}

.annual-calendar__event-status--ongoing {
  background: rgba(228, 172, 66, 0.18);
  color: #ffd784;
}

.annual-calendar__event-status--upcoming {
  background: rgba(var(--theme-secondary-rgb), 0.16);
  color: var(--theme-secondary);
}

.annual-calendar__event-body {
  padding: 1rem 1.1rem;
}

.annual-calendar__event-body h3 {
  margin-bottom: 0.35rem;
  font-size: 1.06rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.annual-calendar__event-check {
  font-size: 0.92rem;
}

.annual-calendar__event-check--done {
  color: #8ce3aa;
}

.annual-calendar__event-check--ongoing {
  color: #ffd784;
}

.annual-calendar__event-check--upcoming {
  color: var(--theme-secondary);
}

.annual-calendar__event-body p {
  margin: 0;
  color: var(--theme-text-soft);
}

.annual-calendar__empty {
  padding: 1rem 1.1rem;
  color: var(--theme-text-soft);
  font-style: italic;
}

.event-modal {
  position: fixed;
  inset: 0;
  z-index: 2500;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.event-modal__dialog {
  width: min(760px, 100%);
  max-height: 90vh;
  overflow: auto;
  position: relative;
}

.event-modal__close {
  position: sticky;
  top: 1rem;
  margin-left: auto;
  margin-right: 1rem;
  margin-top: 1rem;
  z-index: 2;
  width: 46px;
  height: 46px;
  border: 1px solid var(--theme-border-soft);
  border-radius: 50%;
  background: rgba(var(--theme-bg-rgb), 0.9);
  color: var(--theme-text);
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
}

.event-modal__content {
  padding: 1rem 1.5rem 2rem;
}

.event-modal__content h2 {
  margin-bottom: 1rem;
  font-size: clamp(1.8rem, 3vw, 2.7rem);
}

.event-modal__meta {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
}

.event-modal__meta p {
  margin: 0;
  color: var(--theme-text-soft);
}

.event-modal__description {
  margin-bottom: 1rem;
  color: var(--theme-text-soft);
  line-height: 1.85;
}

.event-modal__notes h3 {
  margin-bottom: 0.4rem;
  font-size: 1.1rem;
}

.event-modal__notes p {
  margin: 0;
  color: var(--theme-text-soft);
}

.event-modal-fade-enter-active,
.event-modal-fade-leave-active {
  transition: opacity 0.28s ease;
}

.event-modal-fade-enter-from,
.event-modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 980px) {
  .events-hero__panel,
  .annual-calendar__row {
    grid-template-columns: 1fr;
  }

  .annual-calendar__month {
    border-right: 0;
    border-bottom: 1px solid var(--theme-border-soft);
  }

  .annual-calendar__event {
    grid-template-columns: 1fr;
  }

  .annual-calendar__event-date {
    border-right: 0;
    border-bottom: 1px solid rgba(var(--theme-secondary-rgb), 0.1);
  }
}

@media (max-width: 640px) {
  .events-page {
    padding-bottom: 3rem;
  }

  .events-hero__panel,
  .event-modal__content {
    padding: 1.25rem;
  }
}
</style>
