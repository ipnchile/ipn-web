<template>
  <main class="varones-page">
    <!-- HERO -->
    <section class="section-container section-block varones-hero">
      <div class="glass-panel varones-hero__panel">
        <div class="varones-hero__copy">
          <p class="section-eyebrow">Departamento Nacional</p>
          <h1>Varones</h1>
          <p class="varones-hero__lead">
            Un espacio dedicado a fortalecer la vida espiritual, la comunión fraternal
            y el compromiso con la obra del Señor, promoviendo hombres firmes en la fe,
            dispuestos a servir con fidelidad.
          </p>

          <div class="varones-hero__actions">
            <a href="#directorio" class="btn-primary">Ver directorio nacional</a>
            <a href="#galeria" class="btn-secondary">Ver galería</a>
          </div>
        </div>

        <aside class="card varones-hero__highlight">
          <p class="varones-hero__label">Lema del departamento</p>
          <h2>Hombres firmes en la fe</h2>
          <p>
            Velando, sirviendo y creciendo en el Señor con reverencia, unidad
            y disposición para la obra.
          </p>
        </aside>
      </div>
    </section>

    <!-- PROPÓSITO -->
    <section class="section-container section-block">
      <div class="section-heading varones-heading-center">
        <p class="section-eyebrow">Nuestra misión</p>
        <h2 class="section-title">Propósito del departamento</h2>
        <p class="section-description varones-centered-text">
          El Departamento Nacional de Varones tiene como propósito fortalecer la vida
          cristiana de los hermanos, promoviendo la oración, la enseñanza bíblica,
          la unidad fraternal y el servicio activo dentro de la iglesia.
        </p>
      </div>

      <div class="varones-purpose-grid">
        <article class="glass-panel--soft varones-purpose-card">
          <div class="varones-purpose-card__icon">✦</div>
          <h3>Formación espiritual</h3>
          <p>
            Impulsar una vida de oración, estudio de la Palabra y crecimiento constante
            en la fe.
          </p>
        </article>

        <article class="glass-panel--soft varones-purpose-card">
          <div class="varones-purpose-card__icon">✦</div>
          <h3>Comunión fraternal</h3>
          <p>
            Fomentar vínculos sanos entre hermanos, fortaleciendo la unidad y el apoyo
            mutuo.
          </p>
        </article>

        <article class="glass-panel--soft varones-purpose-card">
          <div class="varones-purpose-card__icon">✦</div>
          <h3>Servicio cristiano</h3>
          <p>
            Motivar la participación activa en la obra del Señor con responsabilidad,
            orden y disposición.
          </p>
        </article>
      </div>
    </section>

    <!-- DIRECTORIO NACIONAL -->
    <section id="directorio" class="section-container section-block">
      <div class="section-heading varones-heading-center">
        <p class="section-eyebrow">Directorio nacional</p>
        <h2 class="section-title">Liderazgo del departamento</h2>
        <p class="section-description varones-centered-text">
          Presentación del equipo nacional que sirve en la dirección del
          Departamento de Varones.
        </p>
      </div>

      <div class="varones-board-grid">
        <article
          v-for="leader in nationalBoard"
          :key="leader.role"
          class="card official-card"
        >
          <div class="official-card__topbar"></div>

          <div class="official-card__photo-wrap">
            <img
              v-if="leader.photo"
              :src="leader.photo"
              :alt="leader.name"
              class="official-card__photo"
            />
            <div v-else class="official-card__photo official-card__photo--placeholder">
              <span>Foto oficial</span>
            </div>
          </div>

          <div class="official-card__body">
            <p class="official-card__role">{{ leader.role }}</p>
            <h3>{{ leader.name }}</h3>
            <p class="official-card__meta">{{ leader.period }}</p>
            <p class="official-card__text">{{ leader.description }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- GALERÍA -->
    <section id="galeria" class="section-container section-block">
      <div class="section-heading varones-heading-center">
        <p class="section-eyebrow">Galería</p>
        <h2 class="section-title">Momentos y actividades</h2>
        <p class="section-description varones-centered-text">
          Espacio para compartir registros visuales de reuniones, jornadas,
          congresos y actividades del departamento.
        </p>
      </div>

      <div class="gallery-grid varones-gallery-grid">
        <article
          v-for="photo in galleryPhotos"
          :key="photo.src"
          class="gallery-card"
        >
          <img :src="photo.src" :alt="photo.title" class="gallery-image" />
          <div class="gallery-content">
            <h3>{{ photo.title }}</h3>
            <p>{{ photo.description }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- TEXTO BÍBLICO -->
    <section class="section-container section-block">
      <div class="glass-panel varones-verse">
        <p class="section-eyebrow">Texto inspirador</p>
        <blockquote>
          “Velad, estad firmes en la fe; portaos varonilmente, y esforzaos.”
        </blockquote>
        <span>1 Corintios 16:13</span>
      </div>
    </section>
  </main>
</template>

<script setup>
const nationalBoard = [
  {
    role: 'Jefe Nacional',
    name: 'Nombre del Jefe Nacional',
    period: 'Directiva Nacional 2026',
    description:
      'Responsable de guiar, coordinar y representar el trabajo del Departamento Nacional de Varones.',
    photo: ''
  },
  {
    role: 'Secretario Nacional',
    name: 'Nombre del Secretario Nacional',
    period: 'Directiva Nacional 2026',
    description:
      'Apoya la organización del departamento, el orden administrativo y la coordinación de actividades.',
    photo: ''
  },
  {
    role: 'Tesorero Nacional',
    name: 'Nombre del Tesorero Nacional',
    period: 'Directiva Nacional 2026',
    description:
      'Colabora en la administración responsable de los recursos y en el apoyo financiero del departamento.',
    photo: ''
  }
]

const galleryPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    title: 'Reunión de coordinación',
    description: 'Espacios de planificación, organización y comunión fraternal.'
  },
  {
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    title: 'Jornada de enseñanza',
    description: 'Instancias dedicadas a la formación bíblica y al fortalecimiento espiritual.'
  },
  {
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    title: 'Actividad especial',
    description: 'Encuentros donde se promueve el servicio, la participación y la unidad.'
  },
  {
    src: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=80',
    title: 'Tiempo de comunión',
    description: 'Momentos que fortalecen los lazos cristianos entre los hermanos.'
  }
]
</script>

