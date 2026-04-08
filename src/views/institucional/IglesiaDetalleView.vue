<template>
    <main v-if="iglesia" class="iglesia-detalle-page">
        <!-- HERO / PORTADA INSTITUCIONAL -->
        <header class="church-hero">
            <div class="hero-overlay"></div>

            <div class="container-xl hero-content">
                <div class="hero-grid">
                    <!-- FOTO PRINCIPAL -->
                    <div class="hero-image-panel">
                        <div v-if="debeMostrarPlaceholderIglesia" class="hero-image-placeholder">
                            <font-awesome-icon :icon="['fas', 'church']" class="placeholder-icon" />
                            <p>Fotografía institucional no disponible</p>
                        </div>

                        <img v-else :src="iglesia.fotoIglesia || iglesia.foto || iglesia.fotoMini" :alt="iglesia.nombre"
                            class="hero-image" @error="onImageError('iglesia')" />
                    </div>

                    <!-- DATOS PRINCIPALES -->
                    <div class="hero-info">
                        <RouterLink to="/iglesias" class="btn-back-link text-decoration-none">
                            <font-awesome-icon :icon="['fas', 'arrow-left']" class="me-2" />
                            Volver al listado
                        </RouterLink>
                        <p class="institution-label">Iglesia Pentecostal Nazareth</p>
                        <h1 class="church-title">{{ iglesia.nombre }}</h1>

                        <div class="hero-meta-list">
                            <div class="meta-chip">
                                <font-awesome-icon :icon="['fas', 'location-dot']" />
                                <span>{{ iglesia.comuna }}, {{ iglesia.region }}</span>
                            </div>

                            <div v-if="iglesia.zona" class="meta-chip">
                                <font-awesome-icon :icon="['fas', 'map']" />
                                <span>{{ iglesia.zona }}</span>
                            </div>

                            <div v-if="iglesia.grado" class="meta-chip">
                                <font-awesome-icon :icon="['fas', 'user-tie']" />
                                <span>{{ iglesia.grado }}</span>
                            </div>
                        </div>

                        <p class="hero-description">
                            Comunidad local perteneciente a la Iglesia Pentecostal Nazareth,
                            ubicada en {{ iglesia.comuna }}, comprometida con la predicación del evangelio,
                            la comunión fraterna y el servicio a las familias.
                        </p>

                        <div class="hero-actions">
                            <a :href="googleMapsUrl(iglesia)" target="_blank" rel="noopener noreferrer"
                                class="btn-primary-ipn text-decoration-none">
                                <font-awesome-icon :icon="['fas', 'location-dot']" class="me-2" />
                                Cómo llegar
                            </a>

                            <a v-if="iglesia.email" :href="`mailto:${iglesia.email}`"
                                class="btn-secondary-ipn text-decoration-none">
                                <font-awesome-icon :icon="['fas', 'envelope']" class="me-2" />
                                Contactar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- CONTENIDO -->
        <section class="church-content container-xl">
            <div class="content-layout">
                <!-- COLUMNA PRINCIPAL -->
                <div class="main-column">
                    <!-- FICHA INSTITUCIONAL -->
                    <article class="info-card">
                        <div class="section-heading">
                            <span class="section-line"></span>
                            <h2>Ficha institucional</h2>
                        </div>

                        <div class="info-grid">
                            <div class="info-item">
                                <label>Nombre oficial</label>
                                <p>{{ iglesia.nombre }}</p>
                            </div>

                            <div class="info-item">
                                <label>Comuna</label>
                                <p>{{ iglesia.comuna }}</p>
                            </div>

                            <div class="info-item">
                                <label>Región</label>
                                <p>{{ iglesia.region }}</p>
                            </div>

                            <div class="info-item">
                                <label>Zona</label>
                                <p>{{ iglesia.zona || 'No informada' }}</p>
                            </div>

                            <div class="info-item">
                                <label>Grado eclesiástico</label>
                                <p>{{ iglesia.grado || 'No informado' }}</p>
                            </div>

                            <div class="info-item">
                                <label>Dirección</label>
                                <p>{{ iglesia.direccion || 'No informada' }}</p>
                            </div>

                            <div class="info-item" v-if="iglesia.telefono">
                                <label>Teléfono</label>
                                <p>{{ iglesia.telefono }}</p>
                            </div>
                        </div>
                    </article>

                    <!-- CUERPO PASTORAL -->
                    <article class="info-card">
                        <div class="section-heading">
                            <span class="section-line"></span>
                            <h2>Cuerpo pastoral</h2>
                        </div>

                        <div class="pastoral-grid" :class="{ 'pastoral-grid-single': !iglesia.pastora }">
                            <!-- PASTOR -->
                            <div v-if="iglesia.pastor" class="pastoral-card">
                                <div class="pastoral-avatar">
                                    <div v-if="debeMostrarPlaceholderPastor" class="avatar-placeholder">
                                        <font-awesome-icon :icon="['fas', 'user-tie']" />
                                    </div>
                                    <img v-else :src="iglesia.fotoPastor" :alt="iglesia.pastor"
                                        @error="onImageError('pastor')" />
                                </div>

                                <div class="pastoral-text">
                                    <label>Pastor</label>
                                    <h3>{{ iglesia.pastor }}</h3>
                                    <p>{{ iglesia.grado || 'Cuerpo pastoral IPN' }}</p>

                                    <a v-if="iglesia.email" :href="`mailto:${iglesia.email}`" class="pastoral-email">
                                        <font-awesome-icon :icon="['fas', 'envelope']" />
                                        <span>{{ iglesia.email }}</span>
                                    </a>
                                </div>
                            </div>

                            <!-- PASTORA -->
                            <div v-if="iglesia.pastora" class="pastoral-card">
                                <div class="pastoral-avatar">
                                    <div v-if="debeMostrarPlaceholderPastora" class="avatar-placeholder">
                                        <font-awesome-icon :icon="['fas', 'user']" />
                                    </div>
                                    <img v-else :src="iglesia.fotoPastora" :alt="iglesia.pastora"
                                        @error="onImageError('pastora')" />
                                </div>

                                <div class="pastoral-text">
                                    <label>Pastora</label>
                                    <h3>{{ iglesia.pastora }}</h3>
                                    <a v-if="iglesia.emailPastora" :href="`mailto:${iglesia.emailPastora}`"
                                        class="pastoral-email">
                                        <font-awesome-icon :icon="['fas', 'envelope']" />
                                        <span>{{ iglesia.emailPastora }}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>

                    <!-- HORARIOS -->
                    <article class="info-card">
                        <div class="section-heading">
                            <span class="section-line"></span>
                            <h2>Horarios de reunión</h2>
                        </div>

                        <ul v-if="iglesia.horarios?.length" class="schedule-list">
                            <li v-for="(horario, index) in iglesia.horarios" :key="index">
                                <div class="schedule-badge">
                                    <font-awesome-icon :icon="['fas', 'clock']" />
                                </div>
                                <span>{{ horario }}</span>
                            </li>
                        </ul>

                        <p v-else class="empty-text">Horarios por confirmar.</p>
                    </article>
                </div>

                <!-- SIDEBAR -->
                <aside class="sidebar-column">
                    <!-- CONTACTO -->
                    <article class="info-card sidebar-card">
                        <div class="section-heading">
                            <span class="section-line"></span>
                            <h2>Ubicación</h2>
                        </div>

                        <div class="contact-stack">
                            <div class="contact-row">
                                <font-awesome-icon :icon="['fas', 'location-dot']" class="contact-icon" />
                                <div>
                                    <label>Dirección</label>
                                    <p>{{ iglesia.direccion || 'No informada' }}</p>
                                </div>
                            </div>

                            <div v-if="iglesia.telefono" class="contact-row">
                                <font-awesome-icon :icon="['fas', 'phone']" class="contact-icon" />
                                <div>
                                    <label>Teléfono</label>
                                    <p>{{ iglesia.telefono }}</p>
                                </div>
                            </div>
                        </div>

                        <div v-if="tieneRedes" class="social-block">
                            <h3>Redes sociales</h3>
                            <div class="social-row">
                                <a v-if="iglesia.redes?.facebook" :href="iglesia.redes.facebook" target="_blank"
                                    rel="noopener noreferrer" class="social-link">
                                    <font-awesome-icon :icon="['fab', 'facebook-f']" />
                                </a>

                                <a v-if="iglesia.redes?.instagram" :href="iglesia.redes.instagram" target="_blank"
                                    rel="noopener noreferrer" class="social-link">
                                    <font-awesome-icon :icon="['fab', 'instagram']" />
                                </a>

                                <a v-if="iglesia.redes?.youtube" :href="iglesia.redes.youtube" target="_blank"
                                    rel="noopener noreferrer" class="social-link">
                                    <font-awesome-icon :icon="['fab', 'youtube']" />
                                </a>
                            </div>
                        </div>
                    </article>

                    <!-- MAPA -->
                    <article class="info-card sidebar-card map-card">
                        <div class="section-heading">
                            <span class="section-line"></span>
                            <h2>Mapa</h2>
                        </div>

                        <div v-if="tieneCoordenadas" id="map" class="map-element"></div>

                        <div v-else class="map-empty-state">
                            <font-awesome-icon :icon="['fas', 'location-dot']" class="map-empty-icon" />
                            <p>Ubicación geográfica aún no disponible.</p>
                        </div>
                    </article>
                </aside>
            </div>
        </section>
    </main>

    <main v-else class="not-found-page">
        <div class="not-found-box">
            <font-awesome-icon :icon="['fas', 'church']" class="not-found-icon" />
            <h1>Iglesia no encontrada</h1>
            <p>No fue posible localizar la información solicitada.</p>
            <RouterLink to="/iglesias" class="btn-primary-ipn text-decoration-none">
                Volver al listado
            </RouterLink>
        </div>
    </main>
