<template>
    <main class="iglesias-page">
        <header class="page-header">
            <div class="section-container">
                <p class="section-eyebrow">Red de Iglesias</p>
                <h1>Nuestra <span>Presencia</span></h1>
                <p class="page-description">
                    Conozca las congregaciones de nuestra red a lo largo de Chile. Busque por ciudad,
                    comuna o región, y acceda al detalle de cada iglesia.
                </p>
            </div>
        </header>

        <section class="map-explorer">
            <div class="section-container">
                <div class="top-bar glass-panel">
                    <div class="view-switch">
                        <button type="button" class="view-switch__btn" :class="{ active: vistaActiva === 'explorar' }"
                            @click="vistaActiva = 'explorar'">
                            Explorar mapa
                        </button>

                        <button type="button" class="view-switch__btn" :class="{ active: vistaActiva === 'todas' }"
                            @click="vistaActiva = 'todas'">
                            Ver todas
                        </button>
                    </div>

                    <div class="search-sidebar">
                        <div class="search-field compact">
                            <span class="search-field__icon">🔍</span>
                            <input v-model="busqueda" type="text" placeholder="Buscar por ciudad, comuna o región..."
                                aria-label="Buscar iglesias" />
                        </div>

                        <div class="search-meta">
                            <span>
                                {{ iglesiasFiltradas.length }} resultado<span
                                    v-if="iglesiasFiltradas.length !== 1">s</span>
                            </span>
                            <button v-if="busqueda" class="clear-search-btn" type="button" @click="busqueda = ''">
                                Limpiar
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="vistaActiva === 'explorar'" class="explorer-grid">
                    <aside class="sidebar">
                        <div class="results-list custom-scrollbar">
                            <div v-for="iglesia in iglesiasFiltradas" :key="iglesia.id" class="mini-card compact"
                                :class="{ 'is-selected': iglesiaSeleccionada?.id === iglesia.id }">
                                <button type="button" class="mini-card__main" @click="seleccionarIglesia(iglesia)">
                                    <div class="card-inline-header">
                                        <span class="church-tag">{{ iglesia.comuna }}</span>
                                        <h3>{{ iglesia.nombre }}</h3>
                                    </div>

                                    <p class="mini-card__region">{{ iglesia.region }}</p>
                                    <p class="mini-card__addr">{{ iglesia.direccion }}</p>
                                    <p class="mini-card__pastor">Pastor: {{ iglesia.pastor }}</p>
                                </button>

                                <div class="mini-card__footer">
                                    <button type="button" class="mini-link-btn" @click="seleccionarIglesia(iglesia)">
                                        Ver en mapa
                                    </button>

                                    <RouterLink :to="`/iglesias/${iglesia.slug}`"
                                        class="mini-link-btn mini-link-btn--gold">
                                        Ver detalle
                                    </RouterLink>
                                </div>
                            </div>

                            <div v-if="iglesiasFiltradas.length === 0" class="no-results-mini">
                                <p>No se encontraron iglesias para “{{ busqueda }}”.</p>
                            </div>
                        </div>
                    </aside>

                    <div class="map-container">
                        <div id="map" class="map-element"></div>

                        <Transition name="slide-up">
                            <div v-if="iglesiaSeleccionada" class="church-detail-panel glass-panel">
                                <button class="close-btn" type="button" aria-label="Cerrar detalle"
                                    @click="iglesiaSeleccionada = null">
                                    ×
                                </button>

                                <div class="detail-content-compact">
                                    <div class="detail-text">
                                        <p class="section-eyebrow mini">{{ iglesiaSeleccionada.region }}</p>
                                        <h2>{{ iglesiaSeleccionada.nombre }}</h2>

                                        <div class="detail-meta">
                                            <div class="detail-item">
                                                <span class="detail-label">Dirección</span>
                                                <p>{{ iglesiaSeleccionada.direccion }}</p>
                                            </div>

                                            <div class="detail-item">
                                                <span class="detail-label">Comuna</span>
                                                <p>{{ iglesiaSeleccionada.comuna }}</p>
                                            </div>

                                            <div class="detail-item">
                                                <span class="detail-label">Pastor</span>
                                                <p>{{ iglesiaSeleccionada.pastor }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="detail-actions">
                                        <RouterLink :to="`/iglesias/${iglesiaSeleccionada.slug}`"
                                            class="btn-secondary btn-compact">
                                            Ver detalle
                                        </RouterLink>

                                        <a :href="googleMapsUrl(iglesiaSeleccionada)" target="_blank"
                                            rel="noopener noreferrer" class="btn-primary btn-compact">
                                            Cómo llegar
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>

                <div v-else class="all-view">
                    <div v-if="iglesiasFiltradas.length > 0" class="churches-grid">
                        <article v-for="iglesia in iglesiasFiltradas" :key="iglesia.id"
                            class="church-card-full glass-panel">
                            <div class="church-card-full__image-wrap">
                                <img :src="iglesia.foto" :alt="iglesia.nombre" class="church-card-full__image" />
                            </div>

                            <div class="church-card-full__body">
                                <span class="church-tag">{{ iglesia.comuna }}</span>
                                <h3>{{ iglesia.nombre }}</h3>
                                <p class="church-card-full__region">{{ iglesia.region }}</p>

                                <div class="church-card-full__meta">
                                    <p><strong>Pastor:</strong> {{ iglesia.pastor }}</p>
                                    <p><strong>Dirección:</strong> {{ iglesia.direccion }}</p>
                                    <p v-if="iglesia.telefono"><strong>Teléfono:</strong> {{ iglesia.telefono }}</p>
                                    <p v-if="iglesia.email"><strong>Email:</strong> {{ iglesia.email }}</p>
                                </div>

                                <div class="church-card-full__socials" v-if="iglesia.redes">
                                    <a v-if="iglesia.redes.facebook" :href="iglesia.redes.facebook" target="_blank"
                                        rel="noopener noreferrer">Facebook</a>
                                    <a v-if="iglesia.redes.instagram" :href="iglesia.redes.instagram" target="_blank"
                                        rel="noopener noreferrer">Instagram</a>
                                    <a v-if="iglesia.redes.youtube" :href="iglesia.redes.youtube" target="_blank"
                                        rel="noopener noreferrer">YouTube</a>
                                </div>

                                <div class="church-card-full__actions">
                                    <button type="button" class="btn-secondary" @click="verEnMapa(iglesia)">
                                        Ver en mapa
                                    </button>

                                    <RouterLink :to="`/iglesias/${iglesia.slug}`" class="btn-primary">
                                        Ver detalle
                                    </RouterLink>
                                </div>
                            </div>
                        </article>
                    </div>

                    <div v-else class="no-results-full glass-panel">
                        <p>No se encontraron iglesias para “{{ busqueda }}”.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { iglesias } from '@/data/iglesias'

// State
const busqueda = ref('')
const vistaActiva = ref('explorar')
const iglesiaSeleccionada = ref(null)
const listaIglesias = ref(iglesias)

let map = null
let markersLayer = null

// Computed
const iglesiasFiltradas = computed(() => {
    const q = busqueda.value.toLowerCase().trim()
    if (!q) return listaIglesias.value

    return listaIglesias.value.filter((iglesia) =>
        [
            iglesia.nombre,
            iglesia.comuna,
            iglesia.region,
            iglesia.direccion,
            iglesia.pastor,
            iglesia.telefono,
            iglesia.email
        ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
            .includes(q)
    )
})

// Icono personalizado
const ipnIcon = L.icon({
    iconUrl: '/isotipo-ipn.png',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -30],
    className: 'map-custom-icon'
})

// Corregido: String interpolation
const googleMapsUrl = (iglesia) =>
    `https://www.google.com/maps/search/?api=1&query=${iglesia.lat},${iglesia.lng}`

// Map Logic
const initMap = async () => {
    await nextTick()
    if (map) return

    map = L.map('map', {
        zoomControl: true,
        attributionControl: false
    }).setView([-35.6751, -71.543], 5)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18
    }).addTo(map)

    markersLayer = L.layerGroup().addTo(map)

    actualizarMarkers()
    ajustarVistaMapa()

    setTimeout(() => {
        map.invalidateSize()
    }, 200)
}

