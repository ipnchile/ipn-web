<template>
  <main class="donaciones-page">
    <!-- HERO -->
    <section class="section-container section-block donaciones-hero">
      <div class="glass-panel donaciones-hero__panel">
        <div class="donaciones-hero__copy">
          <p class="section-eyebrow">Aportes</p>
          <h1>Donaciones</h1>
          <p class="donaciones-hero__text">
            Para apoyar el ministerio y las numerosas iniciativas de nuestra Iglesia
            Pentecostal Nazareth a nivel nacional, puede considerar los siguientes
            datos bancarios oficiales.
          </p>
        </div>

        <aside class="card donaciones-hero__highlight">
          <p class="donaciones-hero__label">Apoyo al ministerio</p>
          <h2>Su aporte fortalece la obra</h2>
          <p>
            Cada contribución permite respaldar actividades, encuentros, proyectos,
            apoyo ministerial y distintas necesidades de la misión a nivel nacional.
          </p>
        </aside>
      </div>
    </section>

    <!-- BLOQUE PRINCIPAL -->
    <section class="section-container section-block">
      <div class="donaciones-layout">
        <!-- ILUSTRACIÓN -->
        <article class="glass-panel donaciones-visual">
          <div class="donaciones-visual__icon-wrap">
            <div class="donaciones-visual__icon-bg"></div>

            <svg
              class="donaciones-visual__icon"
              viewBox="0 0 256 256"
              aria-hidden="true"
            >
              <path
                d="M72 152c10-6 26-14 45-23 15-8 31-15 43-18 7-2 13-1 16 4 4 5 2 11-3 14l-55 29c-4 2-5 7-3 10 3 4 8 5 12 3l48-20c10-4 18-3 26 2l23 16c4 3 5 8 2 12l-16 22c-3 4-8 5-12 2l-39-27-50 24c-9 4-20 3-28-4l-36-28c-4-3-5-8-2-12l10-13c4-5 10-8 16-8 12 0 25-2 43-15z"
                fill="currentColor"
                opacity="0.95"
              />
              <path
                d="M52 176l-16 21c-3 4-2 10 2 13l28 22c4 3 10 2 13-2l17-22-44-32z"
                fill="currentColor"
                opacity="0.75"
              />
            </svg>
          </div>

          <div class="donaciones-visual__content">
            <p class="section-eyebrow">Aporte voluntario</p>
            <h2>Apoye el trabajo nacional de la IPN</h2>
            <p>
              Si desea contribuir, utilice los datos oficiales indicados en esta sección.
              Después de transferir, puede remitir el comprobante al correo informado.
            </p>
          </div>
        </article>

        <!-- DATOS BANCARIOS -->
        <article class="glass-panel--strong donaciones-bank">
          <div class="donaciones-bank__header">
            <p class="section-eyebrow">Datos bancarios</p>
            <h2>Iglesia Pentecostal Nazareth</h2>
          </div>

          <div class="donaciones-bank__grid">
            <div class="donaciones-field">
              <span class="donaciones-field__label">Banco</span>
              <div class="donaciones-field__value-row">
                <p class="donaciones-field__value">Banco de Chile</p>
              </div>
            </div>

            <div class="donaciones-field">
              <span class="donaciones-field__label">Tipo de cuenta</span>
              <div class="donaciones-field__value-row">
                <p class="donaciones-field__value">Cuenta Corriente</p>
              </div>
            </div>

            <div class="donaciones-field">
              <span class="donaciones-field__label">N° de cuenta</span>
              <div class="donaciones-field__value-row">
                <p class="donaciones-field__value">1800206401</p>
                <button
                  type="button"
                  class="btn-secondary donaciones-copy-btn"
                  @click="copyText('1800206401', 'Número de cuenta copiado')"
                >
                  Copiar
                </button>
              </div>
            </div>

            <div class="donaciones-field">
              <span class="donaciones-field__label">RUT</span>
              <div class="donaciones-field__value-row">
                <p class="donaciones-field__value">70.307.300-K</p>
                <button
                  type="button"
                  class="btn-secondary donaciones-copy-btn"
                  @click="copyText('70.307.300-K', 'RUT copiado')"
                >
                  Copiar
                </button>
              </div>
            </div>

            <div class="donaciones-field">
              <span class="donaciones-field__label">Correo</span>
              <div class="donaciones-field__value-row donaciones-field__value-row--wrap">
                <a
                  href="mailto:ofrenda@ipnchile.cl"
                  class="donaciones-field__link"
                >
                  ofrenda@ipnchile.cl
                </a>
                <button
                  type="button"
                  class="btn-secondary donaciones-copy-btn"
                  @click="copyText('ofrenda@ipnchile.cl', 'Correo copiado')"
                >
                  Copiar
                </button>
              </div>
            </div>
          </div>

          <div class="donaciones-note card">
            <h3>Importante</h3>
            <p>
              Si realiza una transferencia, procure enviar el comprobante al correo
              indicado para facilitar la identificación y el registro del aporte.
            </p>
          </div>

          <Transition name="fade">
            <p v-if="copyMessage" class="donaciones-copy-feedback">
              {{ copyMessage }}
            </p>
          </Transition>
        </article>
      </div>
    </section>

    <!-- ORIENTACIÓN -->
    <section class="section-container section-block">
      <div class="donaciones-info-grid">
        <article class="card donaciones-info-card">
          <p class="section-eyebrow">Uso responsable</p>
          <h3>Apoyo a la misión</h3>
          <p>
            Los aportes permiten respaldar actividades nacionales, encuentros,
            apoyo ministerial y diversas necesidades relacionadas con la obra.
          </p>
        </article>

        <article class="card donaciones-info-card">
          <p class="section-eyebrow">Canal oficial</p>
          <h3>Información clara y centralizada</h3>
          <p>
            Esta sección busca presentar de forma ordenada los datos oficiales
            para evitar errores al momento de transferir.
          </p>
        </article>

        <article class="card donaciones-info-card">
          <p class="section-eyebrow">Confirmación</p>
          <h3>Envío de comprobante</h3>
          <p>
            Para una mejor gestión, es recomendable remitir el respaldo del aporte
            al correo oficial publicado en esta vista.
          </p>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const copyMessage = ref('')