</template>

<script setup>
import { computed, onMounted, nextTick, onUnmounted, reactive, watch } from "vue"
import { useRoute } from "vue-router"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { iglesias } from "@/data/iglesias"

const route = useRoute()

const iglesia = computed(() =>
    iglesias.find((item) => item.slug === route.params.slug)
)

const imageErrors = reactive({
    iglesia: false,
    pastor: false,
    pastora: false
})

const urlInvalida = (url) => {
    return (
        !url ||
        !String(url).trim() ||
        String(url).includes("default.jpg") ||
        String(url).includes("default.png")
    )
}

const debeMostrarPlaceholderIglesia = computed(() => {
    if (!iglesia.value) return true
    const fotoPrincipal = iglesia.value.fotoIglesia || iglesia.value.foto || iglesia.value.fotoMini
    return urlInvalida(fotoPrincipal) || imageErrors.iglesia
})

const debeMostrarPlaceholderPastor = computed(() => {
    if (!iglesia.value?.pastor) return true
    return urlInvalida(iglesia.value.fotoPastor) || imageErrors.pastor
})

const debeMostrarPlaceholderPastora = computed(() => {
    if (!iglesia.value?.pastora) return true
    return urlInvalida(iglesia.value.fotoPastora) || imageErrors.pastora
})

