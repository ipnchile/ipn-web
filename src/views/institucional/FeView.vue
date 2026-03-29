<template>
    <main class="institucional-page">
        <section class="hero-section">
            <div class="section-container">
                <div
                    ref="heroRef"
                    class="hero-content reveal reveal-up"
                    :class="{ 'is-visible': visible.hero }"
                >
                    <p class="section-eyebrow">Doctrina</p>
                    <h1>Lo que <span>Creemos</span></h1>

                    <p class="hero-text">
                        Los artículos de fe de la Iglesia Pentecostal Nazareth se fundan en las Sagradas Escrituras
                        y expresan los principios doctrinales que orientan la vida, el testimonio y la identidad
                        espiritual de la Iglesia.
                    </p>

                    <div class="subnav">
                        <RouterLink to="/quienes-somos" class="subnav-link">
                            Quiénes Somos
                        </RouterLink>

                        <RouterLink to="/quienes-somos/gobierno" class="subnav-link">
                            Gobierno Institucional
                        </RouterLink>
                    </div>
                </div>
            </div>
        </section>

        <section class="intro-section">
            <div class="section-container">
                <div
                    ref="introRef"
                    class="intro-card glass-panel reveal reveal-up"
                    :class="{ 'is-visible': visible.intro }"
                >
                    <div class="intro-card__content">
                        <p class="section-eyebrow">Base Doctrinal</p>
                        <h2>Una fe afirmada en la Palabra de Dios</h2>
                        <p>
                            Nuestra confesión de fe recoge enseñanzas fundamentales que la Iglesia ha recibido
                            y proclamado conforme a la Biblia. Estos principios no solo expresan lo que creemos,
                            sino también la manera en que vivimos, servimos y perseveramos en Cristo.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="beliefs-section">
            <div class="section-container">
                <div
                    ref="headingRef"
                    class="section-heading reveal reveal-up"
                    :class="{ 'is-visible': visible.heading }"
                >
                    <p class="section-eyebrow">Artículos de Fe</p>
                    <h2>Diez convicciones fundamentales</h2>
                    <p class="section-description">
                        Cada uno de estos artículos resume aspectos esenciales de nuestra doctrina,
                        preservando la enseñanza bíblica que sustenta la fe y el testimonio de la Iglesia.
                    </p>
                </div>

                <div class="belief-grid">
                    <article
                        v-for="belief in beliefs"
                        :key="belief.id"
                        :ref="(el) => setBeliefRef(el, belief.id)"
                        class="belief-card glass-panel reveal reveal-up"
                        :class="{ 'is-visible': visibleBeliefs[belief.id] }"
                    >
                        <div class="belief-number">
                            <font-awesome-icon :icon="['fas', belief.icon]" class="belief-number__icon" />
                            <span>{{ belief.number }}</span>
                        </div>

                        <h3>{{ belief.title }}</h3>
                        <p>{{ belief.description }}</p>

                        <div class="belief-support">
                            <span class="belief-support__label">
                                <font-awesome-icon :icon="['fas', 'book-bible']" />
                                Base bíblica
                            </span>

                            <div class="verse-list">
                                <button
                                    v-for="verse in belief.verses"
                                    :key="verse.ref"
                                    type="button"
                                    class="verse-chip"
                                    @mouseenter="showTooltip($event, verse)"
                                    @mouseleave="hideTooltip"
                                    @focus="showTooltip($event, verse)"
                                    @blur="hideTooltip"
                                >
                                    <font-awesome-icon :icon="['fas', 'quote-left']" class="verse-chip__icon" />
                                    {{ verse.ref }}
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <div
            v-if="tooltip.visible"
            class="verse-tooltip"
            :style="{
                top: `${tooltip.y}px`,
                left: `${tooltip.x}px`,
            }"
        >
            <strong>{{ tooltip.ref }}</strong>
            <p>{{ tooltip.text }}</p>
        </div>
    </main>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { beliefs } from '@/data/beliefs'

const heroRef = ref(null)
const introRef = ref(null)
const headingRef = ref(null)

const beliefRefs = ref({})

const visible = reactive({
    hero: false,
    intro: false,
    heading: false,
})

const visibleBeliefs = reactive({})

beliefs.forEach((belief) => {
    visibleBeliefs[belief.id] = false
})

const tooltip = reactive({
    visible: false,
    x: 0,
    y: 0,
    ref: '',
    text: '',
})

let observer = null

const setBeliefRef = (el, id) => {
    if (el) {
        beliefRefs.value[id] = el
    }
}

const showTooltip = (event, verse) => {
    const rect = event.currentTarget.getBoundingClientRect()

    tooltip.visible = true
    tooltip.ref = verse.ref
    tooltip.text = verse.text || verse.content || 'Referencia bíblica'
    tooltip.x = rect.left + rect.width / 2
    tooltip.y = rect.top + window.scrollY - 12
}

