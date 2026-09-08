<script setup>
import { septemberMedia } from '@/data/septemberMedia'
</script>

<template>
  <section class="conference-banner" aria-label="Conferencias Semestrales 2026">
    <RouterLink to="/actualidad/eventos?evento=5" class="conference-banner__link">
      <img :src="septemberMedia.banner" :srcset="septemberMedia.bannerSrcset" sizes="100vw"
        width="2560" height="853" fetchpriority="high" decoding="async"
        alt="IPN Chile: Conferencias Semestrales 2026. 25, 26 y 27 de septiembre, IPN Nacimiento." />
      <span class="conference-banner__caption">25–27 de septiembre de 2026 · IPN Nacimiento <span>Ver conferencia →</span></span>
    </RouterLink>
  </section>
</template>

<style scoped>
.conference-banner { width: 100%; background: #09141e; }
.conference-banner__link { display: block; color: #fff; text-decoration: none; }
.conference-banner__link:focus-visible { outline: 3px solid var(--theme-secondary); outline-offset: -3px; }
.conference-banner img { display: block; width: 100%; height: auto; object-fit: contain; }
.conference-banner__caption { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: .4rem 1.5rem; padding: .9rem 1rem; font-size: .9rem; text-align: center; }
.conference-banner__caption span { color: var(--theme-secondary); text-decoration: underline; }
@media (max-width: 600px) { .conference-banner__caption { font-size: .78rem; } }
</style>
