<template>
    <main class="rrpp-page">
        <!-- HERO -->
        <section class="section-container section-block rrpp-hero">
            <div class="glass-panel rrpp-hero__panel">
                <div class="rrpp-hero__copy">
                    <p class="section-eyebrow">Departamento Nacional</p>
                    <h1>Protocolos, Comunicaciones y Relaciones Públicas</h1>

                    <p class="rrpp-hero__lead">
                        El Departamento Nacional de Protocolos, Comunicaciones y Relaciones Públicas
                        es el órgano oficial de la Iglesia Pentecostal Nazareth – IPN Chile encargado
                        de asegurar la coherencia institucional, la imagen pública, la gestión de
                        eventos oficiales y la coordinación nacional en materia de comunicación
                        interna y externa.
                    </p>

                    <div class="rrpp-hero__actions">
                        <a href="#proposito" class="btn-primary">Conocer propósito</a>
                        <a href="#directorio" class="btn-secondary">Ver equipo nacional</a>
                    </div>
                </div>

                <aside class="card rrpp-hero__highlight">
                    <div class="rrpp-hero__logo-wrap">
                        <img v-if="departmentLogo" :src="departmentLogo"
                            alt="Logo oficial del Departamento Nacional de RRPP" class="rrpp-hero__logo" />
                        <div v-else class="rrpp-hero__logo rrpp-hero__logo--placeholder">
                            <font-awesome-icon :icon="['fas', 'image']" />
                        </div>
                    </div>

                    <p class="rrpp-hero__label">Nuestro lema</p>
                    <h2>Comunicamos con Excelencia, Servimos con Reverencia.</h2>
                    <p>
                        Un servicio orientado al orden, la imagen institucional, la comunicación
                        clara y la representación reverente de nuestra iglesia.
                    </p>
                </aside>
            </div>
        </section>

        <!-- PROPÓSITO -->
        <section id="proposito" class="section-container section-block">
            <div class="section-heading rrpp-heading-center">
                <p class="section-eyebrow">Nuestra misión</p>
                <h2 class="section-title">Propósito del departamento</h2>
                <p class="section-description rrpp-centered-text">
                    Servir a la Iglesia Pentecostal Nazareth fortaleciendo la comunicación
                    institucional, el protocolo oficial y las relaciones públicas, procurando que
                    cada mensaje, actividad y representación refleje orden, excelencia y reverencia.
                </p>
            </div>

            <div class="rrpp-purpose-grid">
                <article class="glass-panel--soft rrpp-purpose-card">
                    <div class="rrpp-purpose-card__icon">
                        <font-awesome-icon :icon="['fas', 'bullhorn']" />
                    </div>
                    <h3>Comunicación institucional</h3>
                    <p>
                        Coordinar mensajes oficiales, contenidos y canales de comunicación interna
                        y externa de la institución.
                    </p>
                </article>

                <article class="glass-panel--soft rrpp-purpose-card">
                    <div class="rrpp-purpose-card__icon">
                        <font-awesome-icon :icon="['fas', 'handshake']" />
                    </div>
                    <h3>Relaciones públicas</h3>
                    <p>
                        Cuidar la imagen pública de la iglesia, fortaleciendo vínculos, presencia
                        institucional y representación oficial.
                    </p>
                </article>

                <article class="glass-panel--soft rrpp-purpose-card">
                    <div class="rrpp-purpose-card__icon">
                        <font-awesome-icon :icon="['fas', 'clipboard-list']" />
                    </div>
                    <h3>Protocolo y eventos</h3>
                    <p>
                        Apoyar la planificación, orden y desarrollo protocolar de ceremonias,
                        conferencias y actividades oficiales.
                    </p>
                </article>
            </div>
        </section>

        <!-- DIRECTORIO -->
        <section id="directorio" class="section-container section-block">
            <div class="section-heading rrpp-heading-center">
                <p class="section-eyebrow">Equipo nacional</p>
                <h2 class="section-title">Liderazgo del departamento</h2>
                <p class="section-description rrpp-centered-text">
                    Equipo responsable de coordinar el trabajo nacional de comunicaciones,
                    protocolo y relaciones públicas.
                </p>
            </div>

            <div class="rrpp-board-grid">
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

        <!-- TEXTO FINAL -->
        <section class="section-container section-block">
            <div class="glass-panel rrpp-verse">
                <p class="section-eyebrow">Identidad de servicio</p>
                <blockquote>
                    “Comunicamos con Excelencia, Servimos con Reverencia.”
                </blockquote>
                <span>Departamento Nacional de RRPP IPN Chile</span>
            </div>
        </section>
    </main>
</template>

<script setup>
import departmentLogo from '@/assets/img/departamentos/RRPP_NACIONAL.png'

const nationalBoard = [
    {
        role: 'Director Nacional',
        name: 'Pr. Iván González Rodríguez',
        period: 'Equipo Nacional',
        description:
            'Responsable de coordinar la comunicación institucional, protocolo y relaciones públicas a nivel nacional.',
        photo: '',
        email: 'rrpp@ipnchile.cl'
    },
    {
        role: 'Protocolo',
        name: 'Pr. Mauricio Carrasco Valenzuelas',
        period: 'Equipo Nacional',
        description:
            'Colabora en la organización protocolar de actividades, ceremonias y eventos oficiales.',
        photo: '',
        email: 'protocolo@ipnchile.cl'
    }
]

const galleryPhotos = []
</script>

<style scoped>
.rrpp-page {
    padding-bottom: 4rem;
}

.rrpp-hero {
    padding-top: 1rem;
}

.rrpp-hero__panel {
    display: grid;
    grid-template-columns: 1.45fr 0.95fr;
    gap: 1.5rem;
    padding: 2rem;
}

