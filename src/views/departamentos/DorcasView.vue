<template>
    <main class="dorcas-page">
        <!-- HERO -->
        <section class="section-container section-block dorcas-hero">
            <div class="glass-panel dorcas-hero__panel">
                <div class="dorcas-hero__copy">
                    <p class="section-eyebrow">Departamento Nacional</p>
                    <h1>Dorcas</h1>
                    <p class="dorcas-hero__lead">
                        Un ministerio orientado al servicio cristiano, la comunión fraternal
                        y el testimonio fiel, promoviendo una labor llena de amor, sabiduría
                        y compromiso en la obra del Señor.
                    </p>

                    <div class="dorcas-hero__actions">
                        <a href="#directorio" class="btn-primary">Ver directorio nacional</a>
                        <a href="#galeria" class="btn-secondary">Ver galería</a>
                    </div>
                </div>

                <aside class="card dorcas-hero__highlight">
                    <div class="dorcas-hero__logo-wrap">
                        <img v-if="departmentLogo" :src="departmentLogo" alt="Logo oficial del Departamento Dorcas"
                            class="dorcas-hero__logo" />
                        <div v-else class="dorcas-hero__logo dorcas-hero__logo--placeholder">
                            <font-awesome-icon :icon="['fas', 'image']" />
                        </div>
                    </div>

                    <p class="dorcas-hero__label">Lema del departamento</p>
                    <h2>Servicio con amor y fidelidad</h2>
                    <p>
                        Un espacio donde el amor cristiano se expresa en servicio, apoyo,
                        cuidado fraternal y dedicación constante a la obra del Señor.
                    </p>
                </aside>
            </div>
        </section>

        <!-- PROPÓSITO -->
        <section class="section-container section-block">
            <div class="section-heading dorcas-heading-center">
                <p class="section-eyebrow">Nuestra misión</p>
                <h2 class="section-title">Propósito del departamento</h2>
                <p class="section-description dorcas-centered-text">
                    El Departamento Nacional Dorcas busca fortalecer la vida espiritual
                    de las hermanas, fomentar la comunión cristiana y promover el servicio
                    activo, ordenado y amoroso dentro de la iglesia.
                </p>
            </div>

            <div class="dorcas-purpose-grid">
                <article class="glass-panel--soft dorcas-purpose-card">
                    <div class="dorcas-purpose-card__icon">✦</div>
                    <h3>Vida espiritual</h3>
                    <p>
                        Fomentar la oración, la enseñanza bíblica y el crecimiento constante
                        en la fe cristiana.
                    </p>
                </article>

                <article class="glass-panel--soft dorcas-purpose-card">
                    <div class="dorcas-purpose-card__icon">✦</div>
                    <h3>Comunión y apoyo</h3>
                    <p>
                        Fortalecer la unidad entre hermanas, cultivando el amor, la ayuda
                        mutua y la edificación del cuerpo de Cristo.
                    </p>
                </article>

                <article class="glass-panel--soft dorcas-purpose-card">
                    <div class="dorcas-purpose-card__icon">✦</div>
                    <h3>Servicio y testimonio</h3>
                    <p>
                        Impulsar obras de servicio, misericordia y colaboración en beneficio
                        de la Iglesia y la comunidad.
                    </p>
                </article>
            </div>
        </section>

        <!-- DIRECTORIO -->
        <section id="directorio" class="section-container section-block">
            <div class="section-heading dorcas-heading-center">
                <p class="section-eyebrow">Directorio nacional</p>
                <h2 class="section-title">Liderazgo del departamento</h2>
                <p class="section-description dorcas-centered-text">
                    Presentación del equipo nacional que sirve en la dirección del
                    Departamento Dorcas.
                </p>
            </div>

            <div class="dorcas-board-grid">
                <article v-for="leader in nationalBoard" :key="leader.role" class="card official-card">
                    <div class="official-card__topbar"></div>

                    <div class="official-card__photo-wrap">
                        <img v-if="leader.photo" :src="leader.photo" :alt="leader.name" class="official-card__photo" />

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
            <div class="section-heading dorcas-heading-center">
                <p class="section-eyebrow">Galería</p>
                <h2 class="section-title">Momentos y actividades</h2>
                <p class="section-description dorcas-centered-text">
                    Espacio para compartir registros de reuniones, encuentros, jornadas
                    de trabajo y actividades del departamento.
                </p>
            </div>

            <div v-if="galleryPhotos.length" class="gallery-grid dorcas-gallery-grid">
                <article v-for="photo in galleryPhotos" :key="photo.src" class="gallery-card">
                    <img :src="photo.src" :alt="photo.title" class="gallery-image" />
                    <div class="gallery-content">
                        <h3>{{ photo.title }}</h3>
                        <p>{{ photo.description }}</p>
                    </div>
                </article>
            </div>

            <div v-else class="glass-panel dorcas-gallery-empty">
                <div class="dorcas-gallery-empty__icon">
                    <font-awesome-icon :icon="['fas', 'images']" />
                </div>

                <h3>Sin eventos aún</h3>
                <p>
                    Por el momento no hay eventos o registros publicados.
                    Esta sección se irá actualizando con futuras actividades
                    del Departamento Nacional Dorcas.
                </p>
            </div>
        </section>

        <!-- TEXTO -->
        <section class="section-container section-block">
            <div class="glass-panel dorcas-verse">
                <p class="section-eyebrow">Texto inspirador</p>
                <blockquote>
                    “Y abundaba en buenas obras y en limosnas que hacía.”
                </blockquote>
                <span>Hechos 9:36</span>
            </div>
        </section>
    </main>
