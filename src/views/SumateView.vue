<template>
    <main class="sumate-page">
        <!-- HERO -->
        <section class="section-container section-block sumate-hero">
            <div class="glass-panel sumate-hero__panel">
                <div class="sumate-hero__copy">
                    <p class="section-eyebrow">Súmate</p>
                    <h1>Súmate a la Misión</h1>
                    <p class="sumate-hero__text">
                        Queremos conocer los dones, talentos, conocimientos y disposición de
                        hermanos y hermanas que deseen apoyar distintas áreas de nuestra misión.
                        Aquí se publicarán convocatorias abiertas para servir en departamentos,
                        proyectos e iniciativas especiales.
                    </p>
                </div>

                <aside class="card sumate-hero__highlight">
                    <p class="sumate-hero__label">Convocatorias abiertas</p>
                    <h2>Espacios para servir</h2>
                    <p>
                        Esta sección reúne llamados a colaboración en áreas como salud,
                        comunicaciones, enseñanza, apoyo técnico, eventos y otros servicios
                        relevantes para la obra.
                    </p>
                </aside>
            </div>
        </section>

        <!-- FILTROS -->
        <section class="section-container sumate-toolbar">
            <div class="card sumate-toolbar__inner">
                <button v-for="filter in filters" :key="filter.value" type="button" class="sumate-filter"
                    :class="{ 'sumate-filter--active': activeFilter === filter.value }"
                    @click="activeFilter = filter.value">
                    {{ filter.label }}
                </button>
            </div>
        </section>

        <!-- DESTACADA -->
        <section v-if="featuredCall" class="section-container section-block sumate-featured">
            <article class="glass-panel sumate-featured__card">
                <div class="sumate-featured__content">
                    <div class="sumate-featured__top">
                        <span class="sumate-status-badge" :class="{
                            'sumate-status-badge--open': featuredCall.status === 'abierta',
                            'sumate-status-badge--closed': featuredCall.status === 'cerrada'
                        }">
                            {{ featuredCall.status === 'abierta' ? 'Abierta' : 'Cerrada' }}
                        </span>

                        <span class="chip">{{ featuredCall.department }}</span>
                    </div>

                    <h2>{{ featuredCall.title }}</h2>

                    <p class="sumate-featured__meta">
                        {{ featuredCall.area }} · {{ featuredCall.region }}
                    </p>

                    <p class="sumate-featured__summary">
                        {{ featuredCall.summary }}
                    </p>

                    <div class="sumate-featured__actions">
                        <button type="button" class="btn-secondary" @click="openCall(featuredCall)">
                            Ver detalle
                        </button>

                        <a v-if="featuredCall.formUrl" :href="featuredCall.formUrl" target="_blank"
                            rel="noopener noreferrer" class="btn-primary">
                            Ir al formulario
                        </a>
                    </div>
                </div>
            </article>
        </section>

        <!-- GRID -->
        <section class="section-container section-block">
            <div class="section-heading">
                <p class="section-eyebrow">Llamados vigentes</p>
                <h2 class="section-title">Convocatorias y necesidades</h2>
                <p class="section-description">
                    Revise aquí los llamados de apoyo que distintos departamentos e iniciativas
                    de la misión puedan requerir.
                </p>
            </div>

            <div v-if="filteredCalls.length" class="sumate-grid">
                <article v-for="item in filteredCalls" :key="item.id" class="sumate-card card">
                    <div class="sumate-card__top">
                        <span class="sumate-status-badge" :class="{
                            'sumate-status-badge--open': item.status === 'abierta',
                            'sumate-status-badge--closed': item.status === 'cerrada'
                        }">
                            {{ item.status === 'abierta' ? 'Abierta' : 'Cerrada' }}
                        </span>

                        <span class="chip">{{ item.department }}</span>
                    </div>

                    <div class="sumate-card__body">
                        <h3>{{ item.title }}</h3>
                        <p class="sumate-card__meta">{{ item.area }} · {{ item.region }}</p>
                        <p class="sumate-card__summary">{{ item.summary }}</p>

                        <div class="sumate-card__actions">
                            <button type="button" class="btn-secondary" @click="openCall(item)">
                                Ver detalle
                            </button>

                            <a v-if="item.formUrl" :href="item.formUrl" target="_blank" rel="noopener noreferrer"
                                class="btn-primary">
                                Postular
                            </a>
                        </div>
                    </div>
                </article>
            </div>

            <div v-else class="glass-panel sumate-empty">
                <h3>No hay convocatorias en esta categoría</h3>
                <p>
                    Cuando existan nuevos llamados, aparecerán aquí publicados.
                </p>
            </div>
        </section>

        <!-- MODAL -->
        <Teleport to="body">
            <Transition name="sumate-modal-fade">
                <div v-if="selectedCall" class="sumate-modal" @click.self="closeCall">
                    <div class="sumate-modal__dialog glass-panel--strong">
                        <button type="button" class="sumate-modal__close" aria-label="Cerrar" @click="closeCall">
                            ×
                        </button>

                        <div class="sumate-modal__content">
                            <div class="sumate-modal__top">
                                <span class="sumate-status-badge" :class="{
                                    'sumate-status-badge--open': selectedCall.status === 'abierta',
                                    'sumate-status-badge--closed': selectedCall.status === 'cerrada'
                                }">
                                    {{ selectedCall.status === 'abierta' ? 'Abierta' : 'Cerrada' }}
                                </span>

                                <span class="chip">{{ selectedCall.department }}</span>
                            </div>

                            <h2>{{ selectedCall.title }}</h2>

                            <div class="sumate-modal__meta">
                                <p><strong>Área:</strong> {{ selectedCall.area }}</p>
                                <p><strong>Región / alcance:</strong> {{ selectedCall.region }}</p>
                                <p><strong>Perfil requerido:</strong> {{ selectedCall.profile }}</p>
                            </div>

                            <p class="sumate-modal__description">
                                {{ selectedCall.description }}
                            </p>

                            <div v-if="selectedCall.requirements?.length" class="sumate-modal__requirements">
                                <h3>Requisitos o consideraciones</h3>
                                <ul>
                                    <li v-for="(requirement, index) in selectedCall.requirements" :key="index">
                                        {{ requirement }}
                                    </li>
                                </ul>
                            </div>

                            <div class="sumate-modal__actions">
                                <a v-if="selectedCall.formUrl" :href="selectedCall.formUrl" target="_blank"
                                    rel="noopener noreferrer" class="btn-primary">
                                    Ir al formulario
                                </a>

                                <button type="button" class="btn-secondary" @click="closeCall">
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </main>
</template>

