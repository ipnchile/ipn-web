<template>
    <main class="sem-page">
        <!-- HERO -->
        <section class="section-container section-block sem-hero">
            <div class="glass-panel sem-hero__panel">
                <div class="sem-hero__copy">
                    <p class="section-eyebrow">Órgano formativo institucional</p>
                    <h1>Seminario Eclesiástico Mayor</h1>

                    <p class="sem-hero__lead">
                        El Seminario Eclesiástico Mayor es un órgano formativo perteneciente
                        a la Iglesia Pentecostal Nazareth – IPN Chile, orientado a la formación
                        bíblica, doctrinal y ministerial de pastores, líderes, servidores y
                        miembros activos de la iglesia.
                    </p>

                    <div class="sem-hero__actions">
                        <a href="https://seminarioipn.cl/" target="_blank" rel="noopener noreferrer"
                            class="btn-primary">
                            Ir al sitio oficial
                        </a>

                        <a href="#programas" class="btn-secondary">
                            Ver programas
                        </a>
                    </div>
                </div>

                <aside class="card sem-hero__highlight">
                    <div class="sem-hero__logo-wrap">
                        <img v-if="seminarioLogo" :src="seminarioLogo" alt="Logo del Seminario Eclesiástico Mayor"
                            class="sem-hero__logo" />
                        <div v-else class="sem-hero__logo sem-hero__logo--placeholder">
                            <font-awesome-icon :icon="['fas', 'book-bible']" />
                        </div>
                    </div>

                    <p class="sem-hero__label">Formación bíblica y ministerial</p>
                    <h2>Estudia, prepárate y sirve con excelencia.</h2>
                    <p>
                        Para conocer requisitos, valores, procesos de matrícula y cursos
                        disponibles, visite la página oficial del SEM.
                    </p>
                </aside>
            </div>
        </section>

        <!-- IDENTIDAD -->
        <section id="identidad" class="section-container section-block">
            <div class="section-heading sem-heading-center">
                <p class="section-eyebrow">Identidad institucional</p>
                <h2 class="section-title">Un espacio de formación al servicio de la iglesia</h2>
                <p class="section-description sem-centered-text">
                    El SEM acompaña el crecimiento espiritual y académico de quienes desean
                    profundizar en el conocimiento de la Palabra de Dios, la doctrina cristiana
                    y el servicio dentro de la Iglesia Pentecostal Nazareth.
                </p>
            </div>

            <div class="sem-purpose-grid">
                <article class="glass-panel--soft sem-purpose-card">
                    <div class="sem-purpose-card__icon">
                        <font-awesome-icon :icon="['fas', 'book-open']" />
                    </div>
                    <h3>Formación bíblica</h3>
                    <p>
                        Enseñanza orientada al estudio sistemático de las Sagradas Escrituras,
                        fortaleciendo la comprensión bíblica y doctrinal.
                    </p>
                </article>

                <article class="glass-panel--soft sem-purpose-card">
                    <div class="sem-purpose-card__icon">
                        <font-awesome-icon :icon="['fas', 'church']" />
                    </div>
                    <h3>Servicio ministerial</h3>
                    <p>
                        Preparación para servir con mayor responsabilidad en la obra del Señor,
                        en armonía con la identidad y doctrina de la IPN Chile.
                    </p>
                </article>

                <article class="glass-panel--soft sem-purpose-card">
                    <div class="sem-purpose-card__icon">
                        <font-awesome-icon :icon="['fas', 'users']" />
                    </div>
                    <h3>Comunidad académica</h3>
                    <p>
                        Espacio de aprendizaje, acompañamiento docente y participación activa
                        mediante clases, materiales, tareas y trabajo formativo.
                    </p>
                </article>
            </div>
        </section>

        <!-- PROGRAMAS -->
        <section id="programas" class="section-container section-block">
            <div class="section-heading sem-heading-center">
                <p class="section-eyebrow">Programas disponibles</p>
                <h2 class="section-title">Cursos y formación SEM</h2>
                <p class="section-description sem-centered-text">
                    El Seminario cuenta con programas formativos para pastores, pastoras
                    y miembros activos de la Iglesia Pentecostal Nazareth. Para información
                    actualizada de generaciones, matrículas y valores, debe ingresar al sitio oficial.
                </p>
            </div>

            <div class="sem-program-grid">
                <article v-for="program in programs" :key="program.title" class="card sem-program-card">
                    <div class="sem-program-card__icon">
                        <font-awesome-icon :icon="program.icon" />
                    </div>

                    <div class="sem-program-card__body">
                        <p class="sem-program-card__type">{{ program.type }}</p>
                        <h3>{{ program.title }}</h3>
                        <p>{{ program.description }}</p>
                    </div>
                </article>
            </div>
        </section>

        <!-- CÓMO FUNCIONA -->
        <section class="section-container section-block">
            <div class="section-heading sem-heading-center">
                <p class="section-eyebrow">Metodología</p>
                <h2 class="section-title">¿Cómo funciona?</h2>
                <p class="section-description sem-centered-text">
                    El proceso formativo considera materiales de estudio, comunicación con
                    docentes, desarrollo de tareas y participación en instancias de aprendizaje.
                </p>
            </div>

            <div class="sem-steps-grid">
                <article v-for="step in steps" :key="step.title" class="glass-panel--soft sem-step-card">
                    <span>{{ step.number }}</span>
                    <h3>{{ step.title }}</h3>
                    <p>{{ step.description }}</p>
                </article>
            </div>
        </section>

        <!-- INVITACIÓN -->
        <section class="section-container section-block">
            <div class="glass-panel sem-callout">
                <p class="section-eyebrow">Inscripciones y consultas</p>
                <h2>¿Desea saber más del Seminario?</h2>
                <p>
                    Para conocer cursos disponibles, requisitos de ingreso, generaciones
                    activas y proceso de inscripción, visite el sitio oficial del Seminario
                    Eclesiástico Mayor.
                </p>

                <a href="https://seminarioipn.cl/" target="_blank" rel="noopener noreferrer" class="btn-primary">
                    Visitar seminarioipn.cl
                </a>
            </div>
        </section>
    </main>
