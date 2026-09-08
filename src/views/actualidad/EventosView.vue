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
          <h2>Actividades nacionales</h2>
          <p>
            Revise aquí el calendario anual con encuentros, congresos, conferencias y
            actividades relevantes de nuestra misión.
          </p>
        </aside>
      </div>
    </section>

    <!-- PROXIMO EVENTO -->
    <Transition name="upcoming-notice-fade">
      <section
        v-if="showUpcomingNotice && nextUpcomingEvent"
        class="section-container upcoming-notice-section"
      >
        <div class="upcoming-notice glass-panel--strong">
          <div class="upcoming-notice__icon" aria-hidden="true">
            <font-awesome-icon :icon="['fas', 'calendar-check']" />
          </div>

          <div class="upcoming-notice__content">
            <p class="upcoming-notice__eyebrow">
              {{ nextUpcomingEventCountdown }}
            </p>
            <h2>Se acerca {{ nextUpcomingEvent.title }}</h2>
            <p>
              {{ nextUpcomingEvent.dateLabel }} · {{ nextUpcomingEvent.location }}
            </p>
          </div>

          <div class="upcoming-notice__actions">
            <button type="button" class="btn-primary upcoming-notice__button" @click="openEvent(nextUpcomingEvent)">
              <font-awesome-icon :icon="['fas', 'circle-info']" />
              <span>Ver detalle</span>
            </button>
            <button
              type="button"
              class="upcoming-notice__close"
              aria-label="Ocultar notificación"
              @click="showUpcomingNotice = false"
            >
              &times;
            </button>
          </div>
        </div>
      </section>
    </Transition>

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
          <div ref="eventDialog" class="event-modal__dialog glass-panel--strong"
            role="dialog" aria-modal="true" aria-labelledby="event-modal-title" tabindex="-1">
            <button
              type="button"
              class="event-modal__close"
              aria-label="Cerrar"
              @click="closeEvent"
            >
              &times;
            </button>

            <div class="event-modal__content">
              <p class="section-eyebrow">{{ selectedEvent.month }}</p>
              <h2 id="event-modal-title">{{ selectedEvent.title }}</h2>

              <div class="event-modal__meta">
                <p><strong>Fecha:</strong> {{ selectedEvent.dateLabel }}</p>
                <p><strong>Lugar:</strong> {{ selectedEvent.location }}</p>
                <p><strong>Tipo:</strong> {{ selectedEvent.type }}</p>
                <p>
                  <strong>Estado:</strong> {{ eventStatusLabel(selectedEvent) }}
                </p>
              </div>

              <img v-if="selectedEvent.image" :src="selectedEvent.image" :alt="selectedEvent.title" class="event-modal__poster" />

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
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { monthOrder } from '@/data/events'
import { usePublishedContent, loadPublishedContent } from '@/composables/usePublishedContent'
const { calendar } = usePublishedContent()
import { useRoute } from 'vue-router'
const route = useRoute()
import { createModalController } from '@/utils/modal'

const eventDialog = ref(null)
const modal = createModalController()
onBeforeUnmount(() => modal.deactivate({ restoreFocus: false }))

const selectedEvent = ref(null)
const monthRefs = ref({})
const showUpcomingNotice = ref(true)


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

function parseLocalDate(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const allEvents = computed(() =>
  calendar.value.flatMap((month) => month.events)
)

const nextUpcomingEvent = computed(() => {
  const today = getTodayKey()

  return allEvents.value
    .filter((event) => event.startDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))[0] || null
})

const nextUpcomingEventCountdown = computed(() => {
  if (!nextUpcomingEvent.value) return ''

  const today = parseLocalDate(getTodayKey())
  const eventDate = parseLocalDate(nextUpcomingEvent.value.startDate)
  const diffMs = eventDate.getTime() - today.getTime()
  const days = Math.max(0, Math.ceil(diffMs / 86400000))

  if (days === 0) return 'Hoy es el día'
  if (days === 1) return 'Falta 1 día'
  return `Faltan ${days} días`
})

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

async function openEvent(event) {
  selectedEvent.value = event
  await nextTick()
  if (selectedEvent.value && eventDialog.value) modal.activate(eventDialog.value, closeEvent)
}

function closeEvent() {
  selectedEvent.value = null
  modal.deactivate()
}

onMounted(async () => {
  await loadPublishedContent()
  await nextTick()

  const linkedEvent = allEvents.value.find(event => String(event.id) === route.query.evento)
  if (linkedEvent) {
    await openEvent(linkedEvent)
    return
  }

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
.event-modal__poster { display: block; width: 100%; max-height: 60vh; object-fit: contain; margin: 1.25rem 0; }

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

.upcoming-notice-section {
  margin-top: -1.5rem;
  margin-bottom: 1rem;
}

.upcoming-notice {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.1rem;
  padding: 1.1rem;
  border-radius: var(--radius-lg);
}

.upcoming-notice__icon {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: rgba(var(--theme-secondary-rgb), 0.14);
  border: 1px solid rgba(var(--theme-secondary-rgb), 0.24);
  color: var(--theme-secondary);
  font-size: 1.55rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 10px 24px rgba(0, 0, 0, 0.18);
}

.upcoming-notice__content {
  min-width: 0;
}

.upcoming-notice__eyebrow {
  margin: 0 0 0.25rem;
  color: var(--theme-secondary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.upcoming-notice__content h2 {
  margin: 0 0 0.35rem;
  font-family: var(--font-primary);
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  line-height: 1.2;
}

.upcoming-notice__content p:last-child {
  margin: 0;
  color: var(--theme-text-soft);
  line-height: 1.5;
}

.upcoming-notice__actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.upcoming-notice__button {
  min-height: 44px;
  padding: 0.72rem 1rem;
  white-space: nowrap;
}

.upcoming-notice__close {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 1px solid var(--theme-border-soft);
  background: rgba(255, 255, 255, 0.045);
  color: var(--theme-text);
  font-size: 1.55rem;
  line-height: 1;
  cursor: pointer;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    background var(--transition-base);
}

.upcoming-notice__close:hover,
.upcoming-notice__close:focus-visible {
  transform: translateY(-2px);
  border-color: var(--theme-border-strong);
  background: rgba(255, 255, 255, 0.075);
  outline: none;
}

.upcoming-notice-fade-enter-active,
.upcoming-notice-fade-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.upcoming-notice-fade-enter-from,
.upcoming-notice-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
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

  .upcoming-notice {
    grid-template-columns: auto 1fr;
  }

  .upcoming-notice__actions {
    grid-column: 1 / -1;
    justify-content: flex-start;
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

  .upcoming-notice-section {
    margin-top: -1rem;
  }

  .upcoming-notice {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
  }

  .upcoming-notice__actions {
    width: 100%;
    justify-content: center;
  }

  .upcoming-notice__button {
    flex: 1;
  }
}
</style>
