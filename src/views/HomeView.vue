<template>
    <main class="home-page">
        <TheCarousel :slides="mainSlides" :autoPlay="true" />
        <HeroHome />

        <!-- BIENVENIDA -->
        <section class="section-block">
            <div class="section-container">
                <div class="section-heading">
                    <p class="section-eyebrow">Bienvenida</p>
                    <h2 class="section-title">¿Nos visita por primera vez?</h2>
                    <p class="section-description">
                        Queremos que su llegada sea tranquila, clara y cercana. En IPN Chile
                        encontrará adoración, enseñanza bíblica, oración y comunión fraternal.
                    </p>
                </div>

                <div class="home-grid home-grid--3">
                    <article class="glass-panel--soft info-card">
                        <div class="info-card__number">01</div>
                        <h3>Qué encontrará</h3>
                        <p>
                            Reuniones centradas en la Palabra de Dios, alabanza, oración y un
                            mensaje que apunta a Cristo y a la salvación.
                        </p>
                    </article>

                    <article class="glass-panel--soft info-card">
                        <div class="info-card__number">02</div>
                        <h3>Cómo asistir</h3>
                        <p>
                            Puede visitar la congregación más cercana según su ciudad. También
                            puede escribirnos antes de asistir si necesita orientación.
                        </p>
                    </article>

                    <article class="glass-panel--soft info-card">
                        <div class="info-card__number">03</div>
                        <h3>Para su familia</h3>
                        <p>
                            Buscamos acompañar a cada persona y familia con comunión,
                            edificación y crecimiento espiritual.
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <!-- DEPARTAMENTOS -->
        <section class="section-block">
            <div class="section-container">
                <div class="section-heading">
                    <p class="section-eyebrow">Departamentos</p>
                    <h2 class="section-title">Áreas de servicio y crecimiento</h2>
                    <p class="section-description">
                        Conozca los distintos departamentos de la obra, cada uno con su
                        identidad, propósito y labor dentro de la iglesia.
                    </p>
                </div>

                <div class="home-grid home-grid--departments">
                    <RouterLink to="/departamentos/dorcas" class="logo-card">
                        <div class="logo-card__logo-wrap">
                            <img src="@/assets/img/departamentos/DORCAS_NACIONAL.png" alt="Logo Departamento Dorcas"
                                class="logo-card__logo" />
                        </div>
                        <h3>Dorcas</h3>
                        <p>Mujeres creciendo en fe, servicio y comunión cristiana.</p>
                    </RouterLink>

                    <RouterLink to="/departamentos/varones" class="logo-card">
                        <div class="logo-card__logo-wrap">
                            <img src="@/assets/img/departamentos/VARONES_NACIONAL.png"
                                alt="Logo Departamento de Varones" class="logo-card__logo" />
                        </div>
                        <h3>Varones</h3>
                        <p>Fortaleza espiritual, liderazgo y compromiso con la obra del Señor.</p>
                    </RouterLink>

                    <RouterLink to="/departamentos/jumix" class="logo-card">
                        <div class="logo-card__logo-wrap">
                            <img src="@/assets/img/departamentos/JUMIX_NACIONAL.png" alt="Logo Departamento JUMIX"
                                class="logo-card__logo" />
                        </div>
                        <h3>JUMIX</h3>
                        <p>Juventud con propósito, identidad en Cristo y pasión por servir.</p>
                    </RouterLink>

                    <RouterLink to="/donaciones" class="logo-card">
                        <div class="logo-card__logo-wrap">
                            <img src="@/assets/img/departamentos/APORTES_NACIONAL.png" alt="Logo Aportes IPN"
                                class="logo-card__logo logo-card__logo--wide" />
                        </div>
                        <h3>Aportes</h3>
                        <p>Una forma de apoyar con generosidad el avance de la obra de Dios.</p>
                    </RouterLink>
                </div>
            </div>
        </section>

        <!-- LLAMADO FINAL -->
        <section class="section-block">
            <div class="section-container">
                <div class="glass-panel cta-card">
                    <p class="section-eyebrow">Le esperamos</p>
                    <h2 class="section-title">Dé el siguiente paso</h2>
                    <p class="section-description cta-card__text">
                        Conozca una congregación IPN cercana, escríbanos o descubra más sobre
                        nuestra obra en Chile.
                    </p>

                    <div class="cta-card__actions">
                        <RouterLink to="/iglesias" class="btn-primary">
                            Encontrar iglesia
                        </RouterLink>
                        <RouterLink to="/contacto" class="btn-secondary">
                            Contactarnos
                        </RouterLink>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import TheCarousel from '@/components/ui/TheCarousel.vue'
