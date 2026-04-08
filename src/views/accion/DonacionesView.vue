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
            Pentecostal Nazareth a nivel nacional, complete el siguiente formulario.
            Al finalizar, se habilitarán los datos oficiales para realizar su aporte.
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

    <!-- FORMULARIO + DATOS -->
    <section class="section-container section-block">
      <div class="donaciones-layout">
        <!-- FORMULARIO -->
        <article class="glass-panel donaciones-form-card">
          <div class="donaciones-form-card__header">
            <p class="section-eyebrow">Paso 1</p>
            <h2>Complete sus datos</h2>
            <p>
              Ingrese su nombre y correo electrónico para habilitar los datos oficiales
              de donación en el siguiente paso.
            </p>
          </div>

          <form class="donaciones-form" @submit.prevent="handleSubmit">
            <div class="donaciones-form__field">
              <label for="nombre" class="donaciones-form__label">Nombre</label>
              <input
                id="nombre"
                v-model.trim="form.nombre"
                type="text"
                class="donaciones-form__input"
                placeholder="Ingrese su nombre"
                :disabled="isSubmitting"
              />
            </div>

            <div class="donaciones-form__field">
              <label for="correo" class="donaciones-form__label">Correo electrónico</label>
              <input
                id="correo"
                v-model.trim="form.correo"
                type="email"
                class="donaciones-form__input"
                placeholder="Ingrese su correo"
                :disabled="isSubmitting"
              />
            </div>

            <Transition name="fade">
              <p v-if="formError" class="donaciones-form__error">
                {{ formError }}
              </p>
            </Transition>

            <Transition name="fade">
              <p v-if="submitSuccess" class="donaciones-copy-feedback">
                {{ submitSuccess }}
              </p>
            </Transition>

            <div class="donaciones-form__actions">
              <button
                type="submit"
                class="btn-primary donaciones-form__submit"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Enviando...' : 'Continuar' }}
              </button>
            </div>
          </form>

          <Transition name="fade">
            <div v-if="showContactInfo" class="donaciones-form__success card">
              <div class="donaciones-form__success-icon">
                <font-awesome-icon :icon="['fas', 'check']" />
              </div>

              <h3>Datos habilitados correctamente</h3>
              <p>
                Ya puede revisar los datos oficiales de la cuenta para realizar su aporte.
              </p>

              <div class="donaciones-contact-preview">
                <div class="donaciones-contact-preview__item">
                  <span class="donaciones-contact-preview__label">Nombre</span>
                  <span class="donaciones-contact-preview__value">{{ form.nombre }}</span>
                </div>

                <div class="donaciones-contact-preview__item">
                  <span class="donaciones-contact-preview__label">Correo</span>
                  <span class="donaciones-contact-preview__value">{{ form.correo }}</span>
                </div>
              </div>
            </div>
          </Transition>
        </article>

        <!-- DATOS DE DONACIÓN -->
        <article class="glass-panel--strong donaciones-bank">
          <div class="donaciones-bank__header">
            <p class="section-eyebrow">Paso 2</p>
            <h2>Datos de donación</h2>
          </div>

          <div v-if="!showContactInfo" class="donaciones-bank__locked">
            <div class="donaciones-bank__locked-icon">
              <font-awesome-icon :icon="['fas', 'envelope']" />
            </div>

            <h3>Complete el formulario</h3>
            <p>
              Una vez que ingrese su nombre y correo electrónico, aquí se mostrarán
              los datos oficiales de la cuenta para realizar su donación.
            </p>
          </div>

          <div v-else>
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
                <span class="donaciones-field__label">Correo de respaldo</span>
                <div class="donaciones-field__value-row donaciones-field__value-row--wrap">
                  <a
                    href="mailto:contacto@ipnchile.cl"
                    class="donaciones-field__link"
                  >
                    contacto@ipnchile.cl
                  </a>
                  <button
                    type="button"
                    class="btn-secondary donaciones-copy-btn"
                    @click="copyText('contacto@ipnchile.cl', 'Correo copiado')"
                  >
                    Copiar
                  </button>
                </div>
              </div>
            </div>

            <div class="donaciones-note card">
              <h3>Importante</h3>
              <p>
                Si realiza una transferencia, conserve su comprobante y utilice siempre
                los datos oficiales indicados en esta sección.
              </p>
            </div>
          </div>

          <Transition name="fade">
            <p v-if="copyMessage" class="donaciones-copy-feedback">
              {{ copyMessage }}
            </p>
          </Transition>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'

const FORM_ENDPOINT = 'https://formspree.io/f/xojpbdvq'

const copyMessage = ref('')
const formError = ref('')
const submitSuccess = ref('')
const isSubmitting = ref(false)
const showContactInfo = ref(false)

const form = reactive({
  nombre: '',
  correo: ''
})

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function handleSubmit() {
  formError.value = ''
  submitSuccess.value = ''

  if (!form.nombre || !form.correo) {
    formError.value = 'Debe completar su nombre y correo electrónico.'
    return
  }

  if (!isValidEmail(form.correo)) {
    formError.value = 'Debe ingresar un correo electrónico válido.'
    return
  }

  isSubmitting.value = true

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: form.nombre,
        email: form.correo,
        _subject: 'Nueva solicitud desde Donaciones IPN Chile',
        origen: 'Formulario Donaciones IPN Chile'
      })
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      if (result?.errors?.length) {
        formError.value = result.errors.map(error => error.message).join(' ')
      } else {
        formError.value = 'No fue posible enviar el formulario. Intente nuevamente.'
      }
      return
    }

    showContactInfo.value = true
    submitSuccess.value = 'Formulario enviado correctamente. Ya puede ver los datos de la cuenta.'
  } catch (error) {
    formError.value = 'Ocurrió un problema de conexión. Intente nuevamente.'
  } finally {
    isSubmitting.value = false
  }
}

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
  background:
    radial-gradient(circle at top center, rgba(203, 164, 94, 0.10), transparent 30%),
    linear-gradient(180deg, #08131d 0%, #0d1d2c 55%, #07111b 100%);
}

