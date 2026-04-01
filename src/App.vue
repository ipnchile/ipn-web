<template>
    <main class="coming-soon">
        <div class="coming-soon__glow coming-soon__glow--top"></div>
        <div class="coming-soon__glow coming-soon__glow--bottom"></div>

        <section class="coming-soon__card">
            <div class="coming-soon__line"></div>

            <p class="coming-soon__eyebrow">IPN Chile</p>

            <h1 class="coming-soon__title">Muy pronto</h1>

            <h2 class="coming-soon__subtitle">
                Una nueva imagen. Un mismo propósito.
            </h2>

            <p class="coming-soon__text">
                Estamos preparando una nueva experiencia digital, manteniendo el mismo
                propósito de siempre: servir, edificar y comunicar con excelencia.
            </p>

            <div class="coming-soon__divider"></div>

            <p class="coming-soon__verse">
                “Jesucristo es el mismo ayer, y hoy, y por los siglos.”
            </p>
            <p class="coming-soon__reference">Hebreos 13:8</p>
        </section>
    </main>
</template>

<style scoped>
.coming-soon {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background:
        radial-gradient(circle at top center, rgba(212, 176, 106, 0.14), transparent 28%),
        radial-gradient(circle at bottom left, rgba(212, 176, 106, 0.08), transparent 24%),
        linear-gradient(135deg, #060b13 0%, #0b1422 42%, #132238 100%);
    color: #ffffff;
    text-align: center;
}

.coming-soon::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
        linear-gradient(to bottom, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0));
    pointer-events: none;
}

.coming-soon::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: radial-gradient(circle at center, black 35%, transparent 85%);
    opacity: 0.16;
    pointer-events: none;
}

.coming-soon__glow {
    position: absolute;
    border-radius: 999px;
    filter: blur(90px);
    pointer-events: none;
    opacity: 0.55;
}

.coming-soon__glow--top {
    top: -140px;
    left: 50%;
    width: 420px;
    height: 220px;
    transform: translateX(-50%);
    background: rgba(212, 176, 106, 0.22);
}

.coming-soon__glow--bottom {
    right: -120px;
    bottom: -100px;
    width: 320px;
    height: 220px;
    background: rgba(212, 176, 106, 0.12);
}

.coming-soon__card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 840px;
    padding: 3.5rem 2.5rem 3rem;
    border-radius: 28px;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.085), rgba(255, 255, 255, 0.04));
    border: 1px solid rgba(255, 255, 255, 0.14);
    box-shadow:
        0 30px 80px rgba(0, 0, 0, 0.38),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(14px);
}

.coming-soon__line {
    width: 92px;
    height: 4px;
    margin: 0 auto 1.5rem;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(212, 176, 106, 0.3), #d4b06a, rgba(212, 176, 106, 0.3));
    box-shadow: 0 0 24px rgba(212, 176, 106, 0.28);
}

.coming-soon__eyebrow {
    margin: 0 0 1rem;
    font-size: 0.84rem;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #d4b06a;
    opacity: 0.95;
}

.coming-soon__title {
    margin: 0;
    font-size: clamp(3.4rem, 8vw, 6rem);
    line-height: 0.95;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #ffffff;
    text-shadow: 0 8px 30px rgba(0, 0, 0, 0.28);
}

.coming-soon__subtitle {
    margin: 1.1rem auto 1.4rem;
    max-width: 18ch;
    font-size: clamp(1.2rem, 3vw, 2.1rem);
    line-height: 1.2;
    font-weight: 600;
    color: #f2e4bf;
}

.coming-soon__text {
    margin: 0 auto;
    max-width: 60ch;
    font-size: 1.08rem;
    line-height: 1.9;
    color: rgba(255, 255, 255, 0.88);
}

.coming-soon__divider {
    width: 100%;
    max-width: 180px;
    height: 1px;
    margin: 2rem auto 1.25rem;
    background: linear-gradient(90deg, transparent, rgba(212, 176, 106, 0.8), transparent);
}

.coming-soon__verse {
    margin: 0;
    font-size: 1rem;
    line-height: 1.8;
    font-style: italic;
    color: rgba(255, 255, 255, 0.82);
}

.coming-soon__reference {
    margin: 0.35rem 0 0;
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #d4b06a;
}

@media (max-width: 768px) {
    .coming-soon {
        padding: 1.5rem;
    }

    .coming-soon__card {
        padding: 2.6rem 1.45rem 2.3rem;
        border-radius: 22px;
    }

    .coming-soon__eyebrow {
        letter-spacing: 0.18em;
        font-size: 0.76rem;
    }

    .coming-soon__subtitle {
        max-width: 22ch;
    }

    .coming-soon__text {
        font-size: 1rem;
        line-height: 1.75;
    }

    .coming-soon__verse {
        font-size: 0.95rem;
        line-height: 1.7;
    }
}

@media (max-width: 480px) {
    .coming-soon {
        padding: 1rem;
    }

    .coming-soon__card {
        padding: 2.2rem 1.1rem 2rem;
    }

    .coming-soon__title {
        line-height: 1;
    }

    .coming-soon__subtitle {
        margin-top: 0.9rem;
    }
}
</style>