<script setup>
import { computed, ref } from 'vue'

const activeFilter = ref('all')
const selectedCall = ref(null)

const filters = [
    { label: 'Todas', value: 'all' },
    { label: 'Abiertas', value: 'abierta' },
    { label: 'Salud', value: 'salud' },
    { label: 'RRSS', value: 'rrss' },
    { label: 'SEM', value: 'sem' },
    { label: 'Otros', value: 'otros' }
]

const calls = [
    {
        id: 1,
        title: 'Convocatoria para profesionales de salud y TENS',
        department: 'Departamento de Salud',
        area: 'Salud',
        region: 'Convocatoria nacional',
        profile: 'Profesionales de salud, TENS y apoyo relacionado',
        status: 'abierta',
        summary:
            'Se convoca a hermanos y hermanas del área salud para apoyar futuras iniciativas y coordinación ministerial.',
        description:
            'El Departamento de Salud requiere identificar hermanos y hermanas que cuenten con formación o experiencia en áreas de salud, con el fin de coordinar apoyos, redes de servicio y futuras iniciativas ministeriales.',
        requirements: [
            'Indicar profesión, especialidad u oficio relacionado.',
            'Señalar región o ciudad de residencia.',
            'Dejar datos de contacto actualizados.',
            'La inscripción no implica asignación inmediata.'
        ],
        formUrl: 'https://forms.google.com',
        categoryKey: 'salud',
        featured: true
    },
    {
        id: 2,
        title: 'Apoyo para Redes Sociales y Comunicaciones',
        department: 'RRSS / Comunicaciones',
        area: 'Redes Sociales',
        region: 'Convocatoria nacional',
        profile: 'Diseño, edición, redacción, fotografía, video o gestión digital',
        status: 'abierta',
        summary:
            'Se buscan hermanos y hermanas con experiencia o disposición para colaborar en redes sociales y comunicación institucional.',
        description:
            'Se requiere apoyo en áreas relacionadas con publicaciones, diseño gráfico, redacción, fotografía, video, cobertura de actividades y gestión de contenidos digitales de la misión.',
        requirements: [
            'Interés por servir en el área comunicacional.',
            'Idealmente manejo de alguna herramienta digital.',
            'Disponibilidad para coordinación remota o por eventos.'
        ],
        formUrl: 'https://forms.google.com',
        categoryKey: 'rrss',
        featured: false
    },
    {
        id: 3,
        title: 'Convocatoria para maestros del SEM',
        department: 'SEM',
        area: 'Formación / Enseñanza',
        region: 'Convocatoria nacional',
        profile: 'Hermanos con experiencia en enseñanza bíblica o formación cristiana',
        status: 'abierta',
        summary:
            'Se invita a considerar hermanos con vocación de enseñanza para apoyar procesos formativos del SEM.',
        description:
            'El SEM busca identificar posibles colaboradores y maestros que puedan apoyar en instancias de enseñanza, formación y acompañamiento académico ministerial.',
        requirements: [
            'Experiencia en enseñanza bíblica o áreas afines.',
            'Disposición a coordinar con el equipo académico.',
            'Se evaluará perfil y necesidad según contexto.'
        ],
        formUrl: 'https://forms.google.com',
        categoryKey: 'sem',
        featured: false
    },
    {
        id: 4,
        title: 'Apoyo logístico para actividades nacionales',
        department: 'Coordinación Nacional',
        area: 'Servicio / Logística',
        region: 'Según actividad',
        profile: 'Voluntarios para apoyo operativo y coordinación',
        status: 'cerrada',
        summary:
            'Registro de apoyo para hermanos y hermanas dispuestos a colaborar en labores logísticas durante actividades especiales.',
        description:
            'Esta convocatoria estuvo orientada a conformar equipos de apoyo para acreditación, orden, recepción, asistencia general y coordinación en eventos nacionales.',
        requirements: [
            'Disponibilidad para servir en terreno.',
            'Buen trato y disposición al trabajo en equipo.'
        ],
        formUrl: '',
        categoryKey: 'otros',
        featured: false
    }
]

