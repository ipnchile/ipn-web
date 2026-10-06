<template>
  <aside v-if="birthdays.length" class="birthday-card section-container" aria-labelledby="birthday-title">
    <span class="birthday-icon" aria-hidden="true">🎂</span>
    <div>
      <p id="birthday-title" class="birthday-title">¡Hoy celebramos su cumpleaños!</p>
      <p v-for="person in birthdays" :key="person.id" class="birthday-person">{{ person.role === 'pastora' ? 'Pastora' : 'Pastor' }} {{ person.nombre }}</p>
      <p class="birthday-date">{{ dateLabel }} · ¡Que Dios bendiga su vida!</p>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { usePublishedContent } from '@/composables/usePublishedContent'
const { birthdays: publishedBirthdays } = usePublishedContent()
const birthdays = computed(() => publishedBirthdays.value.filter(person => person.daysUntil === 0))
const dateLabel = computed(() => {
  if (!birthdays.value.length) return ''
  return new Intl.DateTimeFormat('es-CL',{day:'numeric',month:'long',timeZone:'UTC'}).format(new Date(`2000-${birthdays.value[0].monthDay}T12:00:00Z`))
})
</script>

<style scoped>
.birthday-card { display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:.75rem; margin:1.5rem auto; padding:1.15rem 1.4rem; max-width:720px; width:calc(100% - 2rem); border:1px solid rgba(185,144,66,.35); border-radius:18px; background:linear-gradient(120deg,rgba(185,144,66,.13),rgba(185,144,66,.04)); }
.birthday-icon { font-size:2.2rem; flex-shrink:0; }
.birthday-title { margin:0 0 .3rem; font-size:.85rem; font-weight:700; }
.birthday-person { margin:.15rem 0; font-weight:600; }
.birthday-date { margin:.4rem 0 0; font-size:.85rem; line-height:1.5; opacity:.8; }
@media(max-width:480px) { .birthday-card { padding:1rem; gap:.75rem; } .birthday-icon { font-size:1.8rem; } }
</style>