async function copyText(value, message) {
  try {
    await navigator.clipboard.writeText(value)
    copyMessage.value = message

    setTimeout(() => {
      copyMessage.value = ''
    }, 2200)
  } catch (error) {
    copyMessage.value = 'No fue posible copiar el dato'

    setTimeout(() => {
      copyMessage.value = ''
    }, 2200)
  }
}
</script>

<style scoped>
.donaciones-page {
  min-height: 100vh;
  padding-bottom: 4rem;
}

.donaciones-hero {
  padding-top: 1rem;
}

.donaciones-hero__panel {
  display: grid;
  grid-template-columns: 1.45fr 0.95fr;
  gap: 1.5rem;
  padding: 2rem;
}

.donaciones-hero__copy h1 {
  margin-bottom: 1rem;
  font-size: clamp(2.6rem, 5vw, 4.8rem);
  line-height: 1.02;
}

.donaciones-hero__text {
  max-width: 65ch;
  margin-bottom: 0;
  color: var(--theme-text-soft);
  font-size: 1.06rem;
  line-height: 1.8;
}

.donaciones-hero__highlight {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.donaciones-hero__label {
  margin: 0 0 0.5rem;
  color: var(--theme-secondary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.donaciones-hero__highlight h2 {
  margin-bottom: 0.8rem;
}

.donaciones-hero__highlight p:last-child {
  margin-bottom: 0;
  color: var(--theme-text-soft);
}

.donaciones-layout {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 1.5rem;
  align-items: stretch;
}

.donaciones-visual {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  min-height: 100%;
}

.donaciones-visual__icon-wrap {
  position: relative;
  min-height: 320px;
  display: grid;
  place-items: center;
}

.donaciones-visual__icon-bg {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(var(--theme-secondary-rgb), 0.16), transparent 68%);
  filter: blur(8px);
}

.donaciones-visual__icon {
  position: relative;
  width: min(300px, 70%);
  color: var(--theme-secondary);
  opacity: 0.92;
}

.donaciones-visual__content h2 {
  margin-bottom: 0.8rem;
}

.donaciones-visual__content p:last-child {
  margin-bottom: 0;
  color: var(--theme-text-soft);
  line-height: 1.8;
}

.donaciones-bank {
  padding: 2rem;
}

.donaciones-bank__header {
  margin-bottom: 1.5rem;
}

.donaciones-bank__header h2 {
  margin-bottom: 0;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
}

.donaciones-bank__grid {
  display: grid;
  gap: 1rem;
}

.donaciones-field {
  padding: 1rem 1rem 1.05rem;
  border: 1px solid var(--theme-border-subtle);
  border-radius: var(--radius-md);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.015)),
    var(--theme-panel-bg-soft);
}

.donaciones-field__label {
  display: block;
  margin-bottom: 0.45rem;
  color: var(--theme-secondary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.donaciones-field__value-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.9rem;
}

.donaciones-field__value-row--wrap {
  flex-wrap: wrap;
}

.donaciones-field__value {
  margin: 0;
  color: var(--theme-text);
  font-size: 1.16rem;
  font-weight: 700;
  line-height: 1.4;
  word-break: break-word;
}

.donaciones-field__link {
  color: var(--theme-text);
  font-size: 1.08rem;
  font-weight: 700;
  word-break: break-word;
}

.donaciones-field__link:hover {
  color: var(--theme-secondary);
}

.donaciones-copy-btn {
  min-height: 40px;
  padding: 0.7rem 1rem;
  font-size: 0.82rem;
  white-space: nowrap;
}

.donaciones-note {
  margin-top: 1.25rem;
  padding: 1.15rem;
}

.donaciones-note h3 {
  margin-bottom: 0.45rem;
}

.donaciones-note p {
  margin: 0;
  color: var(--theme-text-soft);
  line-height: 1.75;
}

.donaciones-copy-feedback {
  margin: 1rem 0 0;
  color: var(--theme-secondary);
  font-weight: 700;
}

.donaciones-info-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.donaciones-info-card {
  padding: 1.5rem;
  height: 100%;
}

.donaciones-info-card h3 {
  margin-bottom: 0.7rem;
}

.donaciones-info-card p:last-child {
  margin-bottom: 0;
  color: var(--theme-text-soft);
  line-height: 1.75;
}

@media (max-width: 980px) {
  .donaciones-hero__panel,
  .donaciones-layout,
  .donaciones-info-grid {
    grid-template-columns: 1fr;
  }

  .donaciones-visual__icon-wrap {
    min-height: 240px;
  }
}

@media (max-width: 640px) {
  .donaciones-page {
    padding-bottom: 3rem;
  }

  .donaciones-hero__panel,
  .donaciones-visual,
  .donaciones-bank {
    padding: 1.25rem;
  }

  .donaciones-field__value-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .donaciones-copy-btn {
    width: 100%;
  }
}
</style>