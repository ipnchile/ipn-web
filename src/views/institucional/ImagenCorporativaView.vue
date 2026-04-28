<template>
    <main class="imagen-corporativa-view">
        <section class="section-block">
            <div class="section-container">
                <div class="hero glass-panel">
                    <p class="section-eyebrow">Nueva imagen corporativa</p>
                    <h1>Somos luz en la oscuridad</h1>
                    <p>
                        La nueva imagen corporativa de IPN Chile nace como una representación visual
                        del mensaje del evangelio y de la identidad espiritual de nuestra congregación.
                    </p>
                </div>

                <section class="content-grid">
                    <article class="glass-panel--soft content-card">
                        <p class="section-eyebrow">El isotipo</p>
                        <h2>Una imagen con propósito</h2>

                        <p>
                            El isotipo ha sido cuidadosamente construido para transmitir visualmente los
                            pilares del mensaje del evangelio, integrando elementos simbólicos que conectan
                            con la identidad espiritual y doctrinal de la congregación.
                        </p>

                        <p>
                            Dentro del isotipo, podemos apreciar integrada de forma sutil en la estructura,
                            la letra “N” inicial de Nazareth. Este detalle tipográfico otorga identidad propia
                            al símbolo y permite una personalización que conecta visualmente con el nombre
                            de la institución.
                        </p>

                        <p>
                            El aspecto más profundo y esencial del isotipo se manifiesta en la forma que
                            recuerda la entrada de una tumba vacía y la piedra corrida, un símbolo directo de
                            la resurrección de Cristo. Este concepto es el núcleo del mensaje cristiano:
                            Jesús venció a la muerte, y gracias a ese hecho, hoy podemos anunciar las buenas
                            nuevas de salvación.
                        </p>

                        <p>
                            La figura principal evoca una vela, símbolo universal de la luz que representa la
                            presencia de Cristo y la misión de los creyentes de reflejar esa luz al mundo.
                        </p>
                    </article>

                    <aside class="glass-panel--soft meaning-card">
                        <p class="section-eyebrow">Significado</p>
                        <h2>Elementos principales</h2>

                        <div class="meaning-list">
                            <div class="meaning-item">
                                <div class="meaning-symbol">
                                    <img src="@/assets/img/marca/ipn_elemento_n_nazareth.png"
                                        alt="Letra N inicial de Nazareth" />
                                </div>
                                <div>
                                    <h3>Letra N</h3>
                                    <p>Representa Nazareth y entrega identidad propia a la iglesia.</p>
                                </div>
                            </div>

                            <div class="meaning-item">
                                <div class="meaning-symbol">
                                    <img src="@/assets/img/marca/ipn_elemento_tumba_piedra.png"
                                        alt="Tumba vacía y piedra removida" />
                                </div>
                                <div>
                                    <h3>Tumba vacía</h3>
                                    <p>Simboliza la resurrección de Cristo, fundamento de nuestra fe.</p>
                                </div>
                            </div>

                            <div class="meaning-item">
                                <div class="meaning-symbol">
                                    <img src="@/assets/img/marca/ipn_elemento_llama_luz.png"
                                        alt="Luz de esperanza y buenas nuevas" />
                                </div>
                                <div>
                                    <h3>Luz de esperanza</h3>
                                    <p>Representa la presencia de Cristo y las buenas nuevas de salvación.</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </section>

                <section class="glass-panel--soft colors-meaning">
                    <p class="section-eyebrow">Lenguaje visual</p>
                    <h2>El sentido de la paleta cromática</h2>

                    <p class="colors-description">
                        La paleta cromática elegida busca reflejar la espiritualidad y la atmósfera solemne
                        que caracteriza a la iglesia, equilibrando a la vez calidez, luz, cercanía y comunidad,
                        sin caer en un sentido anticuado.
                    </p>
                </section>

                <section class="video-section glass-panel">
                    <div class="video-heading">
                        <p class="section-eyebrow">Presentación oficial</p>
                        <h2>Video de la nueva imagen corporativa</h2>
                        <p>
                            Conoce el sentido visual y espiritual de esta nueva etapa institucional.
                        </p>
                    </div>

                    <div class="video-frame">
                        <video class="brand-video" controls preload="metadata">
                            <source src="https://media.ipnchile.cl/videos/video_marca.webm" type="video/webm" />
                            Su navegador no soporta la reproducción de video.
                        </video>
                    </div>
                </section>
            </div>
        </section>
    </main>
</template>

<script setup>
</script>

<style scoped>
.imagen-corporativa-view {
    min-height: 100vh;
}

.hero {
    padding: 3rem;
    margin-bottom: 2rem;
    text-align: center;
}

.hero h1 {
    margin-bottom: 1rem;
    font-size: clamp(2.4rem, 5vw, 4.5rem);
}

.hero p {
    max-width: 820px;
    margin: 0 auto;
    color: var(--theme-text-soft);
    font-size: 1.05rem;
}

.content-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.75fr);
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.content-card,
.meaning-card,
.colors-meaning,
.video-section {
    padding: 2rem;
}

.content-card h2,
.meaning-card h2,
.colors-meaning h2,
.video-heading h2 {
    margin-bottom: 1rem;
}

.content-card p {
    color: var(--theme-text-soft);
}

.meaning-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.meaning-item {
    display: grid;
    grid-template-columns: 74px 1fr;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    border: 1px solid var(--theme-border-subtle);
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.035);
}

.meaning-symbol {
    width: 74px;
    height: 74px;
    display: grid;
    place-items: center;
    padding: 0.65rem;
    border-radius: 50%;
    background: rgba(var(--theme-secondary-rgb), 0.1);
    border: 1px solid rgba(var(--theme-secondary-rgb), 0.24);
}

.meaning-symbol img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.meaning-item h3 {
    margin-bottom: 0.35rem;
    font-family: var(--font-primary);
    font-size: 1rem;
}

.meaning-item p,
.video-heading p {
    margin-bottom: 0;
    color: var(--theme-text-soft);
}

.colors-meaning {
    margin-bottom: 1.5rem;
}

.colors-description {
    max-width: 920px;
    margin: 0;
    color: var(--theme-text-soft);
    line-height: 1.85;
    font-size: 1.02rem;
}

.video-section {
    display: grid;
    grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1.2fr);
    gap: 1.5rem;
    align-items: center;
}

.video-frame {
    position: relative;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16 / 9;
    max-height: 70vh;
    border-radius: var(--radius-lg);
    border: 1px solid var(--theme-border-soft);
    box-shadow: var(--shadow-panel);
    background: #000;
}

.brand-video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    background: #000;
}

@media (max-width: 960px) {
    .hero {
        padding: 2rem;
    }

    .content-grid,
    .video-section {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {

    .content-card,
    .meaning-card,
    .colors-meaning,
    .video-section {
        padding: 1.35rem;
    }

    .meaning-item {
        grid-template-columns: 58px 1fr;
    }

    .meaning-symbol {
        width: 58px;
        height: 58px;
        padding: 0.5rem;
    }

    .video-frame {
        border-radius: var(--radius-md);
    }

    .brand-video {
        object-fit: contain;
    }
}
</style>