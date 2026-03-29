<template>
  <main class="news-page">
    <!-- HERO -->
    <section class="section-container section-block news-hero">
      <div class="glass-panel news-hero__panel">
        <div class="news-hero__copy">
          <p class="section-eyebrow">Actualidad</p>
          <h1>Noticias</h1>
          <p class="news-hero__text">
            Manténgase informado sobre comunicados oficiales, avances ministeriales,
            anuncios institucionales, condolencias y noticias cristianas relevantes
            para nuestra misión.
          </p>
        </div>

        <aside class="card news-hero__highlight">
          <p class="news-hero__label">Sección informativa</p>
          <h2>Información para la iglesia y la misión</h2>
          <p>
            Este espacio reúne avisos internos y noticias externas de interés,
            permitiendo mantener una comunicación clara, ordenada y oportuna.
          </p>
        </aside>
      </div>
    </section>

    <!-- FILTROS -->
    <section class="section-container news-toolbar">
      <div class="news-toolbar__inner card">
        <button
          v-for="filter in filters"
          :key="filter.value"
          type="button"
          class="news-filter"
          :class="{ 'news-filter--active': activeFilter === filter.value }"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>
    </section>

    <!-- DESTACADA -->
    <section
      v-if="featuredNews"
      class="section-container section-block news-featured"
    >
      <article class="glass-panel news-featured__card">
        <div class="news-featured__media">
          <img
            :src="featuredNews.image"
            :alt="featuredNews.title"
            class="news-featured__image"
          />
        </div>

        <div class="news-featured__content">
          <p class="section-eyebrow">{{ featuredNews.category }}</p>
          <h2>{{ featuredNews.title }}</h2>
          <p class="news-featured__meta">
            {{ featuredNews.date }} · {{ featuredNews.source }}
          </p>
          <p class="news-featured__summary">
            {{ featuredNews.summary }}
          </p>

          <div class="news-featured__actions">
            <button
              v-if="featuredNews.type === 'internal'"
              type="button"
              class="btn-primary"
              @click="openNews(featuredNews)"
            >
              Ver aviso completo
            </button>

            <a
              v-else
              :href="featuredNews.url"
              class="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leer noticia
            </a>
          </div>
        </div>
      </article>
    </section>

    <!-- GRID -->
    <section class="section-container section-block">
      <div class="section-heading">
        <p class="section-eyebrow">Publicaciones</p>
        <h2 class="section-title">Últimas noticias y comunicados</h2>
        <p class="section-description">
          Revise aquí los avisos oficiales, notas informativas y publicaciones
          destacadas relacionadas con nuestra misión.
        </p>
      </div>

      <div v-if="filteredNews.length" class="news-grid">
        <article
          v-for="item in filteredNews"
          :key="item.id"
          class="news-card card"
        >
          <div class="news-card__media">
            <img :src="item.image" :alt="item.title" class="news-card__image" />
            <span class="news-card__badge chip">{{ item.category }}</span>
          </div>

          <div class="news-card__body">
            <p class="news-card__meta">{{ item.date }} · {{ item.source }}</p>
            <h3>{{ item.title }}</h3>
            <p class="news-card__summary">{{ item.summary }}</p>

            <div class="news-card__actions">
              <button
                v-if="item.type === 'internal'"
                type="button"
                class="btn-secondary"
                @click="openNews(item)"
              >
                Ver más
              </button>

              <a
                v-else
                :href="item.url"
                class="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir noticia
              </a>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="glass-panel news-empty">
        <h3>No hay noticias en esta categoría</h3>
        <p>
          Cuando se publiquen nuevas entradas, aparecerán aquí automáticamente.
        </p>
      </div>
    </section>

    <!-- MODAL -->
    <Teleport to="body">
      <Transition name="news-modal-fade">
        <div
          v-if="selectedNews"
          class="news-modal"
          @click.self="closeNews"
        >
          <div class="news-modal__dialog glass-panel--strong">
            <button
              type="button"
              class="news-modal__close"
              aria-label="Cerrar"
              @click="closeNews"
            >
              ×
            </button>

            <img
              v-if="selectedNews.image"
              :src="selectedNews.image"
              :alt="selectedNews.title"
              class="news-modal__image"
            />

            <div class="news-modal__content">
              <p class="section-eyebrow">{{ selectedNews.category }}</p>
              <h2>{{ selectedNews.title }}</h2>
              <p class="news-modal__meta">
                {{ selectedNews.date }} · {{ selectedNews.source }}
              </p>

              <p
                v-for="(paragraph, index) in selectedNews.content"
                :key="index"
                class="news-modal__paragraph"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'

const activeFilter = ref('all')
const selectedNews = ref(null)

const filters = [
  { label: 'Todas', value: 'all' },
  { label: 'Avisos', value: 'aviso' },
  { label: 'Condolencias', value: 'condolencia' },
  { label: 'Comunicados', value: 'comunicado' },
  { label: 'Cristianas', value: 'cristiana' }
]