const actualizarMarkers = () => {
    if (!map || !markersLayer) return
    markersLayer.clearLayers()

    iglesiasFiltradas.value.forEach((iglesia) => {
        const marker = L.marker([iglesia.lat, iglesia.lng], { icon: ipnIcon })

        marker.bindPopup(`
      <div style="min-width: 180px; color: #333;">
        <strong>${iglesia.nombre}</strong><br />
        ${iglesia.comuna}, ${iglesia.region}<br />
        <small>${iglesia.direccion}</small>
      </div>
    `)

        marker.on('click', () => {
            seleccionarIglesia(iglesia)
        })

        marker.addTo(markersLayer)
    })
}

const ajustarVistaMapa = () => {
    if (!map || iglesiasFiltradas.value.length === 0) return

    if (iglesiasFiltradas.value.length === 1) {
        const iglesia = iglesiasFiltradas.value[0]
        map.flyTo([iglesia.lat, iglesia.lng], 14, { duration: 1.1 })
        return
    }

    const bounds = L.latLngBounds(
        iglesiasFiltradas.value.map((iglesia) => [iglesia.lat, iglesia.lng])
    )

    map.fitBounds(bounds, {
        padding: [40, 40]
    })
}

const seleccionarIglesia = (iglesia) => {
    iglesiaSeleccionada.value = iglesia
    if (!map) return

    map.flyTo([iglesia.lat, iglesia.lng], 15, {
        duration: 1.2
    })
}