const featuredCall = computed(() => calls.find(item => item.featured) || null)

const filteredCalls = computed(() => {
    const base = calls.filter(item => !item.featured)

    if (activeFilter.value === 'all') return base
    if (activeFilter.value === 'abierta') return base.filter(item => item.status === 'abierta')

    return base.filter(item => item.categoryKey === activeFilter.value)
})

function openCall(item) {
    selectedCall.value = item
    document.body.style.overflow = 'hidden'
}

function closeCall() {
    selectedCall.value = null
    document.body.style.overflow = ''
}
</script>

<style scoped>
.sumate-page {
    min-height: 100vh;
    padding-bottom: 4rem;
}

.sumate-hero {
    padding-top: 1rem;
}

.sumate-hero__panel {
    display: grid;
    grid-template-columns: 1.45fr 0.95fr;
    gap: 1.5rem;
    padding: 2rem;
}

.sumate-hero__copy h1 {
    margin-bottom: 1rem;
    font-size: clamp(2.6rem, 5vw, 4.8rem);
    line-height: 1.02;
}

.sumate-hero__text {
    max-width: 65ch;
    margin-bottom: 0;
    color: var(--theme-text-soft);
    font-size: 1.06rem;
    line-height: 1.8;
}

.sumate-hero__highlight {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.sumate-hero__label {
    margin: 0 0 0.5rem;
    color: var(--theme-secondary);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.sumate-hero__highlight h2 {
    margin-bottom: 0.8rem;
}

.sumate-hero__highlight p:last-child {
    margin-bottom: 0;
    color: var(--theme-text-soft);
}

.sumate-toolbar {
    margin-top: -1rem;
    margin-bottom: 1rem;
}

.sumate-toolbar__inner {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1rem;
}

.sumate-filter {
    border: 1px solid var(--theme-border-subtle);
    background: rgba(255, 255, 255, 0.04);
    color: var(--theme-text);
    border-radius: var(--radius-pill);
    padding: 0.7rem 1rem;
    font-weight: 700;
    cursor: pointer;
    transition:
        background var(--transition-base),
        border-color var(--transition-base),
        transform var(--transition-base);
}

.sumate-filter:hover {
    transform: translateY(-2px);
    border-color: var(--theme-border-soft);
}

.sumate-filter--active {
    background: rgba(var(--theme-secondary-rgb), 0.16);
    color: var(--theme-secondary);
    border-color: var(--theme-border-strong);
}

.sumate-featured__card {
    padding: 2rem;
}

.sumate-featured__top,
.sumate-card__top,
.sumate-modal__top {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 1rem;
}

.sumate-featured__content h2 {
    margin-bottom: 0.75rem;
    font-size: clamp(1.9rem, 3vw, 3rem);
}

.sumate-featured__meta,
.sumate-card__meta {
    margin: 0 0 0.8rem;
    color: var(--theme-secondary);
    font-size: 0.92rem;
    font-weight: 700;
}

.sumate-featured__summary,
.sumate-card__summary {
    color: var(--theme-text-soft);
    line-height: 1.8;
}

.sumate-featured__summary {
    margin-bottom: 1.5rem;
}

.sumate-featured__actions,
.sumate-card__actions,
.sumate-modal__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
}

.sumate-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
}

