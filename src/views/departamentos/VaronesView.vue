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
          <div class="varones-hero__logo-wrap">
            <img
              v-if="departmentLogo"
              :src="departmentLogo"
              alt="Logo oficial del Departamento de Varones"
              class="varones-hero__logo"
            />
            <div v-else class="varones-hero__logo varones-hero__logo--placeholder">
              <font-awesome-icon :icon="['fas', 'image']" />
            </div>
          </div>

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
            <div v-else class="official-card__photo official-card__photo--fallback">
              <font-awesome-icon :icon="['fas', 'user']" />
            </div>
          </div>

          <div class="official-card__body">
            <p class="official-card__role">{{ leader.role }}</p>
            <h3>{{ leader.name }}</h3>
            <p class="official-card__meta">{{ leader.period }}</p>
            <p class="official-card__text">{{ leader.description }}</p>

            <div class="official-card__contact">
              <div class="official-card__contact-item">
                <font-awesome-icon :icon="['fas', 'envelope']" />
                <a :href="`mailto:${leader.email}`">{{ leader.email }}</a>
              </div>
            </div>
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

      <div v-if="galleryPhotos.length" class="gallery-grid varones-gallery-grid">
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

      <div v-else class="glass-panel varones-gallery-empty">
        <div class="varones-gallery-empty__icon">
          <font-awesome-icon :icon="['fas', 'calendar-days']" />
        </div>

        <h3>Sin eventos aún</h3>
        <p>
          Por el momento no hay eventos o registros publicados.
          Esta sección se irá actualizando con futuras actividades
          del Departamento Nacional de Varones.
        </p>
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
import departmentLogo from '@/assets/img/departamentos/VARONES_NACIONAL.png'

const nationalBoard = [
  {
    role: 'Jefe Nacional',
    name: 'Hno. Stalin Guzman',
    period: 'Directiva Nacional',
    description:
      'Responsable de guiar, coordinar y representar el trabajo del Departamento Nacional de Varones.',
    photo: '',
    email: 'jefe.varones@ipnchile.cl'
  },
  {
    role: 'Secretario Nacional',
    name: 'Hno. Álvaro Gonzalez',
    period: 'Directiva Nacional',
    description:
      'Apoya la organización del departamento, el orden administrativo y la coordinación de actividades.',
    photo: '',
    email: 'secretario.varones@ipnchile.cl'
  },
  {
    role: 'Tesorero Nacional',
    name: 'Hno. Claudio Ayala',
    period: 'Directiva Nacional',
    description:
      'Colabora en la administración responsable de los recursos y en el apoyo financiero del departamento.',
    photo: '',
    email: 'tesoreria.varones@ipnchile.cl'
  }
]

/*
  La galería queda vacía por ahora.
  Más adelante puede agregar cualquier tipo de contenido
  simplemente incorporando objetos al arreglo.
*/
const galleryPhotos = []

/*
Ejemplo futuro:
const galleryPhotos = [
  {
    src: '/images/departamentos/varones/actividad-1.jpg',
    title: 'Encuentro nacional',
    description: 'Jornada de comunión y servicio.'
  }
]
*/
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

.varones-hero__logo-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 1.2rem;
}

.varones-hero__logo {
  width: 108px;
  height: 108px;
  object-fit: contain;
  display: block;
  border-radius: 22px;
  padding: 0.75rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)),
    var(--theme-panel-bg-soft);
  border: 1px solid var(--theme-border-subtle);
  box-shadow:
    var(--shadow-soft),
    0 0 18px rgba(255, 255, 255, 0.06);
  filter: brightness(0) invert(1) opacity(0.96);
}

.varones-hero__logo--placeholder {
  display: grid;
  place-items: center;
  color: var(--theme-secondary);
  font-size: 1.5rem;
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
  width: 96px;
  height: 96px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
  border: 1px solid var(--theme-border-subtle);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.015)),
    var(--theme-panel-bg-soft);
}

.official-card__photo--fallback {
  display: grid;
  place-items: center;
  color: var(--theme-secondary);
  font-size: 1.6rem;
}

.official-card__body {
  padding: 1.2rem 1.25rem 1.35rem;
  text-align: center;
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
  margin: 0 0 1rem;
  color: var(--theme-text-soft);
  line-height: 1.7;
}

.official-card__contact {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding-top: 1rem;
  border-top: 1px solid var(--theme-border-subtle);
}

.official-card__contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  color: var(--theme-text-soft);
  font-size: 0.95rem;
  line-height: 1.5;
  word-break: break-word;
}

.official-card__contact-item a {
  color: var(--theme-text);
  text-decoration: none;
}

.official-card__contact-item a:hover {
  color: var(--theme-secondary);
}

.varones-gallery-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.varones-gallery-empty {
  padding: 2rem;
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
}

.varones-gallery-empty__icon {
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

.varones-gallery-empty h3 {
  margin-bottom: 0.75rem;
}

.varones-gallery-empty p {
  margin: 0;
  color: var(--theme-text-soft);
  line-height: 1.75;
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

  .official-card__contact-item {
    flex-direction: column;
    gap: 0.3rem;
  }
}
</style>
