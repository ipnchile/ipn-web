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
          <h2>Información para la Iglesia y la Misión</h2>
          <p>
            Este espacio reunirá avisos internos, publicaciones futuras y contenido
            audiovisual del canal oficial de la misión.
          </p>
        </aside>
      </div>
    </section>

    <!-- VIDEOS -->
    <section class="section-container section-block">
      <div class="section-heading">
        <p class="section-eyebrow">Canal oficial</p>
        <h2 class="section-title">Videos de la misión</h2>
        <p class="section-description">
          Contenido audiovisual destacado del canal oficial de la misión.
        </p>
      </div>

      <div class="videos-grid">
        <article v-for="video in featuredVideos" :key="video.id" class="glass-panel video-card">
          <div class="video-card__embed">
            <iframe :src="video.embedUrl" :title="video.title" loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>

          <div class="video-card__body">
            <p class="section-eyebrow">YouTube</p>
            <h3>{{ video.title }}</h3>
            <p class="video-card__summary">{{ video.summary }}</p>

            <div class="video-card__actions">
              <a :href="video.url" class="btn-secondary" target="_blank" rel="noopener noreferrer">
                Ver en YouTube
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- COMUNICADOS -->
    <section class="section-container section-block">
      <div class="section-heading">
        <p class="section-eyebrow">Publicaciones</p>
        <h2 class="section-title">Noticias y comunicados</h2>
        <p class="section-description">
          Revise aquí los avisos oficiales, notas informativas y publicaciones
          destacadas relacionadas con nuestra misión.
        </p>
      </div>

      <div v-if="comunicados.length" class="comunicados-grid">
        <article v-for="item in comunicados" :key="item.id" class="comunicado-card">
          <button class="comunicado-image-link" @click="openComunicado(item)">
            <img :src="item.image" :alt="item.title" class="comunicado-image" loading="lazy" />
          </button>

          <div class="comunicado-content">
            <p class="comunicado-date">{{ item.date }}</p>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>

            <button class="btn-secondary" @click="openComunicado(item)">
              Ver comunicado
            </button>
          </div>
        </article>
      </div>

      <div v-else class="glass-panel news-empty">
        <div class="news-empty__icon">
          <font-awesome-icon :icon="['fas', 'calendar-days']" />
        </div>

        <h3>Sin información por ahora</h3>
        <p>
          Actualmente no hay noticias o comunicados publicados en esta sección.
        </p>
      </div>
    </section>

    <!-- MODAL COMUNICADO -->
    <div v-if="selectedComunicado" class="comunicado-modal" @click.self="closeComunicado">
      <div class="comunicado-modal__content">
        <button class="comunicado-modal__close" @click="closeComunicado">
          ×
        </button>

        <img :src="selectedComunicado.image" :alt="selectedComunicado.title" class="comunicado-modal__image" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { comunicados } from '@/data/comunicados'

const selectedComunicado = ref(null)

const openComunicado = (item) => {
  selectedComunicado.value = item
}

const closeComunicado = () => {
  selectedComunicado.value = null
}

const featuredVideos = [
  {
    id: 'jtSa6783f-g',
    title: 'Video destacado del canal oficial',
    summary:
      'Primer video incorporado como contenido destacado del canal oficial de YouTube de la misión.',
    url: 'https://www.youtube.com/watch?v=jtSa6783f-g',
    embedUrl: 'https://www.youtube.com/embed/jtSa6783f-g'
  }
]
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

.videos-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.25rem;
}

.video-card {
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 0;
  padding: 0;
}

.video-card__embed {
  position: relative;
  min-height: 100%;
  background: #000;
}

.video-card__embed iframe {
  width: 100%;
  height: 100%;
  min-height: 380px;
  border: 0;
  display: block;
}

.video-card__body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.video-card__body h3 {
  margin-bottom: 0.75rem;
  font-size: clamp(1.35rem, 2vw, 2rem);
}

.video-card__summary {
  margin: 0 0 1.2rem;
  color: var(--theme-text-soft);
  line-height: 1.8;
}

.video-card__actions {
  margin-top: auto;
}

/* COMUNICADOS */
.comunicados-grid {
  display: grid;
  grid-template-columns: minmax(280px, 430px);
  justify-content: center;
  gap: 1.25rem;
}

.comunicado-card {
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--theme-border-subtle);
  background: var(--theme-panel-bg-soft);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.comunicado-card:hover {
  transform: translateY(-5px);
  border-color: var(--theme-border-soft);
  box-shadow: var(--shadow-soft);
}

.comunicado-image-link {
  width: 100%;
  display: block;
  border: 0;
  padding: 0;
  background: #111;
  cursor: pointer;
}

.comunicado-image {
  width: 100%;
  height: 300px;
  object-fit: contain;
  display: block;
  background: #111;
}

.comunicado-content {
  padding: 1rem;
  text-align: center;
}

.comunicado-date {
  color: var(--theme-secondary);
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.comunicado-content h3 {
  margin-bottom: 0.65rem;
}

.comunicado-content p:not(.comunicado-date) {
  color: var(--theme-text-soft);
  line-height: 1.7;
  margin-bottom: 1rem;
}

/* MODAL */
.comunicado-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
}

.comunicado-modal__content {
  position: relative;
  width: min(96vw, 980px);
  max-height: 92vh;
  border-radius: 20px;
  background: #111;
  border: 1px solid var(--theme-border-subtle);
  overflow: hidden;
}

.comunicado-modal__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
}

.comunicado-modal__image {
  width: 100%;
  max-height: 92vh;
  object-fit: contain;
  display: block;
}

/* EMPTY */
.news-empty {
  padding: 2rem;
  text-align: center;
  max-width: 860px;
  margin: 0 auto;
}

.news-empty__icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: rgba(var(--theme-secondary-rgb), 0.12);
  border: 1px solid rgba(var(--theme-secondary-rgb), 0.18);
  color: var(--theme-secondary);
  font-size: 1.4rem;
}

.news-empty h3 {
  margin-bottom: 0.7rem;
}

.news-empty p {
  margin: 0;
  color: var(--theme-text-soft);
  line-height: 1.8;
}

@media (max-width: 1100px) {
  .video-card {
    grid-template-columns: 1fr;
  }

  .video-card__embed iframe {
    min-height: 320px;
  }
}

@media (max-width: 780px) {
  .news-hero__panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .news-page {
    padding-bottom: 3rem;
  }

  .news-hero__panel,
  .video-card__body {
    padding: 1.25rem;
  }

  .video-card__embed iframe {
    min-height: 220px;
  }

  .comunicado-image {
    height: 240px;
  }

  .comunicado-modal {
    padding: 0.75rem;
  }

  .comunicado-modal__content {
    width: 100%;
  }

  .news-empty {
    padding: 1.5rem;
  }
}
</style>