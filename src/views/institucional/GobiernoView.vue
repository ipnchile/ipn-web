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
                            <button
                                v-for="persona in directorioNacional"
                                :key="persona.cargo"
                                type="button"
                                class="person-item"
                                @click="openPersonModal(persona, 'Directorio Nacional')"
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
                            </button>
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
                            <button
                                v-for="persona in tribunalEtica"
                                :key="persona.cargo + persona.nombre"
                                type="button"
                                class="person-item"
                                @click="openPersonModal(persona, 'Tribunal de Ética y Disciplina')"
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
                            </button>
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

        <Transition name="person-modal-fade">
            <div
                v-if="selectedPerson"
                class="person-modal"
                role="dialog"
                aria-modal="true"
                :aria-label="`Información de ${selectedPerson.nombre || selectedPerson.cargo}`"
                @click.self="closePersonModal"
            >
                <div class="person-modal__dialog glass-panel--strong">
                    <button
                        type="button"
                        class="person-modal__close"
                        aria-label="Cerrar"
                        @click="closePersonModal"
                    >
                        ×
                    </button>

                    <div class="person-modal__photo-wrap">
                        <img
                            v-if="selectedPerson.foto"
                            :src="selectedPerson.foto"
                            :alt="selectedPerson.nombre || selectedPerson.cargo"
                            class="person-modal__photo"
                        />
                        <div v-else class="person-modal__photo person-modal__photo--fallback">
                            <font-awesome-icon :icon="['fas', 'user']" />
                        </div>
                    </div>

                    <div class="person-modal__content">
                        <p class="section-eyebrow">{{ selectedPerson.area }}</p>
                        <h2>{{ selectedPerson.nombre || 'Información en actualización' }}</h2>
                        <p class="person-modal__role">{{ selectedPerson.cargo }}</p>
                    </div>
                </div>
            </div>
        </Transition>
    </main>
</template>

<script setup>
import { computed, reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useDirectory } from '@/composables/useDirectory'
const { authorities } = useDirectory()




const directorioNacional = computed(() => authorities.value.filter(p => p.area === 'directorio'))

const tribunalEtica = computed(() => authorities.value.filter(p => p.area === 'tribunal'))

const selectedPerson = ref(null)
let previousBodyOverflow = ''

const openPersonModal = (persona, area) => {
    previousBodyOverflow = document.body.style.overflow
    selectedPerson.value = {
        ...persona,
        area,
    }
    document.body.style.overflow = 'hidden'
}

const closePersonModal = () => {
    selectedPerson.value = null
    document.body.style.overflow = previousBodyOverflow
}

const handleModalKeydown = (event) => {
    if (event.key === 'Escape' && selectedPerson.value) {
        closePersonModal()
    }
}

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
    window.addEventListener('keydown', handleModalKeydown)

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
    window.removeEventListener('keydown', handleModalKeydown)
    document.body.style.overflow = previousBodyOverflow
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
    width: 100%;
    display: flex;
    align-items: center;
    text-align: left;
    gap: 0.9rem;
    padding: 0.75rem 0.85rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: inherit;
    cursor: pointer;
    transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        background 0.25s ease,
        box-shadow 0.25s ease;
}

.person-item:hover,
.person-item:focus-visible {
    transform: translateX(4px);
    border-color: rgba(203, 164, 94, 0.32);
    background: rgba(255, 255, 255, 0.065);
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.18);
}

.person-item:focus-visible {
    outline: none;
    box-shadow:
        0 0 0 3px rgba(203, 164, 94, 0.2),
        0 12px 26px rgba(0, 0, 0, 0.18);
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
   MODAL PERSONA
   ========================= */
.person-modal {
    position: fixed;
    inset: 0;
    z-index: 2000;
    display: grid;
    place-items: center;
    padding: 1.25rem;
    background: rgba(3, 8, 13, 0.78);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
}

.person-modal__dialog {
    position: relative;
    width: min(920px, 100%);
    max-height: min(760px, calc(100vh - 2.5rem));
    display: grid;
    grid-template-columns: minmax(260px, 0.88fr) minmax(280px, 1fr);
    overflow: hidden;
    border-radius: 24px;
}

.person-modal__close {
    position: absolute;
    top: 0.85rem;
    right: 0.85rem;
    z-index: 2;
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(0, 0, 0, 0.34);
    color: #fff;
    font-size: 1.7rem;
    line-height: 1;
    cursor: pointer;
    transition:
        transform 0.2s ease,
        background 0.2s ease,
        border-color 0.2s ease;
}

.person-modal__close:hover,
.person-modal__close:focus-visible {
    transform: scale(1.04);
    border-color: rgba(203, 164, 94, 0.45);
    background: rgba(203, 164, 94, 0.22);
    outline: none;
}

.person-modal__photo-wrap {
    min-height: 520px;
    background:
        radial-gradient(circle at top, rgba(203, 164, 94, 0.15), transparent 58%),
        rgba(255, 255, 255, 0.03);
}

.person-modal__photo {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center 16%;
}

.person-modal__photo--fallback {
    display: grid;
    place-items: center;
    color: var(--theme-secondary);
    font-size: 4rem;
}

.person-modal__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(1.5rem, 4vw, 3rem);
}

.person-modal__content h2 {
    margin: 0.35rem 0 0.9rem;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    line-height: 1.08;
}

.person-modal__role {
    margin: 0;
    color: var(--theme-text-soft);
    font-size: 1.05rem;
    font-weight: 700;
}

.person-modal-fade-enter-active,
.person-modal-fade-leave-active {
    transition: opacity 0.24s ease;
}

.person-modal-fade-enter-active .person-modal__dialog,
.person-modal-fade-leave-active .person-modal__dialog {
    transition: transform 0.24s ease, opacity 0.24s ease;
}

.person-modal-fade-enter-from,
.person-modal-fade-leave-to {
    opacity: 0;
}

.person-modal-fade-enter-from .person-modal__dialog,
.person-modal-fade-leave-to .person-modal__dialog {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
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
        transform: none;
    }

    .person-item:hover,
    .person-item:focus-visible {
        transform: none;
    }

    .person-modal {
        align-items: end;
        padding: 0.75rem;
    }

    .person-modal__dialog {
        grid-template-columns: 1fr;
        width: 100%;
        max-height: calc(100vh - 1.5rem);
        overflow-y: auto;
        border-radius: 20px;
    }

    .person-modal__photo-wrap {
        min-height: 360px;
        max-height: 56vh;
    }

    .person-modal__content {
        padding: 1.35rem;
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