const newsItems = [
  {
    id: 1,
    type: 'internal',
    category: 'Aviso',
    categoryKey: 'aviso',
    title: 'Convocatoria nacional de ayuno y oración',
    date: '28 de marzo de 2026',
    source: 'Mesa Nacional',
    image:
      'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Se informa a toda la iglesia sobre una jornada especial de búsqueda espiritual y unidad en oración.',
    content: [
      'Se convoca a las congregaciones de nuestra misión a participar en una jornada nacional de ayuno y oración, con el propósito de buscar dirección del Señor, fortalecer la unidad espiritual y presentar las necesidades de la obra.',
      'Cada iglesia local podrá organizar esta jornada conforme a su realidad, procurando promover la participación reverente de hermanos, hermanas y jóvenes.',
      'Se recomienda además informar con anticipación los horarios y modalidades de reunión a toda la congregación.'
    ],
    featured: true
  },
  {
    id: 2,
    type: 'internal',
    category: 'Condolencia',
    categoryKey: 'condolencia',
    title: 'Condolencias a familia pastoral',
    date: '26 de marzo de 2026',
    source: 'Comunicado Oficial',
    image:
      'https://images.unsplash.com/photo-1516589091380-5d601e8f7fce?auto=format&fit=crop&w=1400&q=80',
    summary:
      'La misión expresa sus condolencias y acompaña en oración a la familia afectada en este tiempo de dolor.',
    content: [
      'Con profundo pesar, expresamos nuestras condolencias a la familia pastoral y a la iglesia local ante la partida de su ser querido.',
      'Rogamos al Señor que conceda consuelo, fortaleza y paz en medio de este tiempo de aflicción.',
      'Invitamos a toda la hermandad a acompañar en oración a la familia y a la congregación.'
    ],
    featured: false
  },
  {
    id: 3,
    type: 'internal',
    category: 'Comunicado',
    categoryKey: 'comunicado',
    title: 'Actualización sobre actividades ministeriales del mes',
    date: '24 de marzo de 2026',
    source: 'Secretaría Nacional',
    image:
      'https://images.unsplash.com/photo-1515165562835-c3b8c2df7d7d?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Se publica una actualización con información sobre reuniones, visitas ministeriales y próximas actividades.',
    content: [
      'Durante las próximas semanas se desarrollarán diversas actividades ministeriales en distintas zonas del país, incluyendo reuniones especiales, visitas pastorales y jornadas de edificación.',
      'Se solicita a las iglesias mantenerse atentas a los canales oficiales de comunicación para conocer el detalle de fechas, lugares y coordinaciones.',
      'Agradecemos el compromiso de cada congregación en apoyar y difundir estas actividades.'
    ],
    featured: false
  },
  {
    id: 4,
    type: 'external',
    category: 'Noticia cristiana',
    categoryKey: 'cristiana',
    title: 'Cristianos se movilizan en jornada internacional de oración',
    date: '22 de marzo de 2026',
    source: 'Medio cristiano',
    image:
      'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Diversas comunidades cristianas participaron en una jornada internacional enfocada en oración y apoyo misionero.',
    url: 'https://www.christianpost.com/',
    featured: false
  },
  {
    id: 5,
    type: 'external',
    category: 'Noticia cristiana',
    categoryKey: 'cristiana',
    title: 'Nuevo informe destaca crecimiento del trabajo misionero en regiones',
    date: '20 de marzo de 2026',
    source: 'Portal cristiano',
    image:
      'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Un reporte reciente destaca el fortalecimiento de iniciativas de evangelización y servicio en distintas comunidades.',
    url: 'https://www.christianitytoday.com/',
    featured: false
  },
  {
    id: 6,
    type: 'internal',
    category: 'Aviso',
    categoryKey: 'aviso',
    title: 'Inscripción abierta para encuentro nacional juvenil',
    date: '18 de marzo de 2026',
    source: 'Departamento JUMIX',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Se informa la apertura del proceso de inscripción para el próximo encuentro nacional juvenil.',
    content: [
      'Se ha dado inicio al proceso de inscripción para el próximo encuentro nacional juvenil.',
      'Las iglesias deberán coordinar internamente la nómina de participantes y remitirla dentro de los plazos establecidos.',
      'Próximamente se publicará mayor información sobre programa, recomendaciones y aspectos logísticos.'
    ],
    featured: false
  }
]

const featuredNews = computed(() => newsItems.find(item => item.featured) || null)

const filteredNews = computed(() => {
  const base = newsItems.filter(item => !item.featured)

  if (activeFilter.value === 'all') return base

  return base.filter(item => item.categoryKey === activeFilter.value)
})

