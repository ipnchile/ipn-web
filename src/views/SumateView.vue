<template>
    <main class="sumate-page">
        <!-- HERO -->
        <section class="section-container section-block sumate-hero">
            <div class="glass-panel sumate-hero__panel">
                <div class="sumate-hero__copy">
                    <p class="section-eyebrow">Súmate</p>
                    <h1>Súmate a la Misión</h1>
                    <p class="sumate-hero__text">
                        Este espacio ha sido preparado para recibir futuras convocatorias de servicio,
                        dirigidas a hermanos y hermanas que deseen colaborar con sus dones, talentos,
                        conocimientos y disposición en distintas áreas de la misión.
                    </p>
                </div>

                <aside class="card sumate-hero__highlight">
                    <p class="sumate-hero__label">Convocatorias</p>
                    <h2>Oportunidades para servir</h2>
                    <p>
                        Próximamente se publicarán aquí llamados de colaboración para apoyar
                        departamentos, proyectos e iniciativas especiales de nuestra misión.
                    </p>
                </aside>
            </div>
        </section>

        <!-- ESTADO ACTUAL -->
        <section class="section-container section-block">
            <div class="section-heading">
                <p class="section-eyebrow">Disponibilidad actual</p>
                <h2 class="section-title">No hay convocatorias disponibles por el momento</h2>
                <p class="section-description">
                    Actualmente esta sección no cuenta con llamados abiertos ni formularios activos.
                    Cuando se habiliten nuevas oportunidades de servicio, serán publicadas oportunamente en este espacio.
                </p>
            </div>

            <div class="glass-panel sumate-empty-state">
                <div class="sumate-empty-state__icon">
                    <font-awesome-icon :icon="['fas', 'calendar-days']" />
                </div>

                <h3>Próximamente se habilitarán nuevas convocatorias</h3>
                <p>
                    Te invitamos a estar atento a este espacio, donde se publicarán oportunidades de colaboración
                    para apoyar distintas áreas de nuestra misión. ¡Gracias por tu interés en servir junto a nosotros!
                </p>
            </div>
        </section>

        <!-- ÁREAS FUTURAS -->
        <section class="section-container section-block">
            <div class="section-heading">
                <p class="section-eyebrow">Próximamente</p>
                <h2 class="section-title">Áreas que podrían habilitar convocatorias</h2>
                <p class="section-description">
                    En el futuro, se podrían habilitar oportunidades de colaboración en distintas áreas de nuestra misión,
                    dependiendo de las necesidades y proyectos en curso. Algunas de las áreas que podrían contar con convocatorias son:
                </p>

            </div>

            <div class="sumate-future-grid">
                <article class="card sumate-future-card">
                    <h3>Salud</h3>
                    <p>
                        Espacios de colaboración para profesionales, técnicos y personas con vocación de servicio en el área de salud.
                    </p>
                </article>

                <article class="card sumate-future-card">
                    <h3>Comunicaciones</h3>
                    <p>
                        Apoyo en difusión institucional, diseño, fotografía, producción audiovisual y medios digitales.
                    </p>
                </article>

                <article class="card sumate-future-card">
                    <h3>Enseñanza</h3>
                    <p>
                        Oportunidades para colaborar en procesos formativos, acompañamiento y apoyo en instancias educativas.
                    </p>
                </article>

                <article class="card sumate-future-card">
                    <h3>Logística y eventos</h3>
                    <p>
                        Apoyo en organización, coordinación, recepción y labores operativas en actividades y encuentros.
                    </p>
                </article>
            </div>
        </section>
    </main>
</template>

<script setup>
// Vista preparada para futuras convocatorias.
// Cuando existan llamados activos, aquí se podrán agregar:
// - filtros
// - tarjetas de convocatorias
// - modales de detalle
// - formularios externos o internos
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

.sumate-empty-state {
    padding: 2rem;
    text-align: center;
    max-width: 860px;
    margin: 0 auto;
}

.sumate-empty-state__icon {
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

.sumate-empty-state h3 {
    margin-bottom: 0.75rem;
}

.sumate-empty-state p {
    margin: 0;
    color: var(--theme-text-soft);
    line-height: 1.8;
}

.sumate-future-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.25rem;
}

.sumate-future-card {
    padding: 1.5rem;
    height: 100%;
}

.sumate-future-card h3 {
    margin-bottom: 0.7rem;
}

.sumate-future-card p {
    margin: 0;
    color: var(--theme-text-soft);
    line-height: 1.75;
}

@media (max-width: 1100px) {
    .sumate-future-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 900px) {
    .sumate-hero__panel {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 700px) {
    .sumate-future-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .sumate-page {
        padding-bottom: 3rem;
    }

    .sumate-hero__panel,
    .sumate-empty-state {
        padding: 1.25rem;
    }
}
</style>