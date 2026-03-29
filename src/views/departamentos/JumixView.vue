<template>
    <main class="jumix-page">
        <!-- HERO -->
        <section class="section-container section-block jumix-hero">
            <div class="glass-panel jumix-hero__panel">
                <div class="jumix-hero__copy">
                    <p class="section-eyebrow">Departamento Nacional</p>
                    <h1>JUMIX</h1>
                    <p class="jumix-hero__subtitle">Juventud Mixta</p>
                    <p class="jumix-hero__lead">
                        Un espacio para reunir, fortalecer y orientar a la juventud de la iglesia,
                        promoviendo una vida cristiana firme, un testimonio vivo y una participación
                        activa en la obra del Señor.
                    </p>

                    <div class="jumix-hero__actions">
                        <a href="#directorio" class="btn-primary">Ver directorio nacional</a>
                        <a href="#galeria" class="btn-secondary">Ver galería</a>
                    </div>
                </div>

                <aside class="card jumix-hero__highlight">
                    <p class="jumix-hero__label">Enfoque del departamento</p>
                    <h2>Juventud con propósito</h2>
                    <p>
                        Una generación llamada a vivir en santidad, servir con alegría
                        y permanecer firme en Cristo en medio de los desafíos de este tiempo.
                    </p>
                </aside>
            </div>
        </section>

        <!-- PROPÓSITO -->
        <section class="section-container section-block">
            <div class="section-heading jumix-heading-center">
                <p class="section-eyebrow">Nuestra misión</p>
                <h2 class="section-title">Propósito del departamento</h2>
                <p class="section-description jumix-centered-text">
                    El Departamento Nacional JUMIX busca acompañar, orientar y fortalecer a los
                    jóvenes de la iglesia, impulsando su desarrollo espiritual, la comunión entre
                    hermanos y el compromiso con el servicio cristiano.
                </p>
            </div>

            <div class="jumix-purpose-grid">
                <article class="glass-panel--soft jumix-purpose-card">
                    <div class="jumix-purpose-card__icon">✦</div>
                    <h3>Identidad cristiana</h3>
                    <p>
                        Fortalecer en la juventud una vida centrada en Cristo, con convicciones
                        firmes, oración y conocimiento de la Palabra.
                    </p>
                </article>

                <article class="glass-panel--soft jumix-purpose-card">
                    <div class="jumix-purpose-card__icon">✦</div>
                    <h3>Comunión juvenil</h3>
                    <p>
                        Promover espacios de compañerismo, unidad y apoyo mutuo entre los jóvenes,
                        fortaleciendo la vida de iglesia.
                    </p>
                </article>

                <article class="glass-panel--soft jumix-purpose-card">
                    <div class="jumix-purpose-card__icon">✦</div>
                    <h3>Servicio y participación</h3>
                    <p>
                        Motivar a cada joven a involucrarse activamente en la obra del Señor con
                        entusiasmo, responsabilidad y fidelidad.
                    </p>
                </article>
            </div>
        </section>

        <!-- DIRECTORIO -->
        <section id="directorio" class="section-container section-block">
            <div class="section-heading jumix-heading-center">
                <p class="section-eyebrow">Directorio nacional</p>
                <h2 class="section-title">Liderazgo del departamento</h2>
                <p class="section-description jumix-centered-text">
                    Presentación del equipo nacional que sirve en la dirección del
                    Departamento JUMIX.
                </p>
            </div>

            <div class="jumix-board-grid">
                <article v-for="leader in nationalBoard" :key="leader.role" class="card official-card">
                    <div class="official-card__topbar"></div>

                    <div class="official-card__photo-wrap">
                        <img v-if="leader.photo" :src="leader.photo" :alt="leader.name" class="official-card__photo" />
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
            <div class="section-heading jumix-heading-center">
                <p class="section-eyebrow">Galería</p>
                <h2 class="section-title">Encuentros y actividades</h2>
                <p class="section-description jumix-centered-text">
                    Espacio para compartir registros de congresos, encuentros juveniles,
                    jornadas especiales y actividades del departamento.
                </p>
            </div>

            <div class="gallery-grid jumix-gallery-grid">
                <article v-for="photo in galleryPhotos" :key="photo.src" class="gallery-card">
                    <img :src="photo.src" :alt="photo.title" class="gallery-image" />
                    <div class="gallery-content">
                        <h3>{{ photo.title }}</h3>
                        <p>{{ photo.description }}</p>
                    </div>
                </article>
            </div>
        </section>

        <!-- TEXTO -->
        <section class="section-container section-block">
            <div class="glass-panel jumix-verse">
                <p class="section-eyebrow">Texto inspirador</p>
                <blockquote>
                    “Ninguno tenga en poco tu juventud, sino sé ejemplo de los creyentes.”
                </blockquote>
                <span>1 Timoteo 4:12</span>
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
            'Responsable de guiar, coordinar y representar el trabajo del Departamento Nacional JUMIX.',
        photo: ''
    },
    {
        role: 'Secretario Nacional',
        name: 'Nombre del Secretario Nacional',
        period: 'Directiva Nacional 2026',
        description:
            'Apoya la organización del departamento, el orden administrativo y la coordinación de actividades juveniles.',
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
        src: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80',
        title: 'Encuentro juvenil',
        description: 'Instancias de comunión, enseñanza y fortalecimiento espiritual para la juventud.'
    },
    {
        src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        title: 'Jornada de enseñanza',
        description: 'Espacios dedicados a la reflexión bíblica, orientación y crecimiento en la fe.'
    },
    {
        src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
        title: 'Actividad especial',
        description: 'Momentos donde la juventud comparte, sirve y participa con entusiasmo.'
    },
    {
        src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
        title: 'Tiempo de compañerismo',
        description: 'La comunión juvenil fortalece los vínculos y la identidad cristiana.'
    }
]
</script>

