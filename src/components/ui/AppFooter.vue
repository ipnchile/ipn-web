<template>
    <footer class="footer">
        <div class="footer__glow footer__glow--left"></div>
        <div class="footer__glow footer__glow--right"></div>

        <div class="footer__container">

            <!-- Marca -->
            <section class="footer__brand">

                <img src="@/assets/img/logos/footer-logo.png" alt="IPN Chile" class="footer__logo" />

                <div class="footer__verse-container">
                    <p class="footer__verse">
                        "Id por todo el mundo y predicad el evangelio a toda criatura."
                    </p>
                    <span class="footer__verse-ref">
                        Marcos 16:15
                    </span>
                </div>

                <div class="footer__info">

                    <p class="footer__eyebrow">
                        Iglesia Pentecostal Nazareth
                    </p>

                    <h3 class="footer__title">
                        Presencia con propósito.
                    </h3>

                    <p class="footer__description">
                        Comunidad cristiana comprometida con la fe,
                        el servicio y el fortalecimiento de cada familia
                        en Chile.
                    </p>

                </div>

            </section>

            <!-- Navegación -->
            <section class="footer__section">

                <h4 class="footer__heading">
                    Navegación
                </h4>

                <ul class="footer__links">

                    <li>
                        <RouterLink to="/">Inicio</RouterLink>
                    </li>

                    <li>
                        <RouterLink to="/quienes-somos">Quiénes Somos</RouterLink>
                    </li>

                    <li>
                        <RouterLink to="/sumate">Súmate</RouterLink>
                    </li>

                    <li>
                        <RouterLink to="/donaciones">Donaciones</RouterLink>
                    </li>

                    <li>
                        <RouterLink to="/contacto">Contacto</RouterLink>
                    </li>

                </ul>

            </section>

            <!-- Ministerios -->
            <section class="footer__section">

                <h4 class="footer__heading">
                    Ministerios
                </h4>

                <ul class="footer__links">

                    <li>
                        <RouterLink to="/departamentos/varones">
                            Varones
                        </RouterLink>
                    </li>

                    <li>
                        <RouterLink to="/departamentos/dorcas">
                            Dorcas
                        </RouterLink>
                    </li>

                    <li>
                        <RouterLink to="/departamentos/jumix">
                            Jumix
                        </RouterLink>
                    </li>

                </ul>

            </section>

            <!-- Conexión -->
            <section class="footer__section">

                <h4 class="footer__heading">
                    Conexión
                </h4>

                <div class="footer__contact-list">

                    <p class="footer__contact-label">
                        Consultas e Información
                    </p>

                    <a href="mailto:contacto@ipnchile.cl" class="footer__contact-item footer__contact-item--email">

                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="email-icon">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>

                        contacto@ipnchile.cl

                    </a>

                    <span class="footer__contact-location">
                        Santiago, Chile
                    </span>

                </div>

                <!-- Redes -->

                <div class="footer__social">

                    <a href="https://facebook.com/IPNChile" target="_blank" rel="noopener noreferrer"
                        class="footer__social-link footer__social-link--facebook" aria-label="Facebook">
                        <font-awesome-icon :icon="['fab', 'facebook-f']" />
                    </a>

                    <a href="https://instagram.com/ipnchilecuentaoficial" target="_blank" rel="noopener noreferrer"
                        class="footer__social-link footer__social-link--instagram" aria-label="Instagram">
                        <font-awesome-icon :icon="['fab', 'instagram']" />
                    </a>

                    <a href="https://youtube.com/@ipnchile" target="_blank" rel="noopener noreferrer"
                        class="footer__social-link footer__social-link--youtube" aria-label="YouTube">
                        <font-awesome-icon :icon="['fab', 'youtube']" />
                    </a>

                </div>

            </section>

        </div>

        <!-- Bottom -->

        <div class="footer__bottom">

            <div class="footer__bottom-container">

                <p class="footer__copyright">
                    © 2026 Iglesia Pentecostal Nazareth
                </p>

                <div class="footer__bottom-links">

                    <RouterLink to="/contacto">
                        Soporte
                    </RouterLink>

                    <span class="footer__dot"></span>

                    <a href="#">
                        Privacidad
                    </a>

                </div>

            </div>

        </div>

    </footer>
</template>

<style scoped>
.footer {
    position: relative;
    margin-top: 8rem;
    overflow: hidden;
    background: linear-gradient(180deg, rgba(10, 20, 32, 0.9) 0%, rgba(6, 12, 20, 1) 100%);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--theme-text);
}