import HeroHome from '@/components/ui/HeroHome.vue'

const mainSlides = [
    {
        title: 'Iglesia Pentecostal Naciente',
        subtitle: 'Una obra al servicio de Dios en Chile',
        image: '/img/home/slide-1.jpg'
    },
    {
        title: 'Comunión, doctrina y servicio',
        subtitle: 'Creciendo juntos en la fe',
        image: '/img/home/slide-2.jpg'
    },
    {
        title: 'Una iglesia para toda la familia',
        subtitle: 'Esperanza, oración y Palabra',
        image: '/img/home/slide-3.jpg'
    }
]
</script>

<style scoped>
.home-grid {
    display: grid;
    gap: 1.25rem;
}

.home-grid--3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.home-grid--departments {
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

.cta-card {
    padding: 2.5rem;
    text-align: center;
}

.cta-card__text {
    margin-left: auto;
    margin-right: auto;
}

.cta-card__actions {
    margin-top: 1.75rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

/* =========================================
   SOLO HOMEVIEW: TARJETAS DE DEPARTAMENTOS
   ========================================= */
.logo-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1.1rem 1.35rem;
    min-height: 270px;
    border-radius: var(--radius-lg);
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)),
        var(--theme-panel-bg-soft);
    border: 1px solid var(--theme-border-subtle);
    box-shadow: var(--shadow-panel);
    color: inherit;
    overflow: hidden;
    transition:
        transform var(--transition-base),
        border-color var(--transition-base),
        box-shadow var(--transition-base),
        background var(--transition-base),
        filter var(--transition-base);
}

.logo-card::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        radial-gradient(circle at top center,
            rgba(var(--theme-secondary-rgb), 0.12) 0%,
            transparent 42%);
    opacity: 0;
    transition: opacity var(--transition-base);
}

.logo-card:hover {
    transform: translateY(-8px);
    border-color: var(--theme-border-strong);
    box-shadow:
        0 22px 42px rgba(0, 0, 0, 0.3),
        0 10px 22px rgba(0, 0, 0, 0.18),
        0 0 0 1px rgba(var(--theme-secondary-rgb), 0.08);
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.025)),
        var(--theme-panel-bg);
    filter: saturate(1.03);
}

.logo-card:hover::before {
    opacity: 1;
}

.logo-card__logo-wrap {
    width: 180px;
    height: 180px;
    margin-bottom: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background:
        radial-gradient(circle at center,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.02) 100%);
    border: 1px solid rgba(var(--theme-secondary-rgb), 0.14);
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.05),
        0 10px 24px rgba(0, 0, 0, 0.18);
    overflow: hidden;
    transition:
        transform var(--transition-base),
        box-shadow var(--transition-base),
        border-color var(--transition-base);
}

.logo-card:hover .logo-card__logo-wrap {
    transform: scale(1.04);
    border-color: rgba(var(--theme-secondary-rgb), 0.22);
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.06),
        0 14px 28px rgba(0, 0, 0, 0.24),
        0 0 20px rgba(var(--theme-secondary-rgb), 0.08);
}

.logo-card__logo {
    width: 68%;
    height: 68%;
    object-fit: contain;
    object-position: center;
    display: block;
    filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.16));
    transition:
        transform var(--transition-base),
        filter var(--transition-base),
        opacity var(--transition-base);
}

.logo-card:hover .logo-card__logo {
    transform: scale(1.04);
    filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.2));
}

/* Variante para logos más horizontales */
.logo-card__logo--wide {
    width: 86%;
    height: 58%;
}

.logo-card h3 {
    margin: 0 0 0.55rem;
    font-size: 1.12rem;
}

.logo-card p {
    margin: 0;
    max-width: 22ch;
    font-size: 0.94rem;
    color: var(--theme-text-soft);
}

@media (max-width: 1100px) {
    .home-grid--departments {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .home-grid--3 {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .home-grid--departments {
        grid-template-columns: 1fr;
    }

    .cta-card {
        padding: 1.5rem;
    }

    .cta-card__actions {
        flex-direction: column;
    }

    .logo-card {
        min-height: 240px;
    }

    .logo-card__logo-wrap {
        width: 150px;
        height: 150px;
    }

    .logo-card__logo {
        width: 66%;
        height: 66%;
    }

    .logo-card__logo--wide {
        width: 84%;
        height: 56%;
    }
}
</style>
