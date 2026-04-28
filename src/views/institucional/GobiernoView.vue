<template>
    <main class="institucional-page">
        <section class="hero-section">
            <div class="section-container">
                <div ref="heroRef" class="hero-content reveal reveal-up" :class="{ 'is-visible': visible.hero }">
                    <p class="section-eyebrow">Institucional</p>

                    <h1>Gobierno <span>Institucional</span></h1>

                    <p class="hero-text">
                        La Iglesia Pentecostal Nazareth se organiza conforme a sus estatutos y reglamentos,
                        procurando resguardar el orden, la unidad, la sana administración y la disciplina eclesiástica,
                        para servir con fidelidad a Dios y edificar a Su Iglesia.
                    </p>

                    <div class="subnav">
                        <RouterLink to="/quienes-somos" class="subnav-link">
                            Quiénes Somos
                        </RouterLink>

                        <RouterLink to="/quienes-somos/fe" class="subnav-link">
                            Lo que Creemos
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
                        <p class="section-eyebrow">Estructura y Orden</p>
                        <h2>Una organización al servicio de la vida espiritual y administrativa de la Iglesia</h2>
                        <p>
                            Conforme a sus estatutos, la Iglesia cuenta con autoridades, órganos de apoyo
                            y cuerpos de servicio que colaboran en la dirección, administración, disciplina
                            y acompañamiento pastoral de la obra. Esta estructura busca preservar el buen
                            funcionamiento Institucional y fortalecer la comunión del cuerpo de Cristo.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="org-section">
            <div class="section-container">
                <div
                    ref="orgHeadingRef"
                    class="section-heading reveal reveal-up"
                    :class="{ 'is-visible': visible.orgHeading }"
                >
                    <p class="section-eyebrow">Autoridades</p>
                    <h2>Órganos formales de la Iglesia</h2>
                    <p class="section-description">
                        Entre las instancias establecidas en la organización institucional se encuentran
                        las Conferencias, el Directorio Nacional, el Pastor Presidente, el Tribunal de Ética
                        y Disciplina, los Superintendentes de Zona y otros cuerpos de apoyo conforme al marco estatutario.
                    </p>
                </div>

                <div class="org-grid">
                    <article
                        ref="orgCard1Ref"
                        class="org-card glass-panel reveal reveal-up delay-1"
                        :class="{ 'is-visible': visible.orgCard1 }"
                    >
                        <div class="org-card__header">
                            <p class="section-eyebrow">Dirección Nacional</p>
                            <h3>Directorio Nacional</h3>
                        </div>

                        <p class="org-card__text">
                            El Directorio Nacional está compuesto por siete miembros y cumple una función clave
                            en la conducción administrativa e institucional de la Iglesia.
                        </p>

                        <div class="people-list-modern">
                            <div
                                v-for="persona in directorioNacional"
                                :key="persona.cargo"
                                class="person-item"
                            >
                                <div class="person-avatar">
                                    <img
                                        v-if="persona.foto"
                                        :src="persona.foto"
                                        :alt="persona.nombre || persona.cargo"
                                        class="person-avatar__img"
                                    />
                                    <div v-else class="person-avatar__fallback">
                                        <font-awesome-icon :icon="['fas', 'user']" />
                                    </div>
                                </div>

                                <div class="person-info">
                                    <p class="person-role">{{ persona.cargo }}</p>
                                    <p class="person-name">
                                        {{ persona.nombre || 'Información en actualización' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article
                        ref="orgCard2Ref"
                        class="org-card glass-panel reveal reveal-up delay-2"
                        :class="{ 'is-visible': visible.orgCard2 }"
                    >
                        <div class="org-card__header">
                            <p class="section-eyebrow">Disciplina y Testimonio</p>
                            <h3>Tribunal de Ética y Disciplina</h3>
                        </div>

                        <p class="org-card__text">
                            Este tribunal está conformado por cinco Presbíteros elegidos en Conferencia Anual.
                            Su labor es conocer materias disciplinarias, velar por el orden e informar respecto
                            de la idoneidad para determinados cargos eclesiásticos.
                        </p>

                        <div class="people-list-modern">
                            <div
                                v-for="persona in tribunalEtica"
                                :key="persona.cargo + persona.nombre"
                                class="person-item"
                            >
                                <div class="person-avatar">
                                    <img
                                        v-if="persona.foto"
                                        :src="persona.foto"
                                        :alt="persona.nombre || persona.cargo"
                                        class="person-avatar__img"
                                    />
                                    <div v-else class="person-avatar__fallback">
                                        <font-awesome-icon :icon="['fas', 'user']" />
                                    </div>
                                </div>

                                <div class="person-info">
                                    <p class="person-role">{{ persona.cargo }}</p>
                                    <p class="person-name">
                                        {{ persona.nombre || 'Información en actualización' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section class="teams-section">
            <div class="section-container">
                <div
                    ref="teamsHeadingRef"
                    class="section-heading reveal reveal-up"
                    :class="{ 'is-visible': visible.teamsHeading }"
                >
                    <p class="section-eyebrow">Cuerpos de Servicio</p>
                    <h2>Instancias de apoyo y colaboración</h2>
                    <p class="section-description">
                        La labor institucional también se desarrolla mediante equipos, instancias de coordinación
                        y cuerpos de apoyo que permiten acompañar la vida local, zonal y nacional de la Iglesia.
                    </p>
                </div>

                <div class="teams-grid">
                    <article
                        ref="team1Ref"
                        class="team-card glass-panel reveal reveal-up delay-1"
                        :class="{ 'is-visible': visible.team1 }"
                    >
                        <div class="team-icon">✦</div>
                        <h3>Conferencias</h3>
                        <p>
                            Instancias formales de deliberación y acuerdo, incluyendo la Conferencia Anual
                            y la Conferencia Extraordinaria.
                        </p>
                    </article>

                    <article
                        ref="team2Ref"
                        class="team-card glass-panel reveal reveal-up delay-2"
                        :class="{ 'is-visible': visible.team2 }"
                    >
                        <div class="team-icon">✦</div>
                        <h3>Superintendentes de Zona</h3>
                        <p>
                            Colaboradores directos del Pastor Presidente en la supervisión, acompañamiento
                            y orientación de las Iglesias dentro de sus respectivas zonas.
                        </p>
                    </article>

                    <article
                        ref="team3Ref"
                        class="team-card glass-panel reveal reveal-up delay-3"
                        :class="{ 'is-visible': visible.team3 }"
                    >
                        <div class="team-icon">✦</div>
                        <h3>Pastores Asesores</h3>
                        <p>
                            Pastores que acompañan y orientan espiritualmente a los Departamentos Nacionales
                            en el cumplimiento de sus funciones y objetivos.
                        </p>
                    </article>

                    <article
                        ref="team4Ref"
                        class="team-card glass-panel reveal reveal-up delay-1"
                        :class="{ 'is-visible': visible.team4 }"
                    >
                        <div class="team-icon">✦</div>
                        <h3>Departamentos Nacionales</h3>
                        <p>
                            Áreas de servicio orientadas al desarrollo de distintos ámbitos de la vida eclesial,
                            conforme a lo establecido en los estatutos y reglamentos.
                        </p>
                    </article>

                    <article
                        ref="team5Ref"
                        class="team-card glass-panel reveal reveal-up delay-2"
                        :class="{ 'is-visible': visible.team5 }"
                    >
                        <div class="team-icon">✦</div>
                        <h3>Junta de Oficiales</h3>
                        <p>
                            Cuerpo de colaboración local que apoya al Pastor Gobernante en materias de orden,
                            administración y funcionamiento de cada Iglesia Local.
                        </p>
                    </article>

                    <article
                        ref="team6Ref"
                        class="team-card glass-panel reveal reveal-up delay-3"
                        :class="{ 'is-visible': visible.team6 }"
                    >
                        <div class="team-icon">✦</div>
                        <h3>Iglesias Locales</h3>
                        <p>
                            Cada congregación local desarrolla su vida espiritual e institucional bajo la dirección
                            de un Pastor Gobernante, conforme al marco estatutario vigente.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'




const directorioNacional = [
    {
        cargo: 'Pastor Presidente',
        nombre: 'Pr. Presbítero Rev. Rosamel Ceballo',
        foto: 'https://media.ipnchile.cl/perfiles/directorio/PRESIDENTE.webp'
    },
    {
        cargo: 'Pastor Vicepresidente',
        nombre: 'Pr. Presbítero Rev. Marco Alarcón',
        foto: 'https://media.ipnchile.cl/perfiles/directorio/VICEPRESIDENTE.webp'
    },
    {
        cargo: 'Pastor Secretario',
        nombre: 'Pr. Diacono Rev. Alejandro Molina',
        foto: 'https://media.ipnchile.cl/perfiles/directorio/SECRETARIO.webp'
    },
    {
        cargo: 'Pastor Tesorero',
        nombre: 'Pr. Presbítero Rev. Juan Montecino',
        foto: 'https://media.ipnchile.cl/perfiles/directorio/TESORERO.webp'
    },
    {
        cargo: 'Pastor Prosecretario',
        nombre: 'Pr. Diacono Rev. Andrés Sepulveda',
        foto: 'https://media.ipnchile.cl/perfiles/directorio/PROSECRETARIO.webp'
    },
    {
        cargo: 'Pastor Protesorero',
        nombre: 'Pr. Presbítero Rev. Guillermo Herrada',
        foto: 'https://media.ipnchile.cl/perfiles/directorio/PROTESORERO.webp'
    },
    {
        cargo: 'Pastor Director',
        nombre: 'Pr. Presbítero Rev. Pascual Silva',
        foto: 'https://media.ipnchile.cl/perfiles/directorio/DIRECTOR.webp'
    }
]

const tribunalEtica = [
    {
        cargo: 'Director',
        nombre: 'Pr. Presbítero Rev. Hernan Sepulveda',
        foto: 'https://media.ipnchile.cl/perfiles/tribunal/Pastor%20Hernan%20Sepulveda.webp'
    },
    {
        cargo: 'Secretario',
        nombre: 'Pr. Presbítero Rev. Luis Mondaca',
        foto: 'https://media.ipnchile.cl/perfiles/tribunal/Pastor%20Luis%20Mondaca.webp'
    },
    {
        cargo: 'Director',
        nombre: 'Pr. Presbítero Rev. Raúl Vidal',
        foto: 'https://media.ipnchile.cl/perfiles/tribunal/Pastor%20Raul%20Vidal.webp'
    },
    {
        cargo: 'Director',
        nombre: 'Pr. Presbítero Rev. Nelsón Mondaca',
        foto: 'https://media.ipnchile.cl/perfiles/tribunal/Pasto%20Nelson%20Mondaca.webp'
    },
    {
        cargo: 'Director',
        nombre: 'Pr. Presbítero Rev. Alex Brana',
        foto: 'https://media.ipnchile.cl/perfiles/tribunal/Pastor%20Alex%20Brana.webp'
    }
]

const heroRef = ref(null)
const introRef = ref(null)
const orgHeadingRef = ref(null)
const orgCard1Ref = ref(null)
const orgCard2Ref = ref(null)
const teamsHeadingRef = ref(null)
const team1Ref = ref(null)
const team2Ref = ref(null)
const team3Ref = ref(null)
const team4Ref = ref(null)
const team5Ref = ref(null)
const team6Ref = ref(null)

const visible = reactive({
    hero: false,
    intro: false,
    orgHeading: false,
    orgCard1: false,
    orgCard2: false,
    teamsHeading: false,
    team1: false,
    team2: false,
    team3: false,
    team4: false,
    team5: false,
    team6: false,
})

let observer = null

onMounted(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
        Object.keys(visible).forEach((key) => {
            visible[key] = true
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
                if (target === orgHeadingRef.value) visible.orgHeading = true
                if (target === orgCard1Ref.value) visible.orgCard1 = true
                if (target === orgCard2Ref.value) visible.orgCard2 = true
                if (target === teamsHeadingRef.value) visible.teamsHeading = true
                if (target === team1Ref.value) visible.team1 = true
                if (target === team2Ref.value) visible.team2 = true
                if (target === team3Ref.value) visible.team3 = true
                if (target === team4Ref.value) visible.team4 = true
                if (target === team5Ref.value) visible.team5 = true
                if (target === team6Ref.value) visible.team6 = true

                observer.unobserve(target)
            })
        },
        {
            threshold: 0.18,
            rootMargin: '0px 0px -40px 0px',
        }
    )

    const elements = [
        heroRef.value,
        introRef.value,
        orgHeadingRef.value,
        orgCard1Ref.value,
        orgCard2Ref.value,
        teamsHeadingRef.value,
        team1Ref.value,
        team2Ref.value,
        team3Ref.value,
        team4Ref.value,
        team5Ref.value,
        team6Ref.value,
    ]

    elements.forEach((el) => {
        if (el) observer.observe(el)
    })
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
    transform: translateY(36px);
    filter: blur(8px);
}

.reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
}

.delay-1 {
    transition-delay: 0.08s;
}

.delay-2 {
    transition-delay: 0.16s;
}

.delay-3 {
    transition-delay: 0.24s;
}

/* =========================
   SECCIONES
   ========================= */
.hero-section,
.intro-section,
.org-section,
.teams-section {
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
.org-card::before,
.team-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(203, 164, 94, 0.10), transparent 42%, transparent 100%);
    pointer-events: none;
}