</template>

<script setup>
import departmentLogo from '@/assets/img/departamentos/DORCAS_NACIONAL.png'

const nationalBoard = [
    {
        role: 'Jefa Nacional',
        name: 'Pra. Miriam Morales',
        period: 'Directiva Nacional',
        description:
            'Responsable de guiar, coordinar y representar el trabajo del Departamento Nacional Dorcas.',
        photo: 'https://media.ipnchile.cl/perfiles/dorcas/Jefa%20Nacional.webp',
        email: 'jefa.dorcas@ipnchile.cl'
    },
    {
        role: 'Secretaria Nacional',
        name: 'Pra. Soraya Sepulveda',
        period: 'Directiva Nacional',
        description:
            'Apoya la organización del departamento, el orden administrativo y la coordinación de actividades.',
        photo: 'https://media.ipnchile.cl/perfiles/dorcas/Secretaria%20Nacional.webp',
        email: 'secretaria.dorcas@ipnchile.cl'
    },
    {
        role: 'Tesorera Nacional',
        name: 'Pra. Norma Aguilera',
        period: 'Directiva Nacional',
        description:
            'Colabora en la administración responsable de los recursos y en el apoyo financiero del departamento.',
        photo: 'https://media.ipnchile.cl/perfiles/dorcas/Tesorera%20Nacional.webp',
        email: 'tesoreria.dorcas@ipnchile.cl'
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
        src: '/images/departamentos/dorcas/actividad-1.jpg',
        title: 'Encuentro nacional',
        description: 'Jornada de comunión y servicio.'
    }
]
*/
</script>

<style scoped>
.dorcas-page {
    padding-bottom: 4rem;
}

.dorcas-hero {
    padding-top: 1rem;
}

.dorcas-hero__panel {
    display: grid;
    grid-template-columns: 1.45fr 0.95fr;
    gap: 1.5rem;
    padding: 2rem;
}

.dorcas-hero__copy h1 {
    margin-bottom: 1rem;
    font-size: clamp(2.8rem, 5vw, 4.8rem);
    line-height: 1.02;
}

.dorcas-hero__lead {
    max-width: 62ch;
    margin-bottom: 1.5rem;
    color: var(--theme-text-soft);
    font-size: 1.06rem;
    line-height: 1.75;
}

.dorcas-hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
}

.dorcas-hero__highlight {
    padding: 1.5rem;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.dorcas-hero__logo-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 1.2rem;
}

.dorcas-hero__logo {
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

.dorcas-hero__logo--placeholder {
    display: grid;
    place-items: center;
    color: var(--theme-secondary);
    font-size: 1.5rem;
}

.dorcas-hero__label {
    margin: 0 0 0.5rem;
    color: var(--theme-secondary);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.dorcas-hero__highlight h2 {
    margin-bottom: 0.8rem;
}

.dorcas-hero__highlight p:last-child {
    margin-bottom: 0;
    color: var(--theme-text-soft);
}

.dorcas-heading-center {
    text-align: center;
}

.dorcas-centered-text {
    margin-inline: auto;
}

.dorcas-purpose-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.2rem;
}

.dorcas-purpose-card {
    padding: 1.5rem;
    height: 100%;
}

.dorcas-purpose-card__icon {
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

.dorcas-purpose-card h3 {
    margin-bottom: 0.65rem;
}

.dorcas-purpose-card p {
    margin-bottom: 0;
    color: var(--theme-text-soft);
    line-height: 1.7;
}

.dorcas-board-grid {
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
    background: linear-gradient(90deg,
            rgba(var(--theme-secondary-rgb), 0.7),
            rgba(var(--theme-secondary-rgb), 1),
            rgba(var(--theme-secondary-rgb), 0.75));
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

.dorcas-gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.dorcas-gallery-empty {
    padding: 2rem;
    text-align: center;
    max-width: 760px;
    margin: 0 auto;
}

.dorcas-gallery-empty__icon {
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

.dorcas-gallery-empty h3 {
    margin-bottom: 0.75rem;
}

.dorcas-gallery-empty p {
    margin: 0;
    color: var(--theme-text-soft);
    line-height: 1.75;
}

.dorcas-verse {
    padding: 2rem;
    text-align: center;
}

.dorcas-verse blockquote {
    margin: 0 0 0.8rem;
    font-size: clamp(1.3rem, 2.2vw, 2rem);
    line-height: 1.4;
    font-style: italic;
    color: var(--theme-text);
}

.dorcas-verse span {
    color: var(--theme-secondary);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

@media (max-width: 980px) {

    .dorcas-hero__panel,
    .dorcas-purpose-grid,
    .dorcas-board-grid,
    .dorcas-gallery-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .dorcas-page {
        padding-bottom: 3rem;
    }

    .dorcas-hero__panel {
        padding: 1.25rem;
    }

    .dorcas-hero__actions {
        flex-direction: column;
    }

    .official-card__contact-item {
        flex-direction: column;
        gap: 0.3rem;
    }
}
</style>
