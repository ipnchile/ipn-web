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
                        de la iglesia y la comunidad.
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
            <div class="section-heading dorcas-heading-center">
                <p class="section-eyebrow">Galería</p>
                <h2 class="section-title">Momentos y actividades</h2>
                <p class="section-description dorcas-centered-text">
                    Espacio para compartir registros de reuniones, encuentros, jornadas
                    de trabajo y actividades del departamento.
                </p>
            </div>

            <div class="gallery-grid dorcas-gallery-grid">
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
const nationalBoard = [
    {
        role: 'Jefa Nacional',
        name: 'Nombre de la Jefa Nacional',
        period: 'Directiva Nacional 2026',
        description:
            'Responsable de guiar, coordinar y representar el trabajo del Departamento Nacional Dorcas.',
        photo: ''
    },
    {
        role: 'Secretaria Nacional',
        name: 'Nombre de la Secretaria Nacional',
        period: 'Directiva Nacional 2026',
        description:
            'Apoya la organización del departamento, el orden administrativo y la coordinación de actividades.',
        photo: ''
    },
    {
        role: 'Tesorera Nacional',
        name: 'Nombre de la Tesorera Nacional',
        period: 'Directiva Nacional 2026',
        description:
            'Colabora en la administración responsable de los recursos y en el apoyo financiero del departamento.',
        photo: ''
    }
]

const galleryPhotos = [
    {
        src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
        title: 'Reunión de coordinación',
        description: 'Espacios de organización, comunión y planificación del trabajo ministerial.'
    },
    {
        src: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80',
        title: 'Jornada de servicio',
        description: 'Instancias donde el amor cristiano se expresa en apoyo, orden y dedicación.'
    },
    {
        src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
        title: 'Encuentro fraternal',
        description: 'Momentos de unidad, compañerismo y fortalecimiento espiritual.'
    },
    {
        src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
        title: 'Actividad especial',
        description: 'Espacios donde se refleja el compromiso, el servicio y el testimonio cristiano.'
    }
]
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

.dorcas-gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
}
</style>