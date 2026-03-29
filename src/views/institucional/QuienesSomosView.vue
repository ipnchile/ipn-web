<template>
    <main class="institucional-page">
        <section class="hero-section">
            <div class="section-container">
                <div class="hero-content">
                    <p class="section-eyebrow">Institucional</p>

                    <h1>¿Quiénes <span>Somos?</span></h1>

                    <p class="hero-text">
                        La Iglesia Pentecostal Nazareth es una comunidad cristiana evangélica de derecho público,
                        llamada a anunciar el Evangelio de Jesucristo, vivir conforme a la Palabra de Dios
                        y servir con fidelidad, amor y reverencia.
                    </p>

                    <p class="hero-subtext">
                        Nuestra vida espiritual e institucional busca honrar al Señor, fortalecer la comunión
                        de la Iglesia y preservar una obra ordenada, bíblica y guiada por el Espíritu Santo.
                    </p>

                    <div class="hero-actions">
                        <RouterLink to="/quienes-somos/gobierno" class="btn-primary">
                            Gobierno Institucional
                        </RouterLink>

                        <RouterLink to="/quienes-somos/fe" class="btn-outline">
                            Lo que Creemos
                        </RouterLink>
                    </div>
                </div>
            </div>
        </section>

        <section class="overview-section">
            <div class="section-container">
                <div class="overview-card glass-panel">
                    <div class="overview-card__content">
                        <p class="section-eyebrow">Nuestra Identidad</p>
                        <h2>Una iglesia con fundamento bíblico, comunión fraternal y orden institucional</h2>
                        <p>
                            Somos una iglesia que afirma la autoridad de las Sagradas Escrituras, la centralidad de Cristo
                            y la obra del Espíritu Santo. Nuestra identidad se expresa en una fe viva, en la sana doctrina,
                            en la unidad del cuerpo de Cristo y en un servicio reverente que busca edificar a cada familia,
                            congregación y generación.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="cards-section">
            <div class="section-container">
                <div class="cards-grid">
                    <article class="info-card glass-panel">
                        <div class="card-icon">✦</div>
                        <h3>Fundamento Bíblico</h3>
                        <p>
                            Reconocemos la Santa Biblia como la Palabra de Dios y como la regla suprema de fe,
                            doctrina y conducta para la vida del creyente y de la Iglesia.
                        </p>
                    </article>

                    <article class="info-card glass-panel">
                        <div class="card-icon">✦</div>
                        <h3>Doctrina Pentecostal</h3>
                        <p>
                            Nuestra fe se enmarca en la doctrina evangélica pentecostal, afirmando la salvación
                            en Jesucristo, la obra del Espíritu Santo y el llamado a una vida de santidad.
                        </p>
                    </article>

                    <article class="info-card glass-panel">
                        <div class="card-icon">✦</div>
                        <h3>Orden Institucional</h3>
                        <p>
                            Desarrollamos nuestra labor conforme a estatutos y reglamentos que resguardan la unidad,
                            el buen testimonio, la disciplina y el correcto funcionamiento de la Iglesia.
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <section class="nav-section">
            <div class="section-container">
                <div class="section-heading">
                    <p class="section-eyebrow">Conozca más</p>
                    <h2>Explore nuestra estructura y nuestra fe</h2>
                    <p>
                        Aquí podrá revisar la organización formal de la Iglesia y también los principios doctrinales
                        que sustentan nuestra convicción cristiana.
                    </p>
                </div>

                <div class="nav-grid">
                    <RouterLink to="/quienes-somos/gobierno" class="nav-card glass-panel">
                        <p class="section-eyebrow">Organización</p>
                        <h3>Gobierno Institucional</h3>
                        <p>
                            Conozca la estructura formal de la Iglesia, el Directorio Nacional,
                            el Tribunal de Ética y Disciplina y los distintos cuerpos de servicio.
                        </p>
                        <span class="nav-link-text">Ir a Gobierno Institucional</span>
                    </RouterLink>

                    <RouterLink to="/quienes-somos/fe" class="nav-card glass-panel">
                        <p class="section-eyebrow">Doctrina</p>
                        <h3>Lo que Creemos</h3>
                        <p>
                            Revise los artículos de fe que expresan la doctrina de la Iglesia Pentecostal Nazareth
                            conforme a sus estatutos y reglamentos.
                        </p>
                        <span class="nav-link-text">Ir a Lo que Creemos</span>
                    </RouterLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
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
   SECCIONES
   ========================= */