const hideTooltip = () => {
    tooltip.visible = false
}

onMounted(async () => {
    await nextTick()

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
        visible.hero = true
        visible.intro = true
        visible.heading = true

        beliefs.forEach((belief) => {
            visibleBeliefs[belief.id] = true
        })
        return
    }

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return

                const target = entry.target

                if (target === heroRef.value) visible.hero = true
                if (target === introRef.value) visible.intro = true
                if (target === headingRef.value) visible.heading = true

                beliefs.forEach((belief) => {
                    if (target === beliefRefs.value[belief.id]) {
                        visibleBeliefs[belief.id] = true
                    }
                })

                observer?.unobserve(target)
            })
        },
        {
            threshold: 0.16,
            rootMargin: '0px 0px -40px 0px',
        }
    )

    const elements = [
        heroRef.value,
        introRef.value,
        headingRef.value,
        ...Object.values(beliefRefs.value),
    ].filter(Boolean)

    elements.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
    if (observer) observer.disconnect()
})
</script>

<style scoped>
.institucional-page {
    padding-top: 110px;
    min-height: 100vh;
    color: var(--theme-text);
    background:
        radial-gradient(circle at top center, rgba(203, 164, 94, 0.12), transparent 30%),
        linear-gradient(180deg, #08131d 0%, #0d1d2c 55%, #0a1622 100%);
}

/* =========================
   REVEAL ON SCROLL
   ========================= */
.reveal {
    opacity: 0;
    will-change: transform, opacity;
    transition:
        opacity 0.85s ease,
        transform 0.85s cubic-bezier(0.22, 1, 0.36, 1),
        filter 0.85s ease;
}

.reveal-up {
    transform: translateY(34px);
    filter: blur(8px);
}

.reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
}

/* =========================
   SECCIONES
   ========================= */
.hero-section,
.intro-section,
.beliefs-section {
    padding: 0 0 3.5rem;
}

.hero-section {
    padding-top: 1.5rem;
    padding-bottom: 3rem;
}

/* =========================
   HERO
   ========================= */
.hero-content {
    max-width: 920px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hero-content h1 {
    margin: 0.4rem 0 1rem;
    font-size: clamp(2.5rem, 5vw, 4.3rem);
    line-height: 1.03;
    letter-spacing: -0.02em;
}

.hero-content h1 span {
    color: var(--theme-secondary);
}

.hero-text {
    max-width: 780px;
    margin: 0 auto;
    color: var(--theme-text-soft);
    line-height: 1.9;
    font-size: 1.04rem;
}

/* =========================
   SUBNAV
   ========================= */
.subnav {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    flex-wrap: wrap;
    margin-top: 1.5rem;
}

.subnav-link {
    text-decoration: none;
    color: var(--theme-text);
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
    padding: 0.78rem 1.08rem;
    border-radius: 999px;
    font-weight: 700;
    transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        background 0.25s ease,
        box-shadow 0.25s ease;
}

.subnav-link:hover {
    transform: translateY(-2px);
    border-color: rgba(203, 164, 94, 0.32);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
}

/* =========================
   INTRO
   ========================= */
.intro-card {
    max-width: 1080px;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 26px;
    position: relative;
    overflow: hidden;
}

.intro-card::before,
.belief-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(203, 164, 94, 0.10), transparent 42%, transparent 100%);
    pointer-events: none;
    z-index: 0;
}

.intro-card__content,
.belief-number,
.belief-card h3,
.belief-card p,
.belief-support {
    position: relative;
    z-index: 2;
}

.intro-card__content {
    max-width: 860px;
}

.intro-card h2 {
    margin: 0.35rem 0 0.9rem;
    font-size: clamp(1.7rem, 3vw, 2.5rem);
    line-height: 1.18;
}

.intro-card p:last-child {
    margin-bottom: 0;
    color: var(--theme-text-soft);
    line-height: 1.85;
}

/* =========================
   SECTION HEADING
   ========================= */
.section-heading {
    text-align: center;
    max-width: 860px;
    margin: 0 auto 1.6rem;
}

.section-heading h2 {
    margin: 0.35rem 0 0.8rem;
    font-size: clamp(1.8rem, 3vw, 2.7rem);
    line-height: 1.15;
}

.section-description {
    color: var(--theme-text-soft);
    line-height: 1.85;
    margin: 0;
}

/* =========================
   BELIEFS GRID
   ========================= */
.belief-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
}

.belief-card {
    position: relative;
    overflow: hidden;
    border-radius: 24px;
    padding: 1.45rem;
    min-height: 100%;
    transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        box-shadow 0.25s ease;
}

.belief-card:hover {
    transform: translateY(-4px);
    border-color: rgba(203, 164, 94, 0.28);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.24);
}

