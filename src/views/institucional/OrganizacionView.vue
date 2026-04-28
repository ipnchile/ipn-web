<template>
    <main class="organizacion-page">

        <!-- HERO -->
        <section class="hero-section">
            <div class="section-container">
                <div class="hero-content">
                    <img :src="isotipoLogo" alt="Iglesia Pentecostal Nazareth Chile" class="hero-logo" />
                    <p class="section-eyebrow">Organización</p>
                    <h1>Estructura para <span>servir con orden</span></h1>

                    <p class="hero-text">
                        La organización institucional permite coordinar el trabajo espiritual,
                        administrativo y ministerial, asegurando unidad y correcto funcionamiento
                        en todos los niveles de la Iglesia.
                    </p>
                </div>
            </div>
        </section>

        <!-- ORGANIGRAMA -->
        <section class="org-section">
            <div class="section-container">

                <div class="section-heading">
                    <p class="section-eyebrow">Estructura</p>
                    <h2>Organigrama general</h2>
                </div>

                <div class="org-chart glass-panel">

                    <!-- NIVEL 1 -->
                    <div class="org-level">
                        <div class="org-node primary">
                            <font-awesome-icon :icon="['fas', 'building-columns']" />
                            <h3>Conferencia</h3>
                            <p>Máxima autoridad de la Iglesia</p>
                        </div>
                    </div>

                    <div class="org-line"></div>

                    <!-- NIVEL 2 -->
                    <div class="org-level">
                        <div class="org-node highlight">
                            <font-awesome-icon :icon="['fas', 'users']" />
                            <h3>Directorio Nacional</h3>
                        </div>
                    </div>

                    <div class="org-line"></div>

                    <!-- NIVEL 3 -->
                    <div class="org-branches">

                        <div class="org-node">
                            <font-awesome-icon :icon="['fas', 'scale-balanced']" />
                            <h3>Tribunal</h3>
                        </div>

                        <div class="org-node highlight">
                            <font-awesome-icon :icon="['fas', 'sitemap']" />
                            <h3>Pastor Director de Departamentos</h3>
                        </div>

                        <div class="org-node">
                            <font-awesome-icon :icon="['fas', 'people-group']" />
                            <h3>Superintendentes</h3>
                        </div>

                    </div>

                    <div class="org-line"></div>

                    <!-- NIVEL 4 -->
                    <div class="org-level">
                        <div class="org-node">
                            <font-awesome-icon :icon="['fas', 'handshake']" />
                            <h3>Departamentos Nacionales</h3>
                        </div>
                    </div>

                    <div class="org-line"></div>

                    <!-- NIVEL 5 -->
                    <div class="org-level">
                        <div class="org-node">
                            <font-awesome-icon :icon="['fas', 'church']" />
                            <h3>Iglesias Locales</h3>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- DIRECTOR -->
        <section class="director-section">
            <div class="section-container">

                <div class="director-card glass-panel">

                    <div class="director-avatar">
                        <img v-if="director.foto" :src="director.foto" />
                        <div v-else class="fallback">
                            <font-awesome-icon :icon="['fas', 'user-tie']" />
                        </div>
                    </div>

                    <div class="director-info">
                        <p class="section-eyebrow">Coordinación</p>
                        <h2>{{ director.cargo }}</h2>
                        <h3 class="director-name">{{ director.nombre }}</h3>
                        <p>
                            Responsable de coordinar y fortalecer el trabajo de los Departamentos
                            Nacionales, asegurando unidad y desarrollo ministerial.
                        </p>
                    </div>

                </div>

            </div>
        </section>

        <!-- BLOQUES -->
        <section class="support-section">
            <div class="section-container">

                <div class="support-grid">

                    <div class="support-card glass-panel">
                        <font-awesome-icon :icon="['fas', 'book-bible']" />
                        <h3>Fundamento espiritual</h3>
                    </div>

                    <div class="support-card glass-panel">
                        <font-awesome-icon :icon="['fas', 'handshake']" />
                        <h3>Unidad institucional</h3>
                    </div>

                    <div class="support-card glass-panel">
                        <font-awesome-icon :icon="['fas', 'landmark']" />
                        <h3>Orden administrativo</h3>
                    </div>

                </div>

            </div>
        </section>

    </main>
</template>

<script setup>
import isotipoLogo from '@/assets/img/logos/isotipo.png'
const director = {
    cargo: 'Pastor Director de Departamentos',
    nombre: 'Pr. Presbítero Rev. Ricardo Alarcón',
    foto: ''
}
</script>

