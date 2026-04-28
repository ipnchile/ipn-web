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
                    <div class="jumix-hero__logo-wrap">
                        <img v-if="departmentLogo" :src="departmentLogo" alt="Logo oficial del Departamento JUMIX"
                            class="jumix-hero__logo" />
                        <div v-else class="jumix-hero__logo jumix-hero__logo--placeholder">
                            <font-awesome-icon :icon="['fas', 'image']" />
                        </div>
                    </div>

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
            <div class="section-heading jumix-heading-center">
                <p class="section-eyebrow">Galería</p>
                <h2 class="section-title">Jumix Nacional 2026</h2>
                <p class="section-description jumix-centered-text">
                    Registro fotográfico por bloques del encuentro nacional.
                </p>
            </div>

            <div class="jumix-gallery-toolbar">
                <button v-for="block in galleryBlocks" :key="block.id" class="gallery-filter-btn"
                    :class="{ active: selectedBlock === block.id }" @click="changeBlock(block.id)">
                    {{ block.title }}
                </button>
            </div>

            <div v-if="filteredPhotos.length" class="jumix-carousel">
                <div class="jumix-main-photo">
                    <img :src="currentPhoto.src" :alt="currentPhoto.title" loading="lazy" />

                    <button class="jumix-nav jumix-nav--prev" @click="prevPhoto">‹</button>
                    <button class="jumix-nav jumix-nav--next" @click="nextPhoto">›</button>
                </div>

                <Swiper class="jumix-thumbs-swiper" :modules="modules" :space-between="10" :slides-per-view="5"
                    :free-mode="true" :breakpoints="{
                        320: { slidesPerView: 3 },
                        640: { slidesPerView: 5 },
                        980: { slidesPerView: 7 },
                        1200: { slidesPerView: 9 }
                    }">
                    <SwiperSlide v-for="(photo, index) in filteredPhotos" :key="`thumb-${photo.id}`"
                        class="jumix-thumb-slide" :class="{ 'is-active': currentPhotoIndex === index }"
                        @click="currentPhotoIndex = index">
                        <button class="jumix-thumb-button" type="button">
                            <img :src="photo.src" :alt="photo.title" loading="lazy" />
                        </button>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div v-else class="glass-panel jumix-gallery-empty">
                <div class="jumix-gallery-empty__icon">
                    <font-awesome-icon :icon="['fas', 'calendar-days']" />
                </div>

                <h3>Sin fotografías disponibles</h3>
                <p>
                    Este bloque todavía no tiene fotografías publicadas.
                </p>
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
import { computed, ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'

import departmentLogo from '@/assets/img/departamentos/JUMIX_NACIONAL.png'
import { galleryBlocks, galleryPhotos } from '@/data/jumixGallery'

const selectedBlock = ref(galleryBlocks[0]?.id || null)
const currentPhotoIndex = ref(0)

const modules = [FreeMode]

const filteredPhotos = computed(() =>
    galleryPhotos.filter((photo) => photo.blockId === selectedBlock.value)
)

const currentPhoto = computed(() =>
    filteredPhotos.value[currentPhotoIndex.value] || filteredPhotos.value[0]
)

const changeBlock = (blockId) => {
    selectedBlock.value = blockId
    currentPhotoIndex.value = 0
}

const selectPhoto = (index) => {
    currentPhotoIndex.value = index
}

const nextPhoto = () => {
    if (!filteredPhotos.value.length) return

    currentPhotoIndex.value =
        (currentPhotoIndex.value + 1) % filteredPhotos.value.length
}

const prevPhoto = () => {
    if (!filteredPhotos.value.length) return

    currentPhotoIndex.value =
        (currentPhotoIndex.value - 1 + filteredPhotos.value.length) %
        filteredPhotos.value.length
}

watch(filteredPhotos, () => {
    currentPhotoIndex.value = 0
})

const nationalBoard = [
    {
        role: 'Jefe Nacional',
        name: 'Hno. Joel Pardo',
        period: 'Directiva Nacional',
        description:
            'Responsable de guiar, coordinar y representar el trabajo del Departamento Nacional JUMIX.',
        photo: 'https://media.ipnchile.cl/perfiles/jumix/Jefe%20Nacional%20-%20Jumix.webp',
        email: 'jumix.ipn@ipnchile.cl'
    },
    {
        role: 'Secretario Nacional',
        name: 'Hno. Benjamin Ceballo',
        period: 'Directiva Nacional',
        description:
            'Apoya la organización del departamento, el orden administrativo y la coordinación de actividades juveniles.',
        photo: 'https://media.ipnchile.cl/perfiles/jumix/Secretario%20NAcional%20-%20%20Jumix.webp',
        email: 'jumix.ipn@ipnchile.cl'
    },
    {
        role: 'Tesorero Nacional',
        name: 'Hna. Genesis Rodriguez',
        period: 'Directiva Nacional',
        description:
            'Colabora en la administración responsable de los recursos y en el apoyo financiero del departamento.',
        photo: 'https://media.ipnchile.cl/perfiles/jumix/Tesorera%20Nacional%20-%20Jumix.webp',
        email: 'jumix.ipn@ipnchile.cl'
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

.jumix-hero__logo-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 1.2rem;
}

.jumix-hero__logo {
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

.jumix-hero__logo--placeholder {
    display: grid;
    place-items: center;
    color: var(--theme-secondary);
    font-size: 1.5rem;
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

.jumix-purpose-grid,
.jumix-board-grid {
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

/* GALERÍA */
.jumix-gallery-toolbar {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.gallery-filter-btn {
    padding: 0.75rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--theme-border-subtle);
    background: var(--theme-panel-bg-soft);
    color: var(--theme-text);
    cursor: pointer;
    font-weight: 700;
    transition:
        color var(--transition-base),
        border-color var(--transition-base),
        background var(--transition-base),
        transform var(--transition-base);
}

.gallery-filter-btn:hover,
.gallery-filter-btn.active {
    border-color: var(--theme-secondary);
    background: rgba(var(--theme-secondary-rgb), 0.16);
    color: var(--theme-secondary);
    transform: translateY(-2px);
}

.jumix-carousel {
    max-width: 1180px;
    margin: 0 auto;
}

.jumix-main-photo {
    position: relative;
    width: 100%;
    height: min(72vh, 720px);
    border-radius: 22px;
    overflow: hidden;
    border: 1px solid var(--theme-border-subtle);
    background: #111;
    box-shadow: var(--shadow-soft);
}

.jumix-main-photo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    background: #111;
}

.jumix-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    width: 48px;
    height: 48px;
    border: 0;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.58);
    color: var(--theme-secondary);
    font-size: 2.5rem;
    line-height: 1;
    cursor: pointer;
}

.jumix-nav--prev {
    left: 1rem;
}

.jumix-nav--next {
    right: 1rem;
}

.jumix-thumbs-swiper {
    margin-top: 1rem;
    padding-bottom: 0.4rem;
}

.jumix-thumbs-swiper .swiper-slide {
    height: 88px;
    opacity: 0.45;
    cursor: pointer;
    border-radius: 14px;
    overflow: hidden;
    border: 2px solid transparent;
    background: #111;
    transition:
        opacity var(--transition-base),
        border-color var(--transition-base),
        transform var(--transition-base);
}

.jumix-thumbs-swiper .swiper-slide:hover {
    opacity: 0.85;
    transform: translateY(-2px);
}

.jumix-thumbs-swiper .swiper-slide.is-active {
    opacity: 1;
    border-color: var(--theme-secondary);
}

.jumix-thumbs-swiper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.jumix-thumb-slide {
    cursor: pointer;
}

.jumix-thumb-button {
    width: 100%;
    height: 100%;
    display: block;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
}

.jumix-thumb-button img {
    pointer-events: none;
}

.jumix-gallery-empty {
    padding: 2rem;
    text-align: center;
    max-width: 760px;
    margin: 0 auto;
}

.jumix-gallery-empty__icon {
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

.jumix-gallery-empty h3 {
    margin-bottom: 0.75rem;
}

.jumix-gallery-empty p {
    margin: 0;
    color: var(--theme-text-soft);
    line-height: 1.75;
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
    .jumix-board-grid {
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

    .official-card__contact-item {
        flex-direction: column;
        gap: 0.3rem;
    }

    .jumix-main-photo {
        height: 420px;
        border-radius: 16px;
    }

    .jumix-nav {
        width: 40px;
        height: 40px;
        font-size: 2rem;
    }

    .jumix-nav--prev {
        left: 0.5rem;
    }

    .jumix-nav--next {
        right: 0.5rem;
    }

    .jumix-thumbs-swiper .swiper-slide {
        height: 68px;
    }
}
</style>