/* Glow */

.footer__glow {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.08;
    pointer-events: none;
}

.footer__glow--left {
    left: -150px;
    top: -100px;
    background: var(--theme-secondary);
}

.footer__glow--right {
    right: -150px;
    bottom: -100px;
    background: var(--theme-primary);
}

/* Layout */

.footer__container {
    position: relative;
    z-index: 2;
    width: min(1200px, calc(100% - 4rem));
    margin: 0 auto;
    padding: 5rem 0 4rem;
    display: grid;
    grid-template-columns: 1.4fr 0.7fr 0.7fr 1fr;
    gap: 3.5rem;
}

/* Brand */

.footer__brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.footer__logo {
    height: 70px;
    margin-bottom: 1.5rem;
}

/* Versículo */

.footer__verse-container {
    margin-bottom: 2rem;
    border-left: 2px solid var(--theme-secondary);
    padding-left: 1.5rem;
}

.footer__verse {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1.05rem;
    line-height: 1.5;
    color: var(--theme-text-soft);
}

.footer__verse-ref {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--theme-secondary);
}

/* Títulos */

.footer__eyebrow {
    margin: 0 0 0.7rem;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--theme-secondary);
}

.footer__title {
    font-family: var(--font-serif);
    font-size: clamp(1.45rem, 2vw, 1.9rem);
    line-height: 1.2;
    margin-bottom: 1rem;
}

.footer__description {
    font-size: 0.95rem;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.68);
    max-width: 34ch;
}

/* Links */

.footer__heading {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--theme-secondary);
    margin-bottom: 2rem;
}

.footer__links {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer__links li {
    margin-bottom: 0.8rem;
}

.footer__links a {
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.3s ease;
}

.footer__links a:hover {
    color: var(--theme-secondary);
    padding-left: 5px;
}

/* Contacto */

.footer__contact-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 2rem;
}

.footer__contact-label {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
}

.footer__contact-item--email {
    font-size: 1.02rem;
    font-weight: 500;
    color: var(--theme-text);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.footer__contact-item--email:hover {
    color: var(--theme-secondary);
    transform: translateX(5px);
}

.footer__contact-location {
    font-size: 0.9rem;
    opacity: 0.4;
}

/* Social */

.footer__social {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.footer__social-link {
    position: relative;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);

    overflow: hidden;

    transition: all .35s ease;
}

.footer__social-link svg {
    width: 18px;
    height: 18px;
    color: white;
    z-index: 2;
}

/* fondo animado */

.footer__social-link::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    transform: scale(0);
    transition: transform .35s ease;
}

.footer__social-link:hover {
    transform: translateY(-5px);
}

.footer__social-link:hover::before {
    transform: scale(1.1);
}

.footer__social-link:hover svg {
    color: white;
}

/* colores redes */

.footer__social-link--facebook::before {
    background: #1877f2;
}

.footer__social-link--youtube::before {
    background: #ff0000;
}

.footer__social-link--instagram::before {
    background: radial-gradient(circle at 30% 107%,
        #fdf497 0%,
        #fdf497 5%,
        #fd5949 45%,
        #d6249f 60%,
        #285AEB 90%);
}

/* Bottom */

.footer__bottom {
    background: rgba(0,0,0,.3);
    padding: 1.5rem 0;
    border-top: 1px solid rgba(255,255,255,0.05);
}

.footer__bottom-container {
    width: min(1200px, calc(100% - 4rem));
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer__copyright {
    font-size: 0.85rem;
    opacity: 0.5;
}

.footer__bottom-links {
    display: flex;
    gap: 1rem;
}

.footer__bottom-links a {
    color: rgba(255,255,255,.58);
    text-decoration: none;
    transition: color .3s ease;
}

.footer__bottom-links a:hover {
    color: var(--theme-secondary);
}

.footer__dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--theme-secondary);
}

/* Responsive */

@media (max-width:1024px) {

.footer__container{
grid-template-columns:1fr 1fr
}

.footer__brand{
grid-column:1/-1
}

}

@media (max-width:600px){

.footer__container{
grid-template-columns:1fr;
text-align:center
}

.footer__brand{
align-items:center
}

.footer__social{
justify-content:center
}

.footer__bottom-container{
flex-direction:column;
gap:1rem
}

}
</style>