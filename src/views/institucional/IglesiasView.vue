<template>
    <main class="iglesias-page">
        <header class="page-header container-fluid">
            <div class="section-container text-center">
                <p class="section-eyebrow">Red de Iglesias</p>
                <h1 class="fw-bold">Nuestra <span>Presencia</span></h1>
                <p class="page-description mx-auto">
                    Conozca las congregaciones de nuestra red a lo largo de Chile. Busque por nombre,
                    comuna, región, dirección.
                </p>
            </div>
        </header>

        <section class="map-explorer container-fluid">
            <div class="section-container">
                <div
                    class="top-bar glass-panel d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mb-4">

                    <div class="view-switch d-flex gap-2">
                        <button type="button" class="view-switch__btn" :class="{ active: vistaActiva === 'explorar' }"
                            @click="vistaActiva = 'explorar'">
                            Explorar mapa
                        </button>

                        <button type="button" class="view-switch__btn" :class="{ active: vistaActiva === 'todas' }"
                            @click="vistaActiva = 'todas'">
                            Ver todas
                        </button>
                    </div>

                    <div class="search-wrapper d-flex align-items-center gap-3">
                        <div class="search-field">
                            <span class="search-field__icon">🔍</span>
                            <input v-model="busqueda" type="text" placeholder="Buscar iglesia, comuna, dirección..." />
                            <button v-if="busqueda" class="clear-btn" type="button" @click="busqueda = ''">
                                ×
                            </button>
                        </div>

                        <span class="results-counter d-none d-sm-block">
                            {{ iglesiasFiltradas.length }} resultados
                        </span>
                    </div>
                </div>

                <div v-if="vistaActiva === 'explorar'" class="explorer-layout">
                    <aside class="sidebar">
                        <div class="results-list custom-scrollbar">
                            <div v-for="iglesia in iglesiasFiltradas" :key="iglesia.id" class="mini-card"
                                :class="{ 'is-selected': iglesiaSeleccionada?.id === iglesia.id }">
                                <button type="button" class="mini-card__main" @click="seleccionarIglesia(iglesia)">
                                    <div class="card-inline-header">
                                        <span class="church-tag">{{ iglesia.comuna || 'Sin comuna' }}</span>
                                        <h3>{{ iglesia.nombre }}</h3>
                                    </div>

                                    <p class="mini-card__region">{{ iglesia.region || 'Sin región' }}</p>
                                    <p class="mini-card__addr text-truncate">{{ iglesia.direccion || 'Sin dirección' }}
                                    </p>

                                    <p v-if="iglesia.googleMapsName" class="mini-card__maps-name text-truncate">
                                        {{ iglesia.googleMapsName }}
                                    </p>
                                </button>

                                <div class="mini-card__footer">
                                    <button type="button" class="mini-link-btn flex-grow-1"
                                        @click="seleccionarIglesia(iglesia)">
                                        Mapa
                                    </button>

                                    <RouterLink :to="`/iglesias/${iglesia.slug}`"
                                        class="mini-link-btn mini-link-btn--gold flex-grow-1 text-center text-decoration-none">
                                        Detalle
                                    </RouterLink>
                                </div>
                            </div>

                            <div v-if="iglesiasFiltradas.length === 0" class="no-results-mini">
                                <p>No hay resultados para "{{ busqueda }}"</p>
                            </div>
                        </div>
                    </aside>

                    <div class="map-container">
                        <div id="map" class="map-element"></div>

                        <Transition name="slide-up">
                            <div v-if="iglesiaSeleccionada" class="church-detail-panel glass-panel">
                                <button type="button" class="close-btn" @click="iglesiaSeleccionada = null">
                                    ×
                                </button>

                                <div class="detail-content-compact">
                                    <div class="detail-text">
                                        <p class="section-eyebrow mini mb-1">
                                            {{ iglesiaSeleccionada.region || 'Sin región' }}
                                        </p>

                                        <h2 class="mb-1">{{ iglesiaSeleccionada.nombre }}</h2>

                                        <p class="mb-0 text-white-50 small d-none d-md-block text-truncate"
                                            style="max-width: 300px;">
                                            {{ iglesiaSeleccionada.direccion || 'Sin dirección' }}
                                        </p>
                                    </div>

                                    <div class="detail-actions d-flex gap-2">
                                        <RouterLink :to="`/iglesias/${iglesiaSeleccionada.slug}`"
                                            class="btn-secondary btn-compact flex-grow-1 text-center text-decoration-none">
                                            Detalle
                                        </RouterLink>

                                        <a :href="googleMapsUrl(iglesiaSeleccionada)" target="_blank"
                                            rel="noopener noreferrer"
                                            class="btn-primary btn-compact flex-grow-1 text-center text-decoration-none">
                                            Ruta
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>

                <div v-else class="all-view pb-5">
                    <div v-if="iglesiasFiltradas.length > 0" class="row g-4">
                        <div v-for="iglesia in iglesiasFiltradas" :key="iglesia.id" class="col-12 col-md-6 col-lg-4">
                            <article class="church-card-full glass-panel h-100">
                                <div class="church-card-full__image-wrap">
                                    <img v-if="getCardImage(iglesia)" :src="getCardImage(iglesia)" :alt="iglesia.nombre"
                                        class="church-card-full__image" @error="handleImageError" />

                                    <div v-else class="church-card-full__placeholder">
                                        <font-awesome-icon :icon="['fas', 'church']" class="placeholder-icon" />
                                    </div>
                                </div>

                                <div class="church-card-full__body p-4">
                                    <span class="church-tag">{{ iglesia.comuna || 'Sin comuna' }}</span>
                                    <h3 class="mt-3">{{ iglesia.nombre }}</h3>
                                    <p class="church-card-full__region mb-1">{{ iglesia.region || 'Sin región' }}</p>
                                    <p v-if="iglesia.googleMapsName" class="church-card-full__maps-name mb-4">
                                        {{ iglesia.googleMapsName }}
                                    </p>

                                    <div class="church-card-full__image-wrap">
                                        <img v-if="getCardImage(iglesia)" :src="getCardImage(iglesia)"
                                            :alt="iglesia.nombre" class="church-card-full__image"
                                            @error="handleImageError" />

                                        <div class="church-card-full__placeholder">
                                            <font-awesome-icon :icon="['fas', 'church']" class="placeholder-icon" />
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>

                    <div v-else class="no-results-mini">
                        <p>No hay resultados para "{{ busqueda }}"</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { iglesias } from '@/data/iglesias'

