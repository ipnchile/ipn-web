<template>
    <main class="not-found">
        <div class="glass-panel not-found__content">
            <div class="not-found__icon-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                    class="icon-search">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
            </div>

            <h1 class="not-found__code">404</h1>
            <h2 class="section-title">Página no encontrada</h2>

            <p class="section-subtitle">
                La tumba está vacía, pero esta página también. <br>
                Es posible que el enlace esté roto o haya sido movido.
            </p>

            <div class="not-found__actions">
                <RouterLink to="/" class="btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon-home">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Volver al Inicio
                </RouterLink>
            </div>
        </div>
    </main>
</template>

<style scoped>
.not-found {
    min-height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
}

.not-found__content {
    padding: 4rem 3rem;
    max-width: 500px;
    width: 100%;
    position: relative;
    overflow: hidden;
}

.not-found__icon-header {
    color: var(--theme-secondary);
    opacity: 0.6;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
}

.icon-search {
    animation: float 4s ease-in-out infinite;
}

.not-found__code {
    font-family: var(--font-serif);
    font-size: clamp(5rem, 15vw, 8rem);
    line-height: 1;
    margin-bottom: 0.5rem;
    font-weight: 700;
    background: linear-gradient(to bottom, var(--theme-secondary), var(--theme-text));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.9;
}

.not-found__code::after {
    content: "";
    display: block;
    width: 60px;
    height: 2px;
    background: var(--theme-secondary);
    margin: 15px auto;
    border-radius: 2px;
}

.not-found__actions {
    margin-top: 2.5rem;
    display: flex;
    justify-content: center;
}

.btn-primary {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    text-decoration: none;
    padding: 0.85rem 2rem;
}

.icon-home {
    transition: transform 0.3s ease;
}

.btn-primary:hover .icon-home {
    transform: scale(1.1);
}

/* Animación de flotado para el icono superior */
@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

@media (max-width: 600px) {
    .not-found__content {
        padding: 3rem 1.5rem;
    }
}
</style>