.rrpp-hero__copy h1 {
    margin-bottom: 1rem;
    font-size: clamp(2.4rem, 4.6vw, 4.5rem);
    line-height: 1.02;
}

.rrpp-hero__lead {
    max-width: 68ch;
    margin-bottom: 1.5rem;
    color: var(--theme-text-soft);
    font-size: 1.06rem;
    line-height: 1.75;
}

.rrpp-hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
}

.rrpp-hero__highlight {
    padding: 1.5rem;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.rrpp-hero__logo-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 1.2rem;
}

.rrpp-hero__logo {
    width: 112px;
    height: 112px;
    object-fit: contain;
    display: block;
    border-radius: 22px;
    padding: 0.75rem;
    background: var(--theme-panel-bg-soft);
    border: 1px solid var(--theme-border-soft);
    box-shadow: var(--shadow-soft);
}

.rrpp-hero__logo--placeholder {
    display: grid;
    place-items: center;
    color: var(--theme-secondary);
    font-size: 1.5rem;
}

.rrpp-hero__label {
    margin: 0 0 0.5rem;
    color: var(--theme-secondary);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.rrpp-hero__highlight h2 {
    margin-bottom: 0.8rem;
    color: var(--theme-accent);
}

.rrpp-hero__highlight p:last-child {
    margin-bottom: 0;
    color: var(--theme-text-soft);
}

.rrpp-heading-center {
    text-align: center;
}

.rrpp-centered-text {
    margin-inline: auto;
}

.rrpp-purpose-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.2rem;
}

.rrpp-board-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 540px));
    justify-content: center;
    gap: 1.2rem;
}

.rrpp-purpose-card {
    padding: 1.5rem;
    height: 100%;
}

.rrpp-purpose-card__icon {
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 999px;
    background: rgba(var(--theme-secondary-rgb), 0.13);
    border: 1px solid rgba(var(--theme-secondary-rgb), 0.25);
    color: var(--theme-secondary);
    font-size: 1.1rem;
}

.rrpp-purpose-card h3 {
    margin-bottom: 0.65rem;
}

.rrpp-purpose-card p {
    margin-bottom: 0;
    color: var(--theme-text-soft);
    line-height: 1.7;
}

.official-card {
    overflow: hidden;
    height: 100%;
    transition: transform 0.25s ease, border-color 0.25s ease;
}

.official-card:hover {
    transform: translateY(-5px);
    border-color: var(--theme-border-strong);
}

.official-card__topbar {
    height: 5px;
    background: linear-gradient(
        90deg,
        var(--theme-accent),
        var(--theme-secondary)
    );
}

.official-card__photo-wrap {
    display: flex;
    justify-content: center;
    padding-top: 1.4rem;
}

.official-card__photo {
    width: 105px;
    height: 105px;
    object-fit: cover;
    border-radius: 999px;
    border: 2px solid var(--theme-border-strong);
    background: var(--theme-panel-bg-soft);
}

.official-card__photo--fallback {
    display: grid;
    place-items: center;
    color: var(--theme-secondary);
    font-size: 2rem;
}

.official-card__body {
    padding: 1.2rem 1.4rem 1.5rem;
    text-align: center;
}

.official-card__role {
    margin-bottom: 0.4rem;
    color: var(--theme-secondary);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.official-card__body h3 {
    margin-bottom: 0.35rem;
}

.official-card__meta {
    margin-bottom: 0.85rem;
    color: var(--theme-accent);
    font-size: 0.9rem;
    font-weight: 600;
}

.official-card__text {
    color: var(--theme-text-soft);
    line-height: 1.65;
}

.official-card__contact {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(var(--theme-secondary-rgb), 0.18);
}

.official-card__contact-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.45rem;
    color: var(--theme-secondary);
    font-size: 0.88rem;
}

.official-card__contact-item a {
    color: var(--theme-text-soft);
    text-decoration: none;
}

.official-card__contact-item a:hover {
    color: var(--theme-accent);
}

.rrpp-gallery-empty {
    max-width: 720px;
    margin-inline: auto;
    padding: 2rem;
    text-align: center;
}

.rrpp-gallery-empty__icon {
    width: 58px;
    height: 58px;
    display: grid;
    place-items: center;
    margin: 0 auto 1rem;
    border-radius: 999px;
    background: rgba(var(--theme-secondary-rgb), 0.13);
    border: 1px solid rgba(var(--theme-secondary-rgb), 0.25);
    color: var(--theme-secondary);
    font-size: 1.35rem;
}

.rrpp-gallery-empty p {
    color: var(--theme-text-soft);
    line-height: 1.7;
}

.rrpp-verse {
    padding: 2rem;
    text-align: center;
}

.rrpp-verse blockquote {
    max-width: 850px;
    margin: 0 auto 1rem;
    color: var(--theme-accent);
    font-size: clamp(1.5rem, 3vw, 2.4rem);
    font-weight: 800;
    line-height: 1.25;
}

.rrpp-verse span {
    color: var(--theme-text-soft);
    font-weight: 600;
}

/* RESPONSIVE */
@media (max-width: 980px) {
    .rrpp-hero__panel {
        grid-template-columns: 1fr;
    }

    .rrpp-purpose-grid,
    .rrpp-board-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .rrpp-hero__panel {
        padding: 1.25rem;
    }

    .rrpp-hero__copy h1 {
        font-size: clamp(2rem, 11vw, 3rem);
    }

    .rrpp-hero__actions {
        flex-direction: column;
    }

    .rrpp-hero__actions a {
        width: 100%;
        text-align: center;
    }

    .rrpp-verse {
        padding: 1.4rem;
    }
}
</style>