const tieneRedes = computed(() => {
    if (!iglesia.value?.redes) return false
    const r = iglesia.value.redes
    return !!(r.facebook || r.instagram || r.youtube)
})

const tieneCoordenadas = computed(() => {
    return iglesia.value?.lat !== null && iglesia.value?.lat !== undefined
        && iglesia.value?.lng !== null && iglesia.value?.lng !== undefined
})

const onImageError = (tipo) => {
    imageErrors[tipo] = true
}

watch(
    () => route.params.slug,
    () => {
        imageErrors.iglesia = false
        imageErrors.pastor = false
        imageErrors.pastora = false
    }
)

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

let map = null

onMounted(async () => {
    if (!tieneCoordenadas.value) return

    await nextTick()

    map = L.map("map", {
        zoomControl: false,
        attributionControl: false
    }).setView([iglesia.value.lat, iglesia.value.lng], 15)

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19
    }).addTo(map)

    const icon = L.icon({
        iconUrl: "/isotipo-ipn.png",
        iconSize: [38, 38],
        iconAnchor: [19, 38]
    })

    L.marker([iglesia.value.lat, iglesia.value.lng], { icon }).addTo(map)
})

onUnmounted(() => {
    if (map) map.remove()
})
</script>

<style scoped>
.iglesia-detalle-page {
    min-height: 100vh;
    background:
        radial-gradient(circle at top right, rgba(var(--theme-secondary-rgb), 0.08), transparent 22%),
        linear-gradient(180deg, var(--theme-bg-deep) 0%, var(--theme-bg) 100%);
    color: var(--theme-text);
}

/* HERO */
.church-hero {
    position: relative;
    padding-top: 130px;
    padding-bottom: 70px;
    overflow: hidden;
    background:
        linear-gradient(135deg,
            rgba(var(--theme-bg-rgb), 0.98),
            rgba(var(--theme-primary-rgb), 0.92));
    border-bottom: 1px solid var(--theme-border-subtle);
}

.hero-overlay {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(circle at top right, rgba(var(--theme-secondary-rgb), 0.14), transparent 30%),
        radial-gradient(circle at left center, rgba(255, 255, 255, 0.04), transparent 28%);
    pointer-events: none;
}

.hero-content {
    position: relative;
    z-index: 2;
}

.hero-grid {
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 50px;
    align-items: center;
}

