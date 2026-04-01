<template>
    <section class="hero-section section-block">
        <div class="section-container">
            <div class="glass-panel hero-card">
                <div class="hero-card__glow" aria-hidden="true"></div>

                <div class="hero-content">
                    <p class="hero-eyebrow">IPN Chile</p>

                    <h1 class="hero-title">
                        Una Iglesia para
                        <br />
                        <span>usted y su familia</span>
                    </h1>

                    <p class="hero-text">
                        Somos una obra cristiana con presencia en distintas ciudades de Chile.
                        Queremos recibirle con amor, predicar fielmente la Palabra de Dios
                        y acompañarle en su crecimiento espiritual.
                    </p>

                    <div class="hero-actions">
                        <RouterLink to="/iglesias" class="btn-primary hero-action">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" aria-hidden="true">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>Buscar Iglesia</span>
                        </RouterLink>

                        <RouterLink to="/quienes-somos" class="btn-secondary hero-action">
                            Conocer IPN Chile
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped>
.hero-section {
    position: relative;
    z-index: 5;
    padding-top: 4.5rem;
    padding-bottom: 2.5rem;
}

.hero-card {
    position: relative;
    overflow: hidden;
    padding: clamp(2rem, 5vw, 4.75rem) clamp(1.25rem, 6vw, 5rem);
    min-height: clamp(320px, 52vh, 540px);
    display: flex;
    align-items: center;
}

.hero-card__glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        radial-gradient(circle at 82% 18%,
            rgba(var(--theme-secondary-rgb), 0.18) 0%,
            transparent 26%),
        radial-gradient(circle at 12% 88%,
            rgba(255, 255, 255, 0.06) 0%,
            transparent 24%),
        linear-gradient(135deg,
            rgba(255, 255, 255, 0.02) 0%,
            transparent 42%,
            rgba(var(--theme-secondary-rgb), 0.04) 100%);
}

.hero-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 760px;
}

.hero-eyebrow {
    margin: 0 0 1rem;
    color: var(--theme-secondary);
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-weight: 800;
    font-size: 0.8rem;
}

.hero-title {
    margin: 0 0 1.35rem;
    font-family: var(--font-serif);
    font-size: clamp(2.4rem, 6vw, 4.5rem);
    line-height: 1.04;
    color: var(--theme-text-strong);
    text-wrap: balance;
}

.hero-title span {
    color: var(--theme-secondary);
    font-style: italic;
}

.hero-text {
    margin: 0 0 2rem;
    max-width: 62ch;
    color: var(--theme-text-soft);
    font-size: clamp(1rem, 1.2vw, 1.08rem);
    line-height: 1.85;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
}

.hero-action {
    min-width: 220px;
}

.hero-action svg {
    flex: 0 0 auto;
}

@media (max-width: 960px) {
    .hero-section {
        padding-top: 3.5rem;
        padding-bottom: 2rem;
    }

    .hero-card {
        min-height: auto;
    }
}

@media (max-width: 640px) {
    .hero-section {
        padding-top: 2.5rem;
        padding-bottom: 1.5rem;
    }

    .hero-title {
        line-height: 1.08;
    }

    .hero-text {
        line-height: 1.75;
    }

    .hero-actions {
        gap: 0.85rem;
    }

    .hero-action {
        width: 100%;
        min-width: 0;
    }
}
</style>