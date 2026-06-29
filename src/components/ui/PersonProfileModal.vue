<template>
  <Transition name="person-profile-modal-fade">
    <div
      class="person-profile-modal"
      role="dialog"
      aria-modal="true"
      :aria-label="`Información de ${person.name || person.role}`"
      @click.self="emit('close')"
    >
      <div class="person-profile-modal__dialog glass-panel--strong">
        <button
          type="button"
          class="person-profile-modal__close"
          aria-label="Cerrar"
          @click="emit('close')"
        >
          ×
        </button>

        <div class="person-profile-modal__photo-wrap">
          <img
            v-if="person.photo"
            :src="person.photo"
            :alt="person.name || person.role"
            class="person-profile-modal__photo"
          />
          <div v-else class="person-profile-modal__photo person-profile-modal__photo--fallback">
            <font-awesome-icon :icon="['fas', 'user']" />
          </div>
        </div>

        <div class="person-profile-modal__content">
          <p class="section-eyebrow">{{ area }}</p>
          <h2>{{ person.name || 'Información en actualización' }}</h2>
          <p class="person-profile-modal__role">{{ person.role }}</p>
          <p v-if="person.period" class="person-profile-modal__period">{{ person.period }}</p>
          <p v-if="person.description" class="person-profile-modal__description">
            {{ person.description }}
          </p>
          <a v-if="person.email" class="person-profile-modal__email" :href="`mailto:${person.email}`">
            {{ person.email }}
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

defineProps({
  person: {
    type: Object,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['close'])

const previousBodyOverflow = document.body.style.overflow

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.body.style.overflow = previousBodyOverflow
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.person-profile-modal {
  position: fixed;
  inset: 0;
  z-index: 2200;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background: rgba(3, 8, 13, 0.78);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.person-profile-modal__dialog {
  position: relative;
  width: min(940px, 100%);
  max-height: min(780px, calc(100vh - 2.5rem));
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(300px, 1fr);
  overflow: hidden;
  border-radius: 24px;
}

.person-profile-modal__close {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  z-index: 2;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.34);
  color: #fff;
  font-size: 1.7rem;
  line-height: 1;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.person-profile-modal__close:hover,
.person-profile-modal__close:focus-visible {
  transform: scale(1.04);
  border-color: rgba(var(--theme-secondary-rgb), 0.45);
  background: rgba(var(--theme-secondary-rgb), 0.22);
  outline: none;
}

.person-profile-modal__photo-wrap {
  min-height: 540px;
  background:
    radial-gradient(circle at top, rgba(var(--theme-secondary-rgb), 0.15), transparent 58%),
    rgba(255, 255, 255, 0.03);
}

.person-profile-modal__photo {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center 16%;
}

.person-profile-modal__photo--fallback {
  display: grid;
  place-items: center;
  color: var(--theme-secondary);
  font-size: 4rem;
}

.person-profile-modal__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(1.5rem, 4vw, 3rem);
}

.person-profile-modal__content h2 {
  margin: 0.35rem 0 0.85rem;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  line-height: 1.08;
}

.person-profile-modal__role,
.person-profile-modal__period,
.person-profile-modal__description {
  margin: 0;
}

.person-profile-modal__role {
  color: var(--theme-text);
  font-size: 1.05rem;
  font-weight: 800;
}

.person-profile-modal__period {
  margin-top: 0.35rem;
  color: var(--theme-secondary);
  font-weight: 700;
}

.person-profile-modal__description {
  margin-top: 1.15rem;
  color: var(--theme-text-soft);
  line-height: 1.75;
}

.person-profile-modal__email {
  width: fit-content;
  margin-top: 1.25rem;
  color: var(--theme-secondary);
  font-weight: 700;
}

.person-profile-modal-fade-enter-active,
.person-profile-modal-fade-leave-active {
  transition: opacity 0.24s ease;
}

.person-profile-modal-fade-enter-active .person-profile-modal__dialog,
.person-profile-modal-fade-leave-active .person-profile-modal__dialog {
  transition: transform 0.24s ease, opacity 0.24s ease;
}

.person-profile-modal-fade-enter-from,
.person-profile-modal-fade-leave-to {
  opacity: 0;
}

.person-profile-modal-fade-enter-from .person-profile-modal__dialog,
.person-profile-modal-fade-leave-to .person-profile-modal__dialog {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

@media (max-width: 700px) {
  .person-profile-modal {
    align-items: end;
    padding: 0.75rem;
  }

  .person-profile-modal__dialog {
    grid-template-columns: 1fr;
    width: 100%;
    max-height: calc(100vh - 1.5rem);
    overflow-y: auto;
    border-radius: 20px;
  }

  .person-profile-modal__photo-wrap {
    min-height: 360px;
    max-height: 56vh;
  }

  .person-profile-modal__content {
    padding: 1.35rem;
  }
}
</style>
