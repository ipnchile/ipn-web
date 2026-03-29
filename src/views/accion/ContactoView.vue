<template>
    <main class="contact-page">
        <!-- HERO -->
        <section class="section-container section-block contact-hero">
            <div class="glass-panel contact-hero__panel">
                <div class="contact-hero__copy">
                    <p class="section-eyebrow">Contacto</p>
                    <h1>Contáctenos</h1>
                    <p class="contact-hero__text">
                        Puede comunicarse con nuestra misión para realizar consultas generales
                        o enviar una petición de oración. Complete el siguiente formulario
                        con la información solicitada.
                    </p>
                </div>

                <aside class="card contact-hero__highlight">
                    <p class="contact-hero__label">Canal oficial</p>
                    <h2>Contacto institucional</h2>
                    <p>
                        Este espacio está habilitado para recibir mensajes de contacto general
                        y solicitudes de oración de manera ordenada y clara.
                    </p>
                </aside>
            </div>
        </section>

        <!-- CONTENIDO -->
        <section class="section-container section-block">
            <div class="contact-layout">
                <!-- INFORMACIÓN -->
                <article class="glass-panel contact-info">
                    <p class="section-eyebrow">Información</p>
                    <h2>Estamos para servirle</h2>
                    <p class="contact-info__text">
                        Puede usar este formulario para consultas, orientación o peticiones
                        especiales. Su mensaje podrá ser derivado según el tipo de solicitud.
                    </p>

                    <div class="contact-info__items">
                        <div class="contact-info__item card">
                            <h3>Correo de contacto</h3>
                            <a href="mailto:contacto@ipnchile.cl">contacto@ipnchile.cl</a>
                        </div>

                        <div class="contact-info__item card">
                            <h3>Tipos de mensaje</h3>
                            <p>Contacto general o petición de oración.</p>
                        </div>

                        <div class="contact-info__item card">
                            <h3>Importante</h3>
                            <p>
                                Procure escribir con claridad su mensaje e indicar su región para
                                facilitar una mejor atención.
                            </p>
                        </div>
                    </div>
                </article>

                <!-- FORMULARIO -->
                <article class="glass-panel--strong contact-form-panel">
                    <p class="section-eyebrow">Formulario</p>
                    <h2>Envíe su mensaje</h2>

                    <form class="contact-form" @submit.prevent="enviarFormulario">
                        <div class="contact-form__grid">
                            <div class="form-group">
                                <label for="tipo">Tipo de solicitud</label>
                                <select id="tipo" v-model="formulario.tipo" class="input" required>
                                    <option disabled value="">Seleccione una opción</option>
                                    <option value="contacto">Contacto general</option>
                                    <option value="oracion">Petición de oración</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="region">Región</label>
                                <select id="region" v-model="formulario.region" class="input" required>
                                    <option disabled value="">Seleccione su región</option>
                                    <option v-for="region in regionesChile" :key="region" :value="region">
                                        {{ region }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="contact-form__grid">
                            <div class="form-group">
                                <label for="nombre">Nombre completo</label>
                                <input id="nombre" v-model.trim="formulario.nombre" type="text" class="input"
                                    placeholder="Ingrese su nombre" required />
                            </div>

                            <div class="form-group">
                                <label for="email">Correo electrónico</label>
                                <input id="email" v-model.trim="formulario.email" type="email" class="input"
                                    placeholder="Ingrese su correo" required />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="asunto">Asunto</label>
                            <input id="asunto" v-model.trim="formulario.asunto" type="text" class="input" :placeholder="formulario.tipo === 'oracion'
                                    ? 'Ej.: Petición de oración por salud'
                                    : 'Ej.: Solicitud de información'
                                " required />
                        </div>

                        <div class="form-group">
                            <label for="mensaje">
                                {{ formulario.tipo === 'oracion' ? 'Petición' : 'Mensaje' }}
                            </label>
                            <textarea id="mensaje" v-model.trim="formulario.mensaje"
                                class="input contact-form__textarea" :placeholder="formulario.tipo === 'oracion'
                                        ? 'Escriba aquí su petición de oración'
                                        : 'Escriba aquí su mensaje'
                                    " rows="7" required></textarea>
                        </div>

                        <div class="contact-form__actions">
                            <button type="submit" class="btn-primary" :disabled="enviando">
                                {{ enviando ? 'Enviando...' : 'Enviar mensaje' }}
                            </button>

                            <button type="button" class="btn-secondary" @click="limpiarFormulario" :disabled="enviando">
                                Limpiar
                            </button>
                        </div>

                        <Transition name="fade">
                            <p v-if="mensajeEstado" class="contact-form__status" :class="estadoClase">
                                {{ mensajeEstado }}
                            </p>
                        </Transition>
                    </form>
                </article>
            </div>
        </section>
    </main>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const enviando = ref(false)
const mensajeEstado = ref('')
const tipoEstado = ref('')

const regionesChile = [
    'Arica y Parinacota',
    'Tarapacá',
    'Antofagasta',
    'Atacama',
    'Coquimbo',
    'Valparaíso',
    'Metropolitana de Santiago',
    'Libertador General Bernardo O’Higgins',
    'Maule',
    'Ñuble',
    'Biobío',
    'La Araucanía',
    'Los Ríos',
    'Los Lagos',
    'Aysén del General Carlos Ibáñez del Campo',
    'Magallanes y de la Antártica Chilena'
]

const formulario = reactive({
    tipo: '',
    region: '',
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
})

const estadoClase = computed(() => {
    return tipoEstado.value === 'success'
        ? 'contact-form__status--success'
        : 'contact-form__status--error'
})

function limpiarFormulario() {
    formulario.tipo = ''
    formulario.region = ''
    formulario.nombre = ''
    formulario.email = ''
    formulario.asunto = ''
    formulario.mensaje = ''
    mensajeEstado.value = ''
    tipoEstado.value = ''
}

async function enviarFormulario() {
    mensajeEstado.value = ''
    tipoEstado.value = ''

    if (
        !formulario.tipo ||
        !formulario.region ||
        !formulario.nombre ||
        !formulario.email ||
        !formulario.asunto ||
        !formulario.mensaje
    ) {
        mensajeEstado.value = 'Debe completar todos los campos.'
        tipoEstado.value = 'error'
        return
    }

    enviando.value = true

    try {
        const response = await fetch('/api/contacto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tipo: formulario.tipo,
                region: formulario.region,
                nombre: formulario.nombre,
                email: formulario.email,
                asunto: formulario.asunto,
                mensaje: formulario.mensaje
            })
        })

        if (!response.ok) {
            throw new Error('No fue posible enviar el formulario.')
        }

        mensajeEstado.value = 'Su mensaje fue enviado correctamente.'
        tipoEstado.value = 'success'

        formulario.tipo = ''
        formulario.region = ''
        formulario.nombre = ''
        formulario.email = ''
        formulario.asunto = ''
        formulario.mensaje = ''
    } catch (error) {
        mensajeEstado.value =
            'No fue posible enviar el mensaje en este momento. Intente nuevamente más tarde.'
        tipoEstado.value = 'error'
    } finally {
        enviando.value = false
    }
}
</script>