.hero-image-panel {
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: 18px;
    overflow: hidden;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.015)),
        var(--theme-panel-bg);
    border: 1px solid var(--theme-border-soft);
    box-shadow: var(--shadow-elevated);
}

.hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.hero-image-placeholder {
    width: 100%;
    height: 100%;
    min-height: 320px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: center;
    justify-content: center;
    color: var(--theme-secondary);
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.008)),
        var(--theme-panel-bg-soft);
    text-align: center;
    padding: 24px;
}

.placeholder-icon {
    font-size: 4.6rem;
}

.hero-image-placeholder p {
    margin: 0;
    font-size: 0.92rem;
    color: var(--theme-text-soft);
}

.institution-label {
    margin: 0 0 12px 0;
    color: var(--theme-secondary);
    text-transform: uppercase;
    letter-spacing: 2.4px;
    font-size: 0.78rem;
    font-weight: 800;
}

.church-title {
    margin: 0;
    color: var(--theme-text-strong);
    font-family: var(--font-serif);
    font-size: 3.25rem;
    line-height: 1.08;
    font-weight: 700;
}

.hero-meta-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
}

.meta-chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)),
        var(--theme-panel-bg-soft);
    border: 1px solid var(--theme-border-subtle);
    color: var(--theme-text);
    padding: 10px 14px;
    border-radius: 999px;
    font-size: 0.9rem;
}

.hero-description {
    margin-top: 24px;
    max-width: 760px;
    color: var(--theme-text-soft);
    font-size: 1rem;
    line-height: 1.8;
}

.hero-actions {
    margin-top: 28px;
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
}

/* BOTONES */
.btn-primary-ipn,
.btn-secondary-ipn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    padding: 0 22px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.88rem;
    transition: 0.25s ease;
    border: 1px solid transparent;
}

.btn-primary-ipn {
    background: var(--theme-secondary);
    color: var(--theme-button-text);
}

.btn-primary-ipn:hover {
    color: var(--theme-button-text);
    transform: translateY(-1px);
}

.btn-secondary-ipn {
    background: rgba(255, 255, 255, 0.02);
    color: var(--theme-text);
    border-color: var(--theme-border-soft);
}

.btn-secondary-ipn:hover {
    background: rgba(255, 255, 255, 0.06);
    color: var(--theme-text);
}

/* CONTENT */
.church-content {
    position: relative;
    z-index: 3;
    margin-top: -18px;
    padding-bottom: 80px;
}

.content-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: 30px;
    align-items: start;
}

.main-column,
.sidebar-column {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.info-card {
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.015)),
        var(--theme-panel-bg-strong);
    border-radius: 18px;
    padding: 30px;
    box-shadow: var(--shadow-panel);
    border: 1px solid var(--theme-border-subtle);
    backdrop-filter: blur(8px);
}

.sidebar-card {
    position: relative;
}

.section-heading {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;
}

.section-line {
    width: 36px;
    height: 3px;
    border-radius: 999px;
    background: var(--theme-secondary);
}

.section-heading h2 {
    margin: 0;
    font-size: 1.2rem;
    color: var(--theme-text-strong);
    font-weight: 800;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px 26px;
}

.info-item label,
.contact-row label,
.pastoral-text label {
    display: block;
    margin-bottom: 6px;
    color: var(--theme-secondary);
    font-size: 0.73rem;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
}

.info-item p,
.contact-row p {
    margin: 0;
    color: var(--theme-text);
    font-size: 0.96rem;
    line-height: 1.65;
}

/* PASTORAL */
.pastoral-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
}

.pastoral-grid-single {
    grid-template-columns: 1fr;
}

.pastoral-card {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 20px;
    border-radius: 14px;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.015)),
        var(--theme-panel-bg-soft);
    border: 1px solid var(--theme-border-soft);
}

.pastoral-avatar {
    width: 72px;
    height: 72px;
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    background: var(--theme-bg-deep);
    border: 2px solid rgba(var(--theme-secondary-rgb), 0.9);
}

.pastoral-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg,
            rgba(var(--theme-primary-rgb), 0.95),
            rgba(var(--theme-bg-rgb), 1));
    color: var(--theme-secondary);
    font-size: 1.5rem;
}

.pastoral-text h3 {
    margin: 0 0 5px 0;
    color: var(--theme-text-strong);
    font-size: 1rem;
    line-height: 1.45;
    font-weight: 800;
}

.pastoral-text p {
    margin: 0;
    color: var(--theme-text-soft);
    font-size: 0.88rem;
    line-height: 1.5;
}

.pastoral-email {
    margin-top: 10px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--theme-secondary);
    text-decoration: none;
    font-size: 0.86rem;
    font-weight: 600;
    overflow-wrap: anywhere;
    word-break: break-word;
}