.intro-card__content,
.org-card__header,
.org-card__text,
.people-list-modern,
.team-card h3,
.team-card p,
.team-icon {
    position: relative;
    z-index: 1;
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
   ORGANOS
   ========================= */
.org-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
}

.org-card {
    padding: 1.55rem;
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        box-shadow 0.25s ease;
}

.org-card:hover {
    transform: translateY(-4px);
    border-color: rgba(203, 164, 94, 0.28);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.24);
}

.org-card__header h3 {
    margin: 0.35rem 0 0;
    font-size: 1.4rem;
}

.org-card__text {
    color: var(--theme-text-soft);
    line-height: 1.8;
    margin-top: 1rem;
    margin-bottom: 0;
}

/* =========================
   PERSONAS CON FOTO
   ========================= */
.people-list-modern {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    margin-top: 1.2rem;
}

.person-item {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 0.75rem 0.85rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.person-avatar {
    width: 54px;
    min-width: 54px;
    height: 54px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid rgba(203, 164, 94, 0.28);
    background: rgba(255, 255, 255, 0.04);
    display: grid;
    place-items: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

.person-avatar__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.person-avatar__fallback {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    color: var(--theme-secondary);
    font-size: 1.1rem;
    background:
        radial-gradient(circle at top, rgba(203, 164, 94, 0.14), transparent 70%),
        rgba(255, 255, 255, 0.03);
}

.person-info {
    min-width: 0;
}

.person-role {
    margin: 0 0 0.18rem;
    font-size: 0.83rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--theme-secondary);
    font-weight: 800;
}

.person-name {
    margin: 0;
    color: var(--theme-text);
    line-height: 1.45;
    font-weight: 600;
}

/* =========================
   TEAMS
   ========================= */
.teams-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
}