.sumate-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1.2rem;
}

.sumate-card__body {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.sumate-card__body h3 {
    margin-bottom: 0.6rem;
    font-size: 1.2rem;
}

.sumate-card__summary {
    margin-bottom: 1rem;
    flex: 1;
}

.sumate-empty {
    padding: 2rem;
    text-align: center;
}

.sumate-empty h3 {
    margin-bottom: 0.5rem;
}

.sumate-empty p {
    margin: 0;
    color: var(--theme-text-soft);
}

.sumate-status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.42rem 0.8rem;
    border-radius: var(--radius-pill);
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.sumate-status-badge--open {
    background: rgba(108, 214, 141, 0.14);
    border: 1px solid rgba(108, 214, 141, 0.2);
    color: #9af0b0;
}

.sumate-status-badge--closed {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: var(--theme-text-soft);
}

.sumate-modal {
    position: fixed;
    inset: 0;
    z-index: 2500;
    display: grid;
    place-items: center;
    padding: 1.25rem;
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.sumate-modal__dialog {
    width: min(860px, 100%);
    max-height: 90vh;
    overflow: auto;
    position: relative;
}

.sumate-modal__close {
    position: sticky;
    top: 1rem;
    margin-left: auto;
    margin-right: 1rem;
    margin-top: 1rem;
    z-index: 2;
    width: 46px;
    height: 46px;
    border: 1px solid var(--theme-border-soft);
    border-radius: 50%;
    background: rgba(var(--theme-bg-rgb), 0.9);
    color: var(--theme-text);
    font-size: 1.8rem;
    line-height: 1;
    cursor: pointer;
}

.sumate-modal__content {
    padding: 1rem 1.5rem 2rem;
}

.sumate-modal__content h2 {
    margin-bottom: 1rem;
    font-size: clamp(1.8rem, 3vw, 2.7rem);
}

.sumate-modal__meta {
    display: grid;
    gap: 0.5rem;
    margin-bottom: 1.2rem;
}

.sumate-modal__meta p {
    margin: 0;
    color: var(--theme-text-soft);
}

.sumate-modal__description {
    margin-bottom: 1rem;
    color: var(--theme-text-soft);
    line-height: 1.85;
}

.sumate-modal__requirements h3 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

.sumate-modal__requirements ul {
    margin: 0 0 1.25rem;
    padding-left: 1.2rem;
}

.sumate-modal__requirements li {
    margin-bottom: 0.45rem;
    color: var(--theme-text-soft);
}

.sumate-modal-fade-enter-active,
.sumate-modal-fade-leave-active {
    transition: opacity 0.28s ease;
}

.sumate-modal-fade-enter-from,
.sumate-modal-fade-leave-to {
    opacity: 0;
}

@media (max-width: 1100px) {
    .sumate-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 900px) {
    .sumate-hero__panel {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 700px) {
    .sumate-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .sumate-page {
        padding-bottom: 3rem;
    }

    .sumate-hero__panel,
    .sumate-featured__card,
    .sumate-modal__content {
        padding: 1.25rem;
    }

    .sumate-toolbar__inner {
        padding: 0.8rem;
    }

    .sumate-filter {
        width: 100%;
    }

    .sumate-featured__actions,
    .sumate-card__actions,
    .sumate-modal__actions {
        flex-direction: column;
    }
}
</style>