.donaciones-hero {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.donaciones-hero__panel {
  display: grid;
  grid-template-columns: 1.45fr 0.95fr;
  gap: 1.5rem;
  padding: 1.65rem;
}

.donaciones-hero__copy h1 {
  margin-bottom: 0.85rem;
  font-size: clamp(2.4rem, 5vw, 4.3rem);
  line-height: 1.02;
}

.donaciones-hero__text {
  max-width: 62ch;
  margin-bottom: 0;
  color: var(--theme-text-soft);
  font-size: 1rem;
  line-height: 1.75;
}

.donaciones-hero__highlight {
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.donaciones-hero__label {
  margin: 0 0 0.45rem;
  color: var(--theme-secondary);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.donaciones-hero__highlight h2 {
  margin-bottom: 0.7rem;
  font-size: clamp(1.5rem, 2.5vw, 2.2rem);
  line-height: 1.12;
}

.donaciones-hero__highlight p:last-child {
  margin-bottom: 0;
  color: var(--theme-text-soft);
  line-height: 1.7;
}

.donaciones-layout {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 1.5rem;
  align-items: stretch;
}

.donaciones-form-card,
.donaciones-bank {
  padding: 1.6rem;
  min-height: 100%;
}

.donaciones-form-card {
  display: flex;
  flex-direction: column;
}

.donaciones-form-card__header {
  margin-bottom: 1.25rem;
}

.donaciones-form-card__header h2 {
  margin-bottom: 0.65rem;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  line-height: 1.12;
}

.donaciones-form-card__header p {
  margin: 0;
  color: var(--theme-text-soft);
  line-height: 1.75;
}

.donaciones-form {
  display: grid;
  gap: 0.95rem;
}

.donaciones-form__field {
  display: grid;
  gap: 0.45rem;
}

.donaciones-form__label {
  color: var(--theme-secondary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.donaciones-form__input {
  width: 100%;
  min-height: 50px;
  border-radius: 14px;
  border: 1px solid var(--theme-border-subtle);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.015)),
    var(--theme-panel-bg-soft);
  color: var(--theme-text);
  padding: 0.9rem 1rem;
  outline: none;
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.donaciones-form__input:focus {
  border-color: var(--theme-border-strong);
  box-shadow: 0 0 0 3px rgba(var(--theme-secondary-rgb), 0.12);
}

.donaciones-form__error {
  margin: 0;
  color: #ffb0b0;
  font-weight: 700;
}

.donaciones-form__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.donaciones-form__submit {
  width: 100%;
  min-height: 52px;
}

.donaciones-form__success {
  margin-top: 1.25rem;
  padding: 1.25rem;
}

.donaciones-form__success-icon {
  width: 52px;
  height: 52px;
  margin-bottom: 1rem;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: rgba(68, 174, 110, 0.16);
  color: #8ce3aa;
  font-size: 1.2rem;
}

.donaciones-form__success h3 {
  margin-bottom: 0.6rem;
}

.donaciones-form__success p {
  margin-bottom: 1rem;
  color: var(--theme-text-soft);
  line-height: 1.7;
}

.donaciones-contact-preview {
  display: grid;
  gap: 0.8rem;
}

.donaciones-contact-preview__item {
  padding: 0.9rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--theme-border-subtle);
  background: rgba(255, 255, 255, 0.03);
}

.donaciones-contact-preview__label {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--theme-secondary);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.donaciones-contact-preview__value {
  color: var(--theme-text);
  font-weight: 700;
  word-break: break-word;
}

.donaciones-bank__header {
  margin-bottom: 1.25rem;
}

.donaciones-bank__header h2 {
  margin-bottom: 0;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  line-height: 1.05;
}

.donaciones-bank__locked {
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 1.5rem 1rem;
}

.donaciones-bank__locked-icon {
  width: 62px;
  height: 62px;
  margin: 0 auto 1rem;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: rgba(var(--theme-secondary-rgb), 0.12);
  border: 1px solid rgba(var(--theme-secondary-rgb), 0.18);
  color: var(--theme-secondary);
  font-size: 1.35rem;
}

.donaciones-bank__locked h3 {
  margin-bottom: 0.7rem;
  font-size: clamp(1.5rem, 2.5vw, 2.1rem);
  line-height: 1.15;
}

.donaciones-bank__locked p {
  margin: 0 auto;
  max-width: 40ch;
  color: var(--theme-text-soft);
  line-height: 1.75;
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
  text-decoration: none;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.24s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 980px) {
  .donaciones-hero__panel,
  .donaciones-layout {
    grid-template-columns: 1fr;
  }

  .donaciones-bank__locked {
    min-height: 280px;
  }
}

@media (max-width: 640px) {
  .donaciones-page {
    padding-bottom: 3rem;
  }

  .donaciones-hero__panel,
  .donaciones-form-card,
  .donaciones-bank {
    padding: 1.2rem;
  }

  .donaciones-field__value-row,
  .donaciones-form__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .donaciones-copy-btn {
    width: 100%;
  }

  .donaciones-hero__copy h1,
  .donaciones-bank__header h2,
  .donaciones-form-card__header h2 {
    word-break: break-word;
  }
}
</style>