.team-card {
    padding: 1.45rem;
    border-radius: 22px;
    position: relative;
    overflow: hidden;
    transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        box-shadow 0.25s ease;
}

.team-card:hover {
    transform: translateY(-4px);
    border-color: rgba(203, 164, 94, 0.24);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
}

.team-icon {
    width: 44px;
    height: 44px;
    border-radius: 13px;
    display: grid;
    place-items: center;
    margin-bottom: 1rem;
    background: rgba(203, 164, 94, 0.12);
    color: var(--theme-secondary);
    border: 1px solid rgba(203, 164, 94, 0.18);
    font-size: 1rem;
}

.team-card h3 {
    margin: 0 0 0.7rem;
    font-size: 1.16rem;
}

.team-card p {
    margin: 0;
    color: var(--theme-text-soft);
    line-height: 1.78;
}

/* =========================
   GOLD SHIMMER EFFECT
   ========================= */
.org-card,
.team-card,
.intro-card {
    position: relative;
    overflow: hidden;
}

.org-card::after,
.team-card::after,
.intro-card::after {
    content: "";
    position: absolute;
    top: -150%;
    left: -50%;
    width: 60%;
    height: 300%;
    background: linear-gradient(
        110deg,
        transparent 0%,
        transparent 40%,
        rgba(203, 164, 94, 0.08) 45%,
        rgba(203, 164, 94, 0.22) 50%,
        rgba(203, 164, 94, 0.08) 55%,
        transparent 60%,
        transparent 100%
    );
    transform: rotate(25deg);
    opacity: 0;
    pointer-events: none;
}

.reveal.is-visible.org-card::after,
.reveal.is-visible.team-card::after,
.reveal.is-visible.intro-card::after {
    animation: goldSweep 1.6s ease forwards;
}

@keyframes goldSweep {
    0% {
        opacity: 0;
        left: -60%;
    }
    20% {
        opacity: 1;
    }
    60% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        left: 120%;
    }
}

/* =========================
   RESPONSIVE
   ========================= */
@media (max-width: 1000px) {
    .org-grid,
    .teams-grid {
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
    .org-card,
    .team-card {
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
    .org-card__text,
    .team-card p {
        line-height: 1.75;
    }

    .person-item {
        align-items: flex-start;
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
    .org-card,
    .team-card {
        transition: none !important;
        transform: none !important;
        opacity: 1 !important;
        filter: none !important;
    }
}

.person-avatar {
    width: 64px;
    min-width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid rgba(203, 164, 94, 0.28);
    background: rgba(255, 255, 255, 0.04);
    display: grid;
    place-items: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

.person-avatar__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    display: block;
}
</style>