<style scoped>
.organizacion-page {
    padding-top: 110px;
    min-height: 100vh;
    color: var(--theme-text);
    background:
        radial-gradient(circle at top center, rgba(203, 164, 94, 0.12), transparent 30%),
        linear-gradient(180deg, #08131d 0%, #0d1d2c 55%, #0a1622 100%);
}

.hero-section,
.org-section,
.director-section,
.support-section {
    padding: 0 0 4rem;
}

.hero-section {
    padding-top: 2rem;
    padding-bottom: 3.5rem;
}

.hero-content {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
}

.hero-content h1 {
    margin: 0.4rem 0 1rem;
    font-size: clamp(2.4rem, 5vw, 4.2rem);
    line-height: 1.05;
}

.hero-content h1 span {
    color: var(--theme-secondary);
}

.hero-text {
    max-width: 760px;
    margin: 0 auto;
    color: var(--theme-text-soft);
    line-height: 1.8;
    font-size: 1.05rem;
}

.section-heading {
    max-width: 760px;
    margin: 0 auto 2rem;
    text-align: center;
}

.section-heading h2 {
    margin: 0.35rem 0 0.8rem;
    font-size: clamp(1.8rem, 3vw, 2.7rem);
}

/* ORGANIGRAMA */
.org-chart {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem;
    border-radius: 28px;
    overflow: hidden;
    text-align: center;
    position: relative;
}

.org-level {
    display: flex;
    justify-content: center;
    align-items: center;
}

.org-branches {
    display: grid;
    grid-template-columns: repeat(3, minmax(180px, 1fr));
    gap: 1rem;
    max-width: 760px;
    margin: 0 auto;
}

.org-node {
    width: 100%;
    max-width: 260px;
    min-height: 132px;
    margin: 0 auto;
    padding: 1.2rem 1rem;
    border-radius: 22px;
    border: 1px solid rgba(203, 164, 94, 0.18);
    background: rgba(255, 255, 255, 0.035);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.25s ease;
}

.org-node:hover {
    transform: translateY(-4px);
    border-color: rgba(203, 164, 94, 0.34);
    background: rgba(255, 255, 255, 0.055);
}

.org-node svg {
    color: var(--theme-secondary);
    font-size: 1.15rem;
    margin-bottom: 0.65rem;
}

.org-node h3 {
    margin: 0;
    font-size: clamp(1.05rem, 1.7vw, 1.45rem);
    line-height: 1.15;
    text-wrap: balance;
}

.org-node p {
    margin: 0.55rem 0 0;
    color: var(--theme-text-soft);
    font-size: 0.92rem;
    line-height: 1.5;
}

.org-node.primary {
    border-color: rgba(203, 164, 94, 0.38);
    background: rgba(203, 164, 94, 0.08);
}

.org-node.highlight {
    background: rgba(203, 164, 94, 0.1);
}

.org-line {
    width: 2px;
    height: 34px;
    margin: 0.55rem auto;
    background: linear-gradient(180deg,
            transparent,
            rgba(203, 164, 94, 0.55),
            transparent);
}

/* DIRECTOR */
.director-card {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 26px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.5rem;
    align-items: center;
}

.director-avatar {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    padding: 4px;
    border: 1px solid rgba(203, 164, 94, 0.32);
    background: rgba(203, 164, 94, 0.1);
    overflow: hidden;
}

.director-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center 20%;
    display: block;
}

.fallback {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--theme-secondary);
    background: rgba(255, 255, 255, 0.05);
    font-size: 2rem;
}

.director-info h2 {
    margin: 0.35rem 0 0.35rem;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
}

.director-name {
    margin: 0 0 0.7rem;
    color: var(--theme-secondary);
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    line-height: 1.3;
}

.director-info p:last-child {
    margin: 0;
    color: var(--theme-text-soft);
    line-height: 1.8;
}

/* SUPPORT */
.support-grid {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
}

.support-card {
    padding: 1.7rem 1.2rem;
    border-radius: 22px;
    text-align: center;
}

.support-card svg {
    color: var(--theme-secondary);
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
}

.support-card h3 {
    margin: 0;
    font-size: clamp(1.25rem, 2.3vw, 1.9rem);
    line-height: 1.15;
}

/* RESPONSIVE */
@media (max-width: 900px) {
    .org-branches {
        grid-template-columns: 1fr;
        max-width: 320px;
    }

    .director-card {
        grid-template-columns: 1fr;
        text-align: center;
        justify-items: center;
    }

    .support-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 600px) {
    .organizacion-page {
        padding-top: 95px;
    }

    .hero-section {
        padding-top: 1rem;
        padding-bottom: 2.6rem;
    }

    .hero-content h1 {
        font-size: clamp(2rem, 11vw, 3rem);
    }

    .hero-text {
        font-size: 0.98rem;
        line-height: 1.7;
    }

    .org-chart {
        padding: 1.5rem 1rem;
        border-radius: 22px;
    }

    .org-node {
        max-width: 100%;
        min-height: 118px;
        padding: 1rem;
    }

    .director-card {
        padding: 1.4rem;
        border-radius: 22px;
    }

    .director-avatar {
        width: 92px;
        height: 92px;
    }

    .support-card {
        padding: 1.3rem 1rem;
    }
}

.hero-logo {
    width: clamp(42px, 4vw, 68px);
    height: auto;
    margin: 0 auto 1rem;
    display: block;
    opacity: 0.95;
    filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.35));
}

@media (max-width: 600px) {
    .hero-logo {
        width: 48px;
        margin-bottom: 0.85rem;
    }
}
</style>