const DEFAULT_FOTO = ''
const SANTIAGO_COORDS = [-33.4489, -70.6693]

const busqueda = ref('')
const vistaActiva = ref('explorar')
const iglesiaSeleccionada = ref(null)
const listaIglesias = ref(iglesias)

let map = null
let markersLayer = null

const ipnIcon = L.icon({
    iconUrl: '/isotipo-ipn.png',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -30],
    className: 'map-custom-icon'
})

const handleImageError = (event) => {
    event.target.style.display = 'none'

    const placeholder = event.target
        .closest('.church-card-full__image-wrap')
        ?.querySelector('.church-card-full__placeholder')

    if (placeholder) {
        placeholder.style.display = 'flex'
    }
}

const normalizarTexto = (texto = '') =>
    texto
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim()

const getCardImage = (iglesia) =>
    iglesia.fotoIglesia ||
    iglesia.foto ||
    iglesia.fotoMini ||
    DEFAULT_FOTO

const getDireccionCompleta = (iglesia) => {
    return [
        iglesia.googleMapsName || '',
        iglesia.nombre || '',
        iglesia.direccion || '',
        iglesia.comuna || '',
        iglesia.region || '',
        'Chile'
    ]
        .filter(Boolean)
        .join(', ')
}

/**
 * Prioridad:
 * 1. Nombre Google Maps
 * 2. Coordenadas
 * 3. Dirección completa
 */