<style scoped>
.varones-page {
  padding-bottom: 4rem;
}

.varones-hero {
  padding-top: 1rem;
}

.varones-hero__panel {
  display: grid;
  grid-template-columns: 1.45fr 0.95fr;
  gap: 1.5rem;
  padding: 2rem;
}

.varones-hero__copy h1 {
  margin-bottom: 1rem;
  font-size: clamp(2.8rem, 5vw, 4.8rem);
  line-height: 1.02;
}

.varones-hero__lead {
  max-width: 62ch;
  margin-bottom: 1.5rem;
  color: var(--theme-text-soft);
  font-size: 1.06rem;
  line-height: 1.75;
}

.varones-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.varones-hero__highlight {
  padding: 1.5rem;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.varones-hero__label {
  margin: 0 0 0.5rem;
  color: var(--theme-secondary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.varones-hero__highlight h2 {
  margin-bottom: 0.8rem;
}

.varones-hero__highlight p:last-child {
  margin-bottom: 0;
  color: var(--theme-text-soft);
}

.varones-heading-center {
  text-align: center;
}

.varones-centered-text {
  margin-inline: auto;
}

.varones-purpose-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.varones-purpose-card {
  padding: 1.5rem;
  height: 100%;
}

.varones-purpose-card__icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  margin-bottom: 1rem;
  border-radius: 999px;
  background: rgba(var(--theme-secondary-rgb), 0.12);
  border: 1px solid rgba(var(--theme-secondary-rgb), 0.18);
  color: var(--theme-secondary);
  font-size: 1.1rem;
}

.varones-purpose-card h3 {
  margin-bottom: 0.65rem;
}

.varones-purpose-card p {
  margin-bottom: 0;
  color: var(--theme-text-soft);
  line-height: 1.7;
}

.varones-board-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.official-card {
  overflow: hidden;
  height: 100%;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.official-card:hover {
  transform: translateY(-6px);
  border-color: var(--theme-border-soft);
  box-shadow: var(--shadow-elevated);
}

.official-card__topbar {
  height: 5px;
  background: linear-gradient(
    90deg,
    rgba(var(--theme-secondary-rgb), 0.7),
    rgba(var(--theme-secondary-rgb), 1),
    rgba(var(--theme-secondary-rgb), 0.75)
  );
}

.official-card__photo-wrap {
  padding: 1.25rem 1.25rem 0;
}

.official-card__photo {
  width: 100%;
  aspect-ratio: 4 / 4.7;
  object-fit: cover;
  display: block;
  border-radius: var(--radius-md);
  border: 1px solid var(--theme-border-subtle);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.015)),
    var(--theme-panel-bg-soft);
}

.official-card__photo--placeholder {
  display: grid;
  place-items: center;
  color: var(--theme-text-soft);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.official-card__body {
  padding: 1.2rem 1.25rem 1.35rem;
}

.official-card__role {
  margin: 0 0 0.35rem;
  color: var(--theme-secondary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.official-card__body h3 {
  margin-bottom: 0.5rem;
}

.official-card__meta {
  margin: 0 0 0.8rem;
  color: var(--theme-text-soft);
  font-size: 0.94rem;
  font-weight: 600;
}

.official-card__text {
  margin: 0;
  color: var(--theme-text-soft);
  line-height: 1.7;
}

.varones-gallery-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.varones-verse {
  padding: 2rem;
  text-align: center;
}

.varones-verse blockquote {
  margin: 0 0 0.8rem;
  font-size: clamp(1.3rem, 2.2vw, 2rem);
  line-height: 1.4;
  font-style: italic;
  color: var(--theme-text);
}

.varones-verse span {
  color: var(--theme-secondary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

@media (max-width: 980px) {
  .varones-hero__panel,
  .varones-purpose-grid,
  .varones-board-grid,
  .varones-gallery-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .varones-page {
    padding-bottom: 3rem;
  }

  .varones-hero__panel {
    padding: 1.25rem;
  }

  .varones-hero__actions {
    flex-direction: column;
  }
}
</style>