function openNews(item) {
  if (item.type === 'external' && item.url) {
    window.open(item.url, '_blank', 'noopener,noreferrer')
    return
  }

  selectedNews.value = item
  document.body.style.overflow = 'hidden'
}

function closeNews() {
  selectedNews.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.news-page {
  min-height: 100vh;
  padding-bottom: 4rem;
}

.news-hero {
  padding-top: 1rem;
}

.news-hero__panel {
  display: grid;
  grid-template-columns: 1.45fr 0.95fr;
  gap: 1.5rem;
  padding: 2rem;
}

.news-hero__copy h1 {
  margin-bottom: 1rem;
  font-size: clamp(2.6rem, 5vw, 4.8rem);
  line-height: 1.02;
}

.news-hero__text {
  max-width: 65ch;
  margin-bottom: 0;
  color: var(--theme-text-soft);
  font-size: 1.06rem;
  line-height: 1.8;
}

.news-hero__highlight {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.news-hero__label {
  margin: 0 0 0.5rem;
  color: var(--theme-secondary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.news-hero__highlight h2 {
  margin-bottom: 0.8rem;
}

.news-hero__highlight p:last-child {
  margin-bottom: 0;
  color: var(--theme-text-soft);
}

.news-toolbar {
  margin-top: -1rem;
  margin-bottom: 1rem;
}

.news-toolbar__inner {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 1rem;
}

.news-filter {
  border: 1px solid var(--theme-border-subtle);
  background: rgba(255, 255, 255, 0.04);
  color: var(--theme-text);
  border-radius: var(--radius-pill);
  padding: 0.7rem 1rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background var(--transition-base),
    border-color var(--transition-base),
    transform var(--transition-base);
}

.news-filter:hover {
  transform: translateY(-2px);
  border-color: var(--theme-border-soft);
}

.news-filter--active {
  background: rgba(var(--theme-secondary-rgb), 0.16);
  color: var(--theme-secondary);
  border-color: var(--theme-border-strong);
}

.news-featured__card {
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 0;
}

.news-featured__media {
  min-height: 100%;
}

.news-featured__image {
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
}

.news-featured__content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.news-featured__content h2 {
  margin-bottom: 0.75rem;
  font-size: clamp(1.9rem, 3vw, 3rem);
}

.news-featured__meta {
  margin: 0 0 1rem;
  color: var(--theme-secondary);
  font-size: 0.92rem;
  font-weight: 700;
}

.news-featured__summary {
  margin-bottom: 1.5rem;
  color: var(--theme-text-soft);
  line-height: 1.8;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.news-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.news-card__media {
  position: relative;
}

.news-card__image {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.news-card__badge {
  position: absolute;
  top: 0.9rem;
  left: 0.9rem;
}

.news-card__body {
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.news-card__meta {
  margin: 0 0 0.5rem;
  color: var(--theme-secondary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.news-card__body h3 {
  margin-bottom: 0.7rem;
  font-size: 1.2rem;
}

.news-card__summary {
  margin-bottom: 1rem;
  color: var(--theme-text-soft);
  line-height: 1.7;
  flex: 1;
}

.news-card__actions {
  margin-top: auto;
}

.news-empty {
  padding: 2rem;
  text-align: center;
}

.news-empty h3 {
  margin-bottom: 0.5rem;
}

.news-empty p {
  margin: 0;
  color: var(--theme-text-soft);
}

.news-modal {
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

.news-modal__dialog {
  width: min(920px, 100%);
  max-height: 90vh;
  overflow: auto;
  position: relative;
}

.news-modal__close {
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

.news-modal__image {
  width: 100%;
  height: 360px;
  object-fit: cover;
}

.news-modal__content {
  padding: 1.5rem 1.5rem 2rem;
}

.news-modal__content h2 {
  margin-bottom: 0.7rem;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
}

.news-modal__meta {
  margin: 0 0 1.2rem;
  color: var(--theme-secondary);
  font-weight: 700;
}

.news-modal__paragraph {
  margin-bottom: 1rem;
  color: var(--theme-text-soft);
  line-height: 1.85;
}

.news-modal-fade-enter-active,
.news-modal-fade-leave-active {
  transition: opacity 0.28s ease;
}

.news-modal-fade-enter-from,
.news-modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 1100px) {
  .news-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .news-featured__card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 780px) {
  .news-hero__panel,
  .news-grid {
    grid-template-columns: 1fr;
  }

  .news-featured__image {
    min-height: 280px;
  }
}

@media (max-width: 640px) {
  .news-page {
    padding-bottom: 3rem;
  }

  .news-hero__panel,
  .news-featured__content,
  .news-modal__content {
    padding: 1.25rem;
  }

  .news-toolbar__inner {
    padding: 0.8rem;
  }

  .news-filter {
    width: 100%;
  }

  .news-card__image {
    height: 220px;
  }

  .news-modal__image {
    height: 240px;
  }
}
</style>