<template>
    <main v-if="iglesia" class="iglesia-detalle-page">

        <!-- HERO -->
        <section class="church-hero">
            <div class="section-container hero-grid">

                <div class="hero-image glass-panel">
                    <img :src="iglesia.foto" :alt="iglesia.nombre" />
                </div>

                <div class="hero-content">

                    <p class="section-eyebrow">
                        {{ iglesia.region }}
                    </p>

                    <h1>{{ iglesia.nombre }}</h1>

                    <div class="hero-tags">
                        <span class="church-tag">{{ iglesia.comuna }}</span>
                        <span class="church-tag soft">Red IPN</span>
                    </div>

                    <p class="hero-description">
                        {{ iglesia.descripcion }}
                    </p>

                    <div class="hero-actions">

                        <a :href="googleMapsUrl(iglesia)" target="_blank" class="btn-primary">
                            Cómo llegar
                        </a>

                        <RouterLink to="/iglesias" class="btn-outline">
                            Volver a iglesias
                        </RouterLink>

                    </div>

                </div>

            </div>
        </section>

        <!-- CONTENIDO -->
        <section class="church-content">
            <div class="section-container content-grid">

                <!-- HORARIOS -->
                <article class="glass-panel content-card">

                    <h2>Horarios de reunión</h2>

                    <ul v-if="iglesia.horarios?.length" class="schedule-list">
                        <li v-for="(h, index) in iglesia.horarios" :key="index">
                            {{ h }}
                        </li>
                    </ul>

                </article>

                <!-- CONTACTO -->
                <aside class="glass-panel content-card">

                    <h2>Información</h2>

                    <div class="contact-item">
                        <span>Dirección</span>
                        <p>{{ iglesia.direccion }}</p>
                    </div>

                    <div v-if="iglesia.telefono" class="contact-item">
                        <span>Teléfono</span>
                        <p>{{ iglesia.telefono }}</p>
                    </div>

                    <div v-if="iglesia.email" class="contact-item">
                        <span>Email</span>
                        <p>{{ iglesia.email }}</p>
                    </div>

                    <!-- REDES -->
                    <div v-if="tieneRedes" class="socials">

                        <h3>Redes sociales</h3>

                        <div class="social-links">

                            <a v-if="iglesia.redes?.facebook" :href="iglesia.redes.facebook" target="_blank">
                                Facebook
                            </a>

                            <a v-if="iglesia.redes?.instagram" :href="iglesia.redes.instagram" target="_blank">
                                Instagram
                            </a>

                            <a v-if="iglesia.redes?.youtube" :href="iglesia.redes.youtube" target="_blank">
                                YouTube
                            </a>

                        </div>

                    </div>

                </aside>

            </div>
        </section>

        <!-- MAPA -->
        <section class="church-map">

            <div class="section-container">

                <div class="map-container">
                    <div id="map" class="map-element"></div>
                </div>

            </div>

        </section>

    </main>

    <!-- ERROR -->
    <main v-else class="not-found-page">

        <div class="glass-panel not-found">

            <h1>Iglesia no encontrada</h1>

            <p>
                No se pudo encontrar la iglesia solicitada.
            </p>

            <RouterLink to="/iglesias" class="btn-primary">
                Volver
            </RouterLink>

        </div>

    </main>
</template>

<script setup>

import { computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import { getIglesiaDetalleBySlug } from "@/data/iglesias-detalle"

const route = useRoute()

const iglesia = computed(() =>
    getIglesiaDetalleBySlug(route.params.slug)
)

const tieneRedes = computed(() => {

    if (!iglesia.value) return false

    const r = iglesia.value.redes || {}

    return r.facebook || r.instagram || r.youtube

})

const googleMapsUrl = (i) =>
    `https://www.google.com/maps/dir/?api=1&destination=${i.lat},${i.lng}`

let map

onMounted(() => {

    if (!iglesia.value) return

    map = L.map("map", {
        zoomControl: true,
        attributionControl: false
    }).setView([iglesia.value.lat, iglesia.value.lng], 14)

    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { maxZoom: 18 }
    ).addTo(map)

    const icon = L.icon({
        iconUrl: "/isotipo-ipn.png",
        iconSize: [38, 38],
        iconAnchor: [19, 38]
    })

    L.marker([iglesia.value.lat, iglesia.value.lng], { icon })
        .addTo(map)
})

</script>

<style scoped>
.iglesia-detalle-page {
    padding-top: 110px;
    min-height: 100vh;
    background: linear-gradient(180deg, #0b1520, #0e1e2e);
    color: white;
}

/* HERO */

.hero-grid {
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 2rem;
    align-items: center;
}

.hero-image img {
    width: 100%;
    border-radius: 18px;
    object-fit: cover;
}

.hero-content h1 {
    font-size: 2.4rem;
    margin: .5rem 0;
}

.hero-tags {
    display: flex;
    gap: .6rem;
    margin-bottom: 1rem;
}

.church-tag {
    background: var(--theme-secondary);
    color: #111;
    padding: .35rem .8rem;
    border-radius: 999px;
    font-size: .7rem;
    font-weight: 700;
}

.church-tag.soft {
    background: rgba(255, 255, 255, .1);
    color: white;
}

.hero-description {
    color: var(--theme-text-soft);
    line-height: 1.7;
    max-width: 600px;
}

.hero-actions {
    margin-top: 1.2rem;
    display: flex;
    gap: .8rem;
}

/* CONTENIDO */

.content-grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 1rem;
    margin-top: 2rem;
}

.content-card {
    padding: 1.3rem;
}

.schedule-list {
    line-height: 2;
    color: var(--theme-text-soft);
}

.contact-item {
    margin-bottom: 1rem;
}

.contact-item span {
    font-size: .7rem;
    color: var(--theme-secondary);
    font-weight: 700;
    text-transform: uppercase;
}

.social-links {
    display: flex;
    gap: .8rem;
    flex-wrap: wrap;
}

.social-links a {
    color: var(--theme-secondary);
    font-weight: 700;
}

/* MAPA */

.map-container {
    margin-top: 2rem;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, .1);
    height: 420px;
}

.map-element {
    height: 100%;
    width: 100%;
}

/* NOT FOUND */

.not-found-page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
}

.not-found {
    padding: 2rem;
    text-align: center;
}

/* RESPONSIVE */

@media(max-width:900px) {

    .hero-grid {
        grid-template-columns: 1fr;
    }

    .content-grid {
        grid-template-columns: 1fr;
    }

}
</style>