.hero-section,
.overview-section,
.cards-section,
.nav-section {
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
    max-width: 880px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hero-content h1 {
    margin: 0.45rem 0 1rem;
    font-size: clamp(2.7rem, 5vw, 4.6rem);
    line-height: 1.02;
    letter-spacing: -0.025em;
}

.hero-content h1 span {
    color: var(--theme-secondary);
}

.hero-text,
.hero-subtext {
    width: 100%;
    max-width: 760px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.9;
}

.hero-text {
    margin-bottom: 0.85rem;
    color: var(--theme-text);
    font-size: 1.08rem;
}

.hero-subtext {
    margin-top: 0;
    color: var(--theme-text-soft);
    font-size: 1rem;
}

.hero-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.95rem;
    flex-wrap: wrap;
    margin-top: 1.8rem;
}

/* =========================
   BOTONES
   ========================= */
.btn-primary,
.btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    padding: 0.9rem 1.35rem;
    border-radius: 14px;
    text-decoration: none;
    font-weight: 700;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.btn-primary {
    background: linear-gradient(135deg, #cba45e, #e2bc78);
    color: #111;
    border: 1px solid rgba(226, 188, 120, 0.95);
    box-shadow: 0 12px 30px rgba(203, 164, 94, 0.18);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px rgba(203, 164, 94, 0.22);
}

.btn-outline {
    background: rgba(255, 255, 255, 0.035);
    color: var(--theme-text);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(10px);
}

.btn-outline:hover {
    transform: translateY(-2px);
    border-color: rgba(203, 164, 94, 0.32);
    background: rgba(255, 255, 255, 0.055);
}

/* =========================
   TARJETA IDENTIDAD
   ========================= */
.overview-card {
    max-width: 1080px;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 26px;
    position: relative;
    overflow: hidden;
}

.overview-card::before,
.info-card::before,
.nav-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(203, 164, 94, 0.10), transparent 42%, transparent 100%);
    pointer-events: none;
}

.overview-card__content,
.info-card,
.nav-card {
    position: relative;
    z-index: 1;
}

.overview-card__content {
    max-width: 860px;
}

.overview-card h2 {
    margin: 0.35rem 0 0.9rem;
    font-size: clamp(1.7rem, 3vw, 2.5rem);
    line-height: 1.18;
}

.overview-card p:last-child {
    margin-bottom: 0;
    color: var(--theme-text-soft);
    line-height: 1.85;
}

/* =========================
   CARDS
   ========================= */
.cards-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
}

.info-card {
    padding: 1.5rem;
    border-radius: 22px;
    min-height: 100%;
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.info-card:hover {
    transform: translateY(-4px);
    border-color: rgba(203, 164, 94, 0.22);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
}

.card-icon {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    margin-bottom: 1rem;
    background: rgba(203, 164, 94, 0.12);
    color: var(--theme-secondary);
    font-size: 1.05rem;
    border: 1px solid rgba(203, 164, 94, 0.18);
}

.info-card h3 {
    margin: 0 0 0.75rem;
    font-size: 1.18rem;
}

.info-card p {
    margin: 0;
    color: var(--theme-text-soft);
    line-height: 1.8;
}

/* =========================
   CABECERA SECCIÓN
   ========================= */
.section-heading {
    max-width: 760px;
    margin: 0 auto 1.5rem;
    text-align: center;
}

.section-heading h2 {
    margin: 0.35rem 0 0.8rem;
    font-size: clamp(1.8rem, 3vw, 2.7rem);
    line-height: 1.15;
}

.section-heading p {
    margin: 0;
    color: var(--theme-text-soft);
    line-height: 1.8;
}

/* =========================
   NAVEGACIÓN
   ========================= */
.nav-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
}

.nav-card {
    display: block;
    text-decoration: none;
    color: inherit;
    padding: 1.6rem;
    border-radius: 24px;
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.nav-card:hover {
    transform: translateY(-4px);
    border-color: rgba(203, 164, 94, 0.35);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.24);
}

.nav-card h3 {
    margin: 0.35rem 0 0.75rem;
    font-size: 1.35rem;
}

.nav-card p {
    color: var(--theme-text-soft);
    line-height: 1.8;
    margin-bottom: 1rem;
}

.nav-link-text {
    color: var(--theme-secondary);
    font-weight: 700;
}

/* =========================
   RESPONSIVE
   ========================= */
@media (max-width: 1000px) {
    .cards-grid,
    .nav-grid {
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

    .overview-card,
    .info-card,
    .nav-card {
        padding: 1.15rem;
    }

    .hero-actions {
        flex-direction: column;
        width: 100%;
    }

    .btn-primary,
    .btn-outline {
        width: 100%;
    }

    .hero-text,
    .hero-subtext,
    .section-heading p,
    .overview-card p:last-child,
    .info-card p,
    .nav-card p {
        line-height: 1.75;
    }
}
</style>