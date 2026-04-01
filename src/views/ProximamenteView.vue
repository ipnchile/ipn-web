<script setup>
import logoIpn from '@/assets/img/logos/ipn-navbar-white.png'
</script>

<template>
    <main class="coming-soon">
        <section class="coming-soon__card">
            <img
                :src="logoIpn"
                alt="Logo IPN Chile"
                class="coming-soon__logo"
            />

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
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background:
        radial-gradient(circle at top center, rgba(212, 176, 106, 0.12), transparent 30%),
        linear-gradient(135deg, #060b13 0%, #0b1422 42%, #132238 100%);
    color: #ffffff;
    text-align: center;
}

.coming-soon__card {
    width: 100%;
    max-width: 900px;
    padding: 3rem 2rem;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(12px);
}

.coming-soon__logo {
    display: block;
    width: 100%;
    max-width: 520px;
    margin: 0 auto 1.5rem;
    height: auto;
    object-fit: contain;
}

.coming-soon__eyebrow {
    margin: 0 0 1rem;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #d4b06a;
}

.coming-soon__title {
    margin: 0;
    font-size: clamp(3rem, 8vw, 5.6rem);
    line-height: 0.95;
    font-weight: 800;
}

.coming-soon__subtitle {
    margin: 1rem auto 1.4rem;
    max-width: 18ch;
    font-size: clamp(1.2rem, 3vw, 2rem);
    line-height: 1.2;
    font-weight: 600;
    color: #f2e4bf;
}

.coming-soon__text {
    margin: 0 auto;
    max-width: 60ch;
    font-size: 1.08rem;
    line-height: 1.85;
    color: rgba(255, 255, 255, 0.88);
}

.coming-soon__divider {
    width: 180px;
    height: 1px;
    margin: 2rem auto 1.25rem;
    background: linear-gradient(90deg, transparent, rgba(212, 176, 106, 0.85), transparent);
}

.coming-soon__verse {
    margin: 0;
    font-size: 1rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.82);
}

.coming-soon__reference {
    margin-top: 0.5rem;
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #d4b06a;
}

@media (max-width: 640px) {
    .coming-soon__card {
        padding: 2.2rem 1.2rem;
        border-radius: 20px;
    }

    .coming-soon__logo {
        max-width: 320px;
        margin-bottom: 1.2rem;
    }
}
</style>