const verEnMapa = async (iglesia) => {
    vistaActiva.value = 'explorar'
    await nextTick()
    seleccionarIglesia(iglesia)

    setTimeout(() => {
        map?.invalidateSize()
    }, 150)
}

// Watchers
watch(iglesiasFiltradas, (nuevasIglesias) => {
    actualizarMarkers()
    ajustarVistaMapa()

    if (nuevasIglesias.length === 1) {
        iglesiaSeleccionada.value = nuevasIglesias[0]
    } else if (
        iglesiaSeleccionada.value &&
        !nuevasIglesias.some((i) => i.id === iglesiaSeleccionada.value.id)
    ) {
        iglesiaSeleccionada.value = null
    }
})

watch(vistaActiva, async (nuevaVista) => {
    if (nuevaVista === 'explorar') {
        await nextTick()
        setTimeout(() => {
            map?.invalidateSize()
            ajustarVistaMapa()
        }, 150)
    }
})

onMounted(() => {
    initMap()
})
</script>

<style scoped>
/* Tu CSS existente se mantiene igual, es correcto y está bien estructurado */
.iglesias-page {
    padding-top: 110px;
    min-height: 100vh;
    background:
        radial-gradient(circle at top, rgba(203, 164, 94, 0.08), transparent 30%),
        linear-gradient(180deg, #0b1520 0%, #0e1e2e 100%);
    color: var(--theme-text);
}

.page-header {
    text-align: center;
    margin-bottom: 2rem;
}

.page-header .section-container {
    max-width: 900px;
    margin: 0 auto;
}

.page-header h1 {
    margin: 0.35rem 0 0.75rem;
    font-size: clamp(2rem, 3vw, 3.2rem);
    line-height: 1.05;
}

.page-header h1 span {
    color: var(--theme-secondary);
}

.page-description {
    max-width: 760px;
    margin: 0 auto;
    color: var(--theme-text-soft);
    font-size: 1rem;
    line-height: 1.7;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 1.25rem;
    border-radius: 20px;
}

.view-switch {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.view-switch__btn {
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
    color: var(--theme-text);
    padding: 0.8rem 1rem;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.25s ease;
    font-weight: 700;
}

.view-switch__btn.active {
    background: var(--theme-secondary);
    color: #111;
    border-color: var(--theme-secondary);
}

.explorer-grid {
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 1.25rem;
    align-items: start;
    margin-bottom: 4rem;
}

.sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.search-sidebar {
    width: min(100%, 360px);
}

.search-field.compact {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.search-field__icon {
    opacity: .8;
    font-size: .95rem;
}

.search-field.compact input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: var(--theme-text);
    font-size: .92rem;
}

.search-field.compact input::placeholder {
    color: rgba(255, 255, 255, .45);
}

.search-meta {
    display: flex;
    justify-content: space-between;
    margin-top: .8rem;
    font-size: .78rem;
    color: var(--theme-text-soft);
}

.clear-search-btn {
    border: none;
    background: transparent;
    color: var(--theme-secondary);
    cursor: pointer;
    font-weight: 700;
}

.results-list {
    max-height: 460px;
    overflow-y: auto;
    padding-right: .4rem;
}

.mini-card.compact {
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    margin-bottom: .7rem;
    overflow: hidden;
    transition: all .25s ease;
}

.mini-card.compact:hover,
.mini-card.is-selected {
    transform: translateY(-2px);
    background: rgba(203, 164, 94, .08);
    border-color: rgba(203, 164, 94, .75);
    box-shadow: 0 12px 30px rgba(0, 0, 0, .2);
}

.mini-card__main {
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    padding: 1rem;
    color: inherit;
    cursor: pointer;
}

.mini-card__footer {
    display: flex;
    justify-content: space-between;
    gap: .75rem;
    padding: 0 1rem 1rem;
}

.mini-link-btn {
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, .12);
    background: rgba(255, 255, 255, .04);
    color: var(--theme-text);
    padding: .55rem .85rem;
    border-radius: 10px;
    font-size: .78rem;
    font-weight: 700;
    transition: all .25s ease;
}

.mini-link-btn--gold {
    border-color: rgba(203, 164, 94, .55);
    color: var(--theme-secondary);
}

.card-inline-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.church-tag {
    display: inline-block;
    width: fit-content;
    padding: 0.28rem 0.65rem;
    border-radius: 999px;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: var(--theme-secondary);
    color: #111;
    margin-bottom: 0.35rem;
}

.mini-card h3,
.church-card-full h3 {
    font-size: 1rem;
    margin: .15rem 0 0;
    font-family: var(--font-serif);
}

.mini-card__region,
.church-card-full__region {
    margin: .4rem 0 .2rem;
    font-size: .76rem;
    color: var(--theme-secondary);
}

.mini-card__addr,
.mini-card__pastor {
    font-size: .78rem;
    color: var(--theme-text-soft);
    margin: .12rem 0;
}

.map-container {
    position: relative;
    border-radius: 22px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    height: 420px;
    max-height: 420px;
    margin-top: .5rem;
    box-shadow:
        0 20px 60px rgba(0, 0, 0, .45),
        inset 0 0 0 1px rgba(255, 255, 255, .04);
}

.map-element {
    height: 100%;
    width: 100%;
    background: #0b0d11;
}

.church-detail-panel {
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 16px;
    z-index: 500;
    padding: 1.1rem 1.2rem;
    border-radius: 18px;
    backdrop-filter: blur(14px);
    background: rgba(10, 18, 28, .78);
    border: 1px solid rgba(255, 255, 255, .09);
}

.detail-content-compact {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.2rem;
}

.detail-text h2 {
    font-size: 1.35rem;
    margin: .2rem 0 .7rem;
}

.section-eyebrow.mini {
    font-size: .68rem;
}

.detail-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: .9rem;
}