</template>

<script setup>
import seminarioLogo from '@/assets/img/departamentos/SEM.png'

const programs = [
    {
        type: 'Programa académico',
        title: 'Diploma en Teología Bíblica',
        description:
            'Programa orientado al estudio bíblico y doctrinal para fortalecer la formación cristiana y ministerial.',
        icon: ['fas', 'graduation-cap']
    },
    {
        type: 'Formación para la iglesia',
        title: 'Cursos para miembros activos',
        description:
            'Instancias de aprendizaje dirigidas a hermanos y hermanas que desean profundizar su preparación para servir.',
        icon: ['fas', 'book-bible']
    },
    {
        type: 'Formación ministerial',
        title: 'Programas para pastores y líderes',
        description:
            'Espacios de capacitación pensados para apoyar el servicio pastoral, docente y ministerial dentro de la IPN.',
        icon: ['fas', 'person-chalkboard']
    }
]

const steps = [
    {
        number: '01',
        title: 'Materiales de estudio',
        description:
            'Acceso a contenidos y recursos preparados para cada lección.'
    },
    {
        number: '02',
        title: 'Comunicación docente',
        description:
            'Acompañamiento y orientación durante el proceso formativo.'
    },
    {
        number: '03',
        title: 'Tareas y evaluaciones',
        description:
            'Desarrollo de actividades que fortalecen el aprendizaje.'
    },
    {
        number: '04',
        title: 'Trabajo formativo',
        description:
            'Participación responsable en el proceso académico y espiritual.'
    }
]
</script>

<style scoped>
.sem-page {
    padding-bottom: 4rem;
}

.sem-hero {
    padding-top: 1rem;
}

.sem-hero__panel {
    display: grid;
    grid-template-columns: 1.45fr 0.95fr;
    gap: 1.5rem;
    padding: 2rem;
}

.sem-hero__copy h1 {
    margin-bottom: 1rem;
    font-size: clamp(2.4rem, 4.6vw, 4.5rem);
    line-height: 1.02;
}

.sem-hero__lead {
    max-width: 68ch;
    margin-bottom: 1.5rem;
    color: var(--theme-text-soft);
    font-size: 1.06rem;
    line-height: 1.75;
}

.sem-hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
}

.sem-hero__highlight {
    padding: 1.5rem;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.sem-hero__logo-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 1.2rem;
}

.sem-hero__logo {
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

.sem-hero__logo--placeholder {
    display: grid;
    place-items: center;
    color: var(--theme-secondary);
    font-size: 1.6rem;
}

.sem-hero__label {
    margin: 0 0 0.5rem;
    color: var(--theme-secondary);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.sem-hero__highlight h2 {
    margin-bottom: 0.8rem;
    color: var(--theme-accent);
}

.sem-hero__highlight p:last-child {
    margin-bottom: 0;
    color: var(--theme-text-soft);
}

.sem-heading-center {
    text-align: center;
}

.sem-centered-text {
    margin-inline: auto;
}

.sem-purpose-grid,
.sem-program-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.2rem;
}

.sem-purpose-card,
.sem-program-card,
.sem-step-card {
    height: 100%;
}

.sem-purpose-card {
    padding: 1.5rem;
}

.sem-purpose-card__icon,
.sem-program-card__icon {
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

.sem-purpose-card h3,
.sem-program-card h3,
.sem-step-card h3 {
    margin-bottom: 0.65rem;
}

.sem-purpose-card p,
.sem-program-card p,
.sem-step-card p {
    margin-bottom: 0;
    color: var(--theme-text-soft);
    line-height: 1.7;
}

.sem-program-card {
    padding: 1.5rem;
    transition: transform 0.25s ease, border-color 0.25s ease;
}

.sem-program-card:hover {
    transform: translateY(-5px);
    border-color: var(--theme-border-strong);
}

.sem-program-card__type {
    margin-bottom: 0.4rem;
    color: var(--theme-secondary);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.sem-steps-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.2rem;
}

.sem-step-card {
    padding: 1.5rem;
}

.sem-step-card span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    margin-bottom: 1rem;
    border-radius: 999px;
    background: rgba(var(--theme-secondary-rgb), 0.13);
    border: 1px solid rgba(var(--theme-secondary-rgb), 0.25);
    color: var(--theme-secondary);
    font-weight: 800;
}

.sem-callout {
    max-width: 880px;
    margin-inline: auto;
    padding: 2rem;
    text-align: center;
}

.sem-callout h2 {
    margin-bottom: 0.8rem;
    color: var(--theme-text-strong);
}

.sem-callout p {
    max-width: 70ch;
    margin: 0 auto 1.5rem;
    color: var(--theme-text-soft);
    line-height: 1.7;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
    .sem-steps-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 980px) {
    .sem-hero__panel {
        grid-template-columns: 1fr;
    }

    .sem-purpose-grid,
    .sem-program-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .sem-hero__panel {
        padding: 1.25rem;
    }

    .sem-hero__copy h1 {
        font-size: clamp(2rem, 11vw, 3rem);
    }

    .sem-hero__actions {
        flex-direction: column;
    }

    .sem-hero__actions a {
        width: 100%;
        text-align: center;
    }

    .sem-steps-grid {
        grid-template-columns: 1fr;
    }

    .sem-callout {
        padding: 1.4rem;
    }
}
</style>