<style scoped>
.jumix-page {
    padding-bottom: 4rem;
}

.jumix-hero {
    padding-top: 1rem;
}

.jumix-hero__panel {
    display: grid;
    grid-template-columns: 1.45fr 0.95fr;
    gap: 1.5rem;
    padding: 2rem;
}

.jumix-hero__copy h1 {
    margin-bottom: 0.35rem;
    font-size: clamp(2.8rem, 5vw, 4.8rem);
    line-height: 1.02;
}

.jumix-hero__subtitle {
    margin: 0 0 1rem;
    color: var(--theme-secondary);
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.jumix-hero__lead {
    max-width: 62ch;
    margin-bottom: 1.5rem;
    color: var(--theme-text-soft);
    font-size: 1.06rem;
    line-height: 1.75;
}

.jumix-hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
}

.jumix-hero__highlight {
    padding: 1.5rem;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.jumix-hero__label {
    margin: 0 0 0.5rem;
    color: var(--theme-secondary);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.jumix-hero__highlight h2 {
    margin-bottom: 0.8rem;
}

.jumix-hero__highlight p:last-child {
    margin-bottom: 0;
    color: var(--theme-text-soft);
}

.jumix-heading-center {
    text-align: center;
}

.jumix-centered-text {
    margin-inline: auto;
}

.jumix-purpose-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.2rem;
}

.jumix-purpose-card {
    padding: 1.5rem;
    height: 100%;
}

.jumix-purpose-card__icon {
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

.jumix-purpose-card h3 {
    margin-bottom: 0.65rem;
}

.jumix-purpose-card p {
    margin-bottom: 0;
    color: var(--theme-text-soft);
    line-height: 1.7;
}

.jumix-board-grid {
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

.jumix-gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.jumix-verse {
    padding: 2rem;
    text-align: center;
}

.jumix-verse blockquote {
    margin: 0 0 0.8rem;
    font-size: clamp(1.3rem, 2.2vw, 2rem);
    line-height: 1.4;
    font-style: italic;
    color: var(--theme-text);
}

.jumix-verse span {
    color: var(--theme-secondary);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

@media (max-width: 980px) {

    .jumix-hero__panel,
    .jumix-purpose-grid,
    .jumix-board-grid,
    .jumix-gallery-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .jumix-page {
        padding-bottom: 3rem;
    }

    .jumix-hero__panel {
        padding: 1.25rem;
    }

    .jumix-hero__actions {
        flex-direction: column;
    }
}
</style>