const googleMapsUrl = (iglesia) => {
    // 1. Prioridad máxima: Nombre registrado en Google (asegura ver la "Ficha" del lugar)
    if (iglesia?.googleMapsName) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(iglesia.googleMapsName)}`
    }

    // 2. Coordenadas: Precisión absoluta (con el nombre entre paréntesis para la etiqueta)
    if (typeof iglesia?.lat === 'number' && typeof iglesia?.lng === 'number') {
        // Al añadir (Nombre) al final de la lat/lng, Google suele poner un pin con ese texto
        const label = iglesia.nombre ? `(${encodeURIComponent(iglesia.nombre)})` : ''
        return `https://www.google.com/maps/search/?api=1&query=${iglesia.lat},${iglesia.lng}${label}`
    }

    // 3. Dirección: Como último recurso de búsqueda
    const direccionCompleta = getDireccionCompleta(iglesia)

    if (direccionCompleta) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccionCompleta)}`
    }

    return 'https://www.google.com/maps'
}

/**
 * Detecta si el texto parece coordenadas:
 * -33.4489, -70.6693
 * -33.4489 -70.6693
 * -33.4489;-70.6693
 */
const parseCoordinates = (input) => {
    if (!input) return null

    const cleaned = input
        .trim()
        .replace(/[;]+/g, ',')
        .replace(/\s+/g, ' ')

    let match = cleaned.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/)

    if (!match) {
        match = cleaned.match(/^(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)$/)
    }

    if (!match) return null

    const lat = Number(match[1])
    const lng = Number(match[2])

    if (
        Number.isNaN(lat) ||
        Number.isNaN(lng) ||
        lat < -90 || lat > 90 ||
        lng < -180 || lng > 180
    ) {
        return null
    }

    return { lat, lng }
}

/**
 * Distancia entre dos coordenadas en kilómetros (Haversine)
 */
const distanceInKm = (lat1, lng1, lat2, lng2) => {
    const toRad = (deg) => (deg * Math.PI) / 180
    const R = 6371

    const dLat = toRad(lat2 - lat1)
    const dLng = toRad(lng2 - lng1)

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

/**
 * Retorna la iglesia más cercana a un punto
 */
const findNearestChurch = (lat, lng) => {
    const conCoords = listaIglesias.value.filter(
        (i) => typeof i.lat === 'number' && typeof i.lng === 'number'
    )

    if (!conCoords.length) return null

    let nearest = null
    let minDistance = Infinity

    for (const iglesia of conCoords) {
        const dist = distanceInKm(lat, lng, iglesia.lat, iglesia.lng)

        if (dist < minDistance) {
            minDistance = dist
            nearest = {
                ...iglesia,
                distanceKm: dist
            }
        }
    }

    return nearest
}

const iglesiasFiltradas = computed(() => {
    const raw = busqueda.value.trim()
    const q = normalizarTexto(raw)

    if (!q) return listaIglesias.value

    // Búsqueda por coordenadas
    const coords = parseCoordinates(raw)
    if (coords) {
        const nearest = findNearestChurch(coords.lat, coords.lng)

        if (!nearest || nearest.distanceKm > 50) {
            return []
        }

        return [nearest]
    }

    // Búsqueda textual: nombre, nombre Google Maps, aliases, ubicación, slug
    return listaIglesias.value.filter((i) => {
        const campos = [
            i.nombre,
            i.googleMapsName,
            ...(i.searchAliases || []),
            i.comuna,
            i.region,
            i.direccion,
            i.slug
        ]

        return campos.some((campo) =>
            normalizarTexto(campo).includes(q)
        )
    })
})

const initMap = async () => {
    await nextTick()
    if (map) return

    map = L.map('map', {
        zoomControl: true,
        attributionControl: false
    }).setView(SANTIAGO_COORDS, 12)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18
    }).addTo(map)

    markersLayer = L.layerGroup().addTo(map)
    actualizarMarkers()

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                map.setView([pos.coords.latitude, pos.coords.longitude], 13)
            },
            () => {
                console.log('Ubicación no disponible')
            }
        )
    }
}

const actualizarMarkers = () => {
    if (!map || !markersLayer) return

    markersLayer.clearLayers()

    iglesiasFiltradas.value.forEach((i) => {
        if (typeof i.lat !== 'number' || typeof i.lng !== 'number') return

        L.marker([i.lat, i.lng], { icon: ipnIcon })
            .on('click', () => seleccionarIglesia(i))
            .addTo(markersLayer)
    })
}

const seleccionarIglesia = (iglesia) => {
    iglesiaSeleccionada.value = iglesia

    if (!map) return
    if (typeof iglesia.lat !== 'number' || typeof iglesia.lng !== 'number') return

    map.flyTo([iglesia.lat, iglesia.lng], 15, { duration: 1.2 })
}

const verEnMapa = async (iglesia) => {
    vistaActiva.value = 'explorar'
    await nextTick()
    seleccionarIglesia(iglesia)
}

const handleResize = () => {
    if (map) map.invalidateSize()
}

watch(iglesiasFiltradas, async (nuevas) => {
    actualizarMarkers()

    if (nuevas.length === 1) {
        await nextTick()
        seleccionarIglesia(nuevas[0])
    } else {
        iglesiaSeleccionada.value = null
    }
})

watch(vistaActiva, async (valor) => {
    if (valor === 'explorar') {
        await nextTick()
        setTimeout(handleResize, 100)
    }
})

onMounted(() => {
    initMap()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)

    if (map) {
        map.remove()
        map = null
        markersLayer = null
    }
})
</script>

<style scoped>
.iglesias-page {
    padding-top: 100px;
    background: linear-gradient(180deg, #0b1520 0%, #0e1e2e 100%);
    min-height: 100vh;
    color: white;
}

.section-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
}

.page-header {
    padding-bottom: 1.5rem;
}

.page-description {
    max-width: 760px;
}

.top-bar {
    padding: 0.8rem 1.2rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.view-switch__btn {
    height: 46px;
    padding: 0 1.5rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent;
    color: white;
    font-weight: 600;
    font-size: 0.85rem;
    transition: all 0.3s ease;
}

.view-switch__btn.active {
    background: #cba45e;
    color: #111;
    border-color: #cba45e;
}

.search-wrapper {
    flex: 1;
    max-width: 500px;
    justify-content: flex-end;
}

.search-field {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 0 1rem;
    height: 46px;
    width: 100%;
}

.search-field__icon {
    opacity: 0.75;
    font-size: 0.95rem;
}

.search-field input {
    background: transparent;
    border: none;
    color: white;
    padding: 0 0.8rem;
    width: 100%;
    outline: none;
    font-size: 0.9rem;
}

.search-field input::placeholder {
    color: rgba(255, 255, 255, 0.45);
}

.results-counter {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.4);
    white-space: nowrap;
}

.clear-btn {
    background: none;
    border: none;
    color: white;
    opacity: 0.5;
    cursor: pointer;
    font-size: 1.2rem;
}

.explorer-layout {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 1.5rem;
    height: calc(100vh - 350px);
    min-height: 550px;
    margin-bottom: 4rem;
    align-items: stretch;
}

.sidebar {
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

.results-list {
    flex: 1;
    overflow-y: auto;
    padding-right: 10px;
    min-height: 0;
}

.map-container {
    height: 100%;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
}

.map-element {
    height: 100%;
    width: 100%;
}

.mini-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    margin-bottom: 1rem;
    transition: 0.3s;
}

.mini-card.is-selected {
    border-color: #cba45e;
    background: rgba(203, 164, 94, 0.1);
}

.mini-card__main {
    width: 100%;
    padding: 1.2rem;
    background: none;
    border: none;
    text-align: left;
    color: inherit;
    cursor: pointer;
}

.mini-card h3 {
    font-size: 1rem;
    margin: 0.3rem 0;
    font-weight: 700;
}

.mini-card__region {
    margin: 0;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
}

.mini-card__addr {
    margin: 0.35rem 0 0;
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.5);
}

.mini-card__maps-name {
    margin: 0.35rem 0 0;
    font-size: 0.78rem;
    color: rgba(203, 164, 94, 0.9);
}

.mini-card__footer {
    display: flex;
    padding: 0 1.2rem 1.2rem;
    gap: 0.5rem;
}

.card-inline-header {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.church-tag {
    align-self: flex-start;
    background: #cba45e;
    color: #000;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
}

.church-detail-panel {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 20px;
    z-index: 1000;
    padding: 1.2rem;
    border-radius: 18px;
    backdrop-filter: blur(15px);
    background: rgba(11, 21, 32, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn {
    position: absolute;
    top: 0.7rem;
    right: 0.9rem;
    background: transparent;
    border: none;
    color: white;
    font-size: 1.4rem;
    cursor: pointer;
    line-height: 1;
}

.detail-content-compact {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding-right: 1.2rem;
}

.detail-text h2 {
    font-size: 1.2rem;
}

.church-card-full {
    overflow: hidden;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
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

.church-card-full__region {
    color: rgba(255, 255, 255, 0.65);
}

.church-card-full__maps-name {
    color: rgba(203, 164, 94, 0.9);
    font-size: 0.85rem;
    min-height: 2.4em;
}

.no-results-mini {
    padding: 1.5rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px dashed rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.7);
}

.btn-primary {
    background: #cba45e;
    color: #000;
    border: none;
    font-weight: 700;
    padding: 0.6rem 1.2rem;
    border-radius: 10px;
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-weight: 700;
    padding: 0.6rem 1.2rem;
    border-radius: 10px;
}

.btn-compact {
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
}

.mini-link-btn {
    font-size: 0.75rem;
    padding: 0.5rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.mini-link-btn--gold {
    border-color: #cba45e;
    color: #cba45e;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.4s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(110%);
    opacity: 0;
}

.church-card-full__image-wrap {
    height: 220px;
    overflow: hidden;
    position: relative;
    background: rgba(255, 255, 255, 0.035);
}

.church-card-full__placeholder {
    width: 100%;
    height: 100%;
    display: none;
    align-items: center;
    justify-content: center;
    background:
        radial-gradient(circle at center, rgba(203, 164, 94, 0.12), transparent 55%),
        rgba(255, 255, 255, 0.035);
}

.church-card-full__image-wrap:not(:has(img)) .church-card-full__placeholder {
    display: flex;
}

.placeholder-icon {
    font-size: 3.5rem;
    color: rgba(203, 164, 94, 0.85);
}

@media (max-width: 991px) {
    .explorer-layout {
        display: flex;
        flex-direction: column;
        height: auto;
    }

    .map-container {
        order: 1;
        height: 350px;
    }

    .sidebar {
        order: 2;
    }

    .results-list {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 1rem 0;
        gap: 1rem;
    }

    .mini-card {
        flex: 0 0 280px;
        margin-bottom: 0;
    }

    .top-bar {
        flex-direction: column;
        align-items: stretch;
    }

    .search-wrapper {
        max-width: 100%;
    }

    .detail-content-compact {
        flex-direction: column;
        align-items: stretch;
        padding-right: 0;
    }

    .detail-actions {
        width: 100%;
    }
}

@media (max-width: 576px) {
    .iglesias-page {
        padding-top: 88px;
    }

    .section-container {
        padding: 0 14px;
    }

    .explorer-layout {
        gap: 1rem;
        min-height: auto;
    }

    .map-container {
        height: 300px;
        border-radius: 18px;
    }

    .church-detail-panel {
        left: 12px;
        right: 12px;
        bottom: 12px;
        padding: 1rem;
    }

    .view-switch {
        width: 100%;
    }

    .view-switch__btn {
        flex: 1;
        padding: 0 0.8rem;
    }
}
</style>