.detail-label {
    font-size: .68rem;
    text-transform: uppercase;
    color: var(--theme-secondary);
    font-weight: 700;
}

.detail-item p {
    margin: 0;
    color: var(--theme-text-soft);
    font-size: .84rem;
}

.detail-actions,
.church-card-full__actions {
    display: flex;
    gap: .75rem;
    flex-wrap: wrap;
}

.btn-compact,
.btn-primary,
.btn-secondary {
    padding: .7rem 1.1rem;
    font-size: .8rem;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 700;
    transition: all .25s ease;
}

.btn-primary {
    background: var(--theme-secondary);
    color: #111;
    border: 1px solid var(--theme-secondary);
}

.btn-secondary {
    background: rgba(255, 255, 255, .04);
    color: var(--theme-text);
    border: 1px solid rgba(255, 255, 255, .12);
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 14px;
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, .07);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
}

.all-view {
    margin-bottom: 4rem;
}

.churches-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
}

.church-card-full {
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, .08);
}

.church-card-full__image-wrap {
    height: 220px;
    overflow: hidden;
}

.church-card-full__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.church-card-full__body {
    padding: 1rem;
}

.church-card-full__meta {
    margin: 0.85rem 0 1rem;
    color: var(--theme-text-soft);
    font-size: .88rem;
    line-height: 1.6;
}

.church-card-full__socials {
    display: flex;
    gap: .75rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
}

.church-card-full__socials a {
    color: var(--theme-secondary);
    text-decoration: none;
    font-size: .84rem;
    font-weight: 700;
}

.no-results-mini,
.no-results-full {
    display: grid;
    place-items: center;
    min-height: 180px;
    text-align: center;
    color: var(--theme-text-soft);
    border: 1px dashed rgba(255, 255, 255, 0.14);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.02);
    padding: 1rem;
}

:deep(.leaflet-top),
:deep(.leaflet-bottom) {
    z-index: 300;
}

:deep(.leaflet-top.leaflet-left) {
    top: 70px;
    left: 14px;
}

:deep(.leaflet-control-zoom) {
    border-radius: 10px;
    overflow: hidden;
}

:deep(.map-custom-icon) {
    filter: drop-shadow(0 8px 20px rgba(0, 0, 0, .35));
}

:deep(.leaflet-popup-content-wrapper) {
    background: #12202f;
    color: #fff;
    border-radius: 12px;
}

:deep(.leaflet-popup-tip) {
    background: #12202f;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all .4s cubic-bezier(.16, 1, .3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(110%);
    opacity: 0;
}

/* Responsividad */
@media (max-width: 1100px) {
    .top-bar {
        flex-direction: column;
        align-items: stretch;
    }

    .search-sidebar {
        width: 100%;
    }

    .explorer-grid {
        grid-template-columns: 300px 1fr;
    }

    .map-container {
        height: 380px;
    }

    .churches-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 900px) {
    .explorer-grid {
        grid-template-columns: 1fr;
    }

    .sidebar {
        order: 1;
    }

    .map-container {
        order: 2;
        height: 340px;
    }

    .results-list {
        display: flex;
        overflow-x: auto;
        gap: .8rem;
        padding-bottom: .5rem;
    }

    .mini-card.compact {
        min-width: 280px;
        margin-bottom: 0;
        flex-shrink: 0;
    }

    .detail-content-compact {
        flex-direction: column;
        align-items: stretch;
    }

    .detail-meta {
        grid-template-columns: 1fr;
    }

    .churches-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .map-container {
        height: 300px;
    }

    .detail-text h2 {
        font-size: 1.2rem;
    }

    .mini-card__footer,
    .church-card-full__actions,
    .detail-actions {
        flex-direction: column;
    }
}
</style>