<style scoped>
.contact-page {
    min-height: 100vh;
    padding-bottom: 4rem;
}

.contact-hero {
    padding-top: 1rem;
}

.contact-hero__panel {
    display: grid;
    grid-template-columns: 1.45fr 0.95fr;
    gap: 1.5rem;
    padding: 2rem;
}

.contact-hero__copy h1 {
    margin-bottom: 1rem;
    font-size: clamp(2.6rem, 5vw, 4.8rem);
    line-height: 1.02;
}

.contact-hero__text {
    max-width: 65ch;
    margin-bottom: 0;
    color: var(--theme-text-soft);
    font-size: 1.06rem;
    line-height: 1.8;
}

.contact-hero__highlight {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.contact-hero__label {
    margin: 0 0 0.5rem;
    color: var(--theme-secondary);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.contact-hero__highlight h2 {
    margin-bottom: 0.8rem;
}

.contact-hero__highlight p:last-child {
    margin-bottom: 0;
    color: var(--theme-text-soft);
}

.contact-layout {
    display: grid;
    grid-template-columns: 0.95fr 1.2fr;
    gap: 1.5rem;
}

.contact-info,
.contact-form-panel {
    padding: 2rem;
}

.contact-info__text {
    color: var(--theme-text-soft);
    line-height: 1.8;
    margin-bottom: 1.25rem;
}

.contact-info__items {
    display: grid;
    gap: 1rem;
}

.contact-info__item {
    padding: 1rem 1.1rem;
}

.contact-info__item h3 {
    margin-bottom: 0.45rem;
}

.contact-info__item p,
.contact-info__item a {
    margin: 0;
    color: var(--theme-text-soft);
    word-break: break-word;
}

.contact-info__item a:hover {
    color: var(--theme-secondary);
}

.contact-form-panel h2 {
    margin-bottom: 1.2rem;
}

.contact-form {
    display: grid;
    gap: 1rem;
}

.contact-form__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.45rem;
    color: var(--theme-text);
    font-weight: 700;
}

/* Corrección puntual para los select sin cambiar su diseño general */
.contact-form select.input {
    color: var(--theme-text);
    background-color: rgba(255, 255, 255, 0.06);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.contact-form select.input:invalid {
    color: var(--theme-text-soft);
}

.contact-form select.input option {
    color: #ffffff;
    background-color: #1f2f46;
}

.contact-form .form-group select.input,
.contact-form .form-group select.input option {
    -webkit-text-fill-color: currentColor;
}

.contact-form__textarea {
    min-height: 180px;
}

.contact-form__actions {
    display: flex;
    gap: 0.85rem;
    flex-wrap: wrap;
}

.contact-form__status {
    margin: 0.2rem 0 0;
    font-weight: 700;
}

.contact-form__status--success {
    color: var(--theme-secondary);
}

.contact-form__status--error {
    color: #ffb4b4;
}

@media (max-width: 980px) {
    .contact-hero__panel,
    .contact-layout,
    .contact-form__grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .contact-page {
        padding-bottom: 3rem;
    }

    .contact-hero__panel,
    .contact-info,
    .contact-form-panel {
        padding: 1.25rem;
    }

    .contact-form__actions {
        flex-direction: column;
    }
}
</style>