.pastoral-email:hover {
    color: var(--theme-text-strong);
    text-decoration: underline;
}

/* HORARIOS */
.schedule-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.schedule-list li {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.012)),
        var(--theme-panel-bg-soft);
    border: 1px solid var(--theme-border-subtle);
    border-radius: 12px;
}

.schedule-badge {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--theme-secondary);
    color: var(--theme-button-text);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.schedule-list li span {
    color: var(--theme-text);
    font-size: 0.95rem;
    font-weight: 600;
}

.empty-text {
    margin: 0;
    color: var(--theme-text-soft);
}

/* CONTACTO */
.contact-stack {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.contact-row {
    display: flex;
    gap: 14px;
    align-items: flex-start;
}

.contact-icon {
    color: var(--theme-secondary);
    font-size: 1rem;
    margin-top: 4px;
    flex-shrink: 0;
}

.social-block {
    margin-top: 26px;
    padding-top: 22px;
    border-top: 1px solid var(--theme-border-subtle);
}

.social-block h3 {
    margin: 0 0 14px 0;
    font-size: 0.95rem;
    color: var(--theme-text-strong);
    font-weight: 700;
}

.social-row {
    display: flex;
    gap: 12px;
}

.social-link {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01)),
        var(--theme-panel-bg-soft);
    color: var(--theme-text);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--theme-border-subtle);
    transition: 0.25s ease;
}

.social-link:hover {
    background: var(--theme-secondary);
    color: var(--theme-button-text);
    transform: translateY(-1px);
}

/* MAPA */
.map-card {
    overflow: hidden;
}

.map-element {
    width: 100%;
    height: 320px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--theme-border-subtle);
    box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.02),
        0 12px 28px rgba(0, 0, 0, 0.22);
}

.map-empty-state {
    min-height: 320px;
    border-radius: 12px;
    border: 1px solid var(--theme-border-subtle);
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01)),
        var(--theme-panel-bg-soft);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    text-align: center;
    padding: 24px;
    color: var(--theme-text-soft);
}

.map-empty-icon {
    font-size: 2rem;
    color: var(--theme-secondary);
}

/* NOT FOUND */
.not-found-page {
    min-height: 100vh;
    background: linear-gradient(180deg, var(--theme-bg-deep), var(--theme-bg));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
}

.not-found-box {
    text-align: center;
    color: var(--theme-text);
    max-width: 420px;
}

.not-found-icon {
    font-size: 4rem;
    color: var(--theme-secondary);
    margin-bottom: 20px;
}

.not-found-box h1 {
    margin-bottom: 10px;
    color: var(--theme-text-strong);
}

.not-found-box p {
    color: var(--theme-text-soft);
    margin-bottom: 24px;
}

/* RESPONSIVE */
@media (max-width: 1199px) {
    .hero-grid {
        grid-template-columns: 360px 1fr;
    }
}

@media (max-width: 991px) {
    .church-hero {
        padding-top: 110px;
        padding-bottom: 50px;
    }

    .hero-grid,
    .content-layout,
    .pastoral-grid,
    .info-grid {
        grid-template-columns: 1fr;
    }

    .hero-info {
        text-align: center;
    }

    .hero-meta-list,
    .hero-actions {
        justify-content: center;
    }

    .hero-image-panel {
        max-width: 520px;
        margin: 0 auto;
    }

    .section-heading {
        justify-content: center;
    }
}

@media (max-width: 767px) {
    .church-title {
        font-size: 2.25rem;
    }

    .info-card {
        padding: 22px;
        border-radius: 16px;
    }

    .pastoral-card {
        flex-direction: column;
        text-align: center;
    }

    .hero-description {
        font-size: 0.96rem;
    }

    .meta-chip {
        width: 100%;
        justify-content: center;
    }

    .btn-primary-ipn,
    .btn-secondary-ipn {
        width: 100%;
    }

    .hero-actions {
        flex-direction: column;
    }
}

.btn-back-link {
    display: inline-flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.5); /* Color suave para no distraer */
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s ease;
    padding: 4px 0;
}

.btn-back-link:hover {
    color: var(--theme-secondary); /* Se ilumina en dorado al pasar el mouse */
    transform: translateX(-5px); /* Pequeño efecto de empuje hacia la izquierda */
}

/* Ajuste opcional para móviles para que se vea centrado si el hero se centra */
@media (max-width: 991px) {
    .btn-back-link {
        justify-content: center;
        margin-bottom: 10px;
    }
}
</style>