.belief-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.42rem;
    min-width: 70px;
    height: 54px;
    padding: 0 0.9rem;
    border-radius: 15px;
    margin-bottom: 1rem;
    background: rgba(203, 164, 94, 0.12);
    color: var(--theme-secondary);
    border: 1px solid rgba(203, 164, 94, 0.2);
    font-weight: 800;
    letter-spacing: 0.08em;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.belief-number__icon {
    font-size: 0.78rem;
    opacity: 0.9;
}

.belief-card h3 {
    margin: 0 0 0.8rem;
    font-size: 1.2rem;
    line-height: 1.2;
}

.belief-card p {
    margin: 0;
    color: var(--theme-text-soft);
    line-height: 1.82;
}

.belief-support {
    margin-top: 1.15rem;
    padding-top: 0.95rem;
    border-top: 1px solid rgba(203, 164, 94, 0.14);
}

.belief-support__label {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--theme-secondary);
}

.verse-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    margin-top: 0.9rem;
}

.verse-chip {
    border: 1px solid rgba(203, 164, 94, 0.18);
    background: rgba(255, 255, 255, 0.03);
    color: var(--theme-text);
    padding: 0.6rem 0.85rem;
    border-radius: 999px;
    cursor: pointer;
    font-size: 0.9rem;
    transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        background 0.2s ease;
}

.verse-chip:hover,
.verse-chip:focus-visible {
    transform: translateY(-2px);
    border-color: rgba(203, 164, 94, 0.4);
    background: rgba(203, 164, 94, 0.08);
    outline: none;
}

.verse-chip__icon {
    margin-right: 0.35rem;
    font-size: 0.72rem;
    opacity: 0.8;
}

.verse-tooltip {
    position: absolute;
    z-index: 50;
    transform: translate(-50%, -100%);
    max-width: 340px;
    width: max-content;
    padding: 0.9rem 1rem;
    border-radius: 16px;
    background: rgba(7, 16, 24, 0.96);
    color: var(--theme-text);
    border: 1px solid rgba(203, 164, 94, 0.22);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
    pointer-events: none;
    backdrop-filter: blur(16px);
}

.verse-tooltip strong {
    display: block;
    margin-bottom: 0.45rem;
    color: var(--theme-secondary);
    font-size: 0.84rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.verse-tooltip p {
    margin: 0;
    line-height: 1.65;
    color: var(--theme-text-soft);
    font-size: 0.94rem;
}

/* =========================
   GOLD SHIMMER EFFECT
   ========================= */
.intro-card::after,
.belief-card::after {
    content: "";
    position: absolute;
    top: -120%;
    left: -65%;
    width: 52%;
    height: 280%;
    pointer-events: none;
    opacity: 0;
    transform: rotate(24deg);
    z-index: 1;
    background: linear-gradient(
        110deg,
        transparent 0%,
        transparent 38%,
        rgba(203, 164, 94, 0.03) 44%,
        rgba(203, 164, 94, 0.14) 49%,
        rgba(255, 245, 220, 0.22) 50%,
        rgba(203, 164, 94, 0.14) 51%,
        rgba(203, 164, 94, 0.03) 56%,
        transparent 62%,
        transparent 100%
    );
}

.reveal.is-visible.intro-card::after,
.reveal.is-visible.belief-card::after {
    animation: goldSweep 1.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes goldSweep {
    0% {
        left: -70%;
        opacity: 0;
    }

    12% {
        opacity: 0.75;
    }

    55% {
        opacity: 1;
    }

    100% {
        left: 130%;
        opacity: 0;
    }
}

/* =========================
   RESPONSIVE
   ========================= */
@media (max-width: 900px) {
    .belief-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 700px) {
    .institucional-page {
        padding-top: 95px;
    }

    .hero-section {
        padding-top: 1rem;
    }

    .intro-card,
    .belief-card {
        padding: 1.15rem;
    }

    .subnav {
        flex-direction: column;
        width: 100%;
    }

    .subnav-link {
        width: 100%;
        text-align: center;
    }

    .hero-text,
    .section-description,
    .intro-card p:last-child,
    .belief-card p {
        line-height: 1.75;
    }

    .verse-tooltip {
        max-width: 280px;
    }

    .reveal,
    .reveal-up,
    .reveal.is-visible {
        filter: none;
    }
}

@media (prefers-reduced-motion: reduce) {
    .reveal,
    .reveal-up,
    .reveal.is-visible,
    .subnav-link,
    .belief-card,
    .verse-chip {
        transition: none !important;
        transform: none !important;
        opacity: 1 !important;
        filter: none !important;
    }

    .intro-card::after,
    .belief-card::after {
        animation: none !important;
        opacity: 0 !important;
    }
}
</style>