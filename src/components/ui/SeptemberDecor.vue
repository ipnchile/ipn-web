<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { isSeasonActive } from '@/utils/seasonal'

const visible = ref(isSeasonActive())
const refresh = () => { visible.value = isSeasonActive() }
let timer
onMounted(() => {
  timer = window.setInterval(refresh, 60000)
  window.addEventListener('focus', refresh)
  document.addEventListener('visibilitychange', refresh)
})
onBeforeUnmount(() => {
  window.clearInterval(timer)
  window.removeEventListener('focus', refresh)
  document.removeEventListener('visibilitychange', refresh)
})
</script>

<template>
  <div v-if="visible" class="september-decor" aria-hidden="true">
    <span v-for="side in ['left', 'right']" :key="side" class="september-decor__flags" :class="side">
      <svg v-for="flag in 3" :key="flag" viewBox="0 0 30 20" focusable="false">
        <path fill="#fff" d="M0 0h30v20H0z" />
        <path fill="#d52b1e" d="M0 10h30v10H0z" />
        <path fill="#0039a6" d="M0 0h10v10H0z" />
        <path fill="#fff" d="m5 1.6.8 2.4h2.5l-2 1.5.8 2.4L5 6.4 2.9 7.9l.8-2.4-2-1.5h2.5z" />
      </svg>
    </span>
    <span class="september-decor__label">Septiembre · Mes de la Patria y Mes de la Biblia</span>
  </div>
</template>

<style scoped>
.september-decor { display: flex; align-items: center; justify-content: center; gap: clamp(.8rem, 3vw, 2.5rem); padding: .65rem 1rem; background: #102033; border-bottom: 1px solid #ffffff18; pointer-events: none; }
.september-decor__flags { display: flex; align-items: center; gap: .65rem; }
.september-decor__flags svg { width: 30px; height: 20px; box-shadow: 0 2px 5px #0003; }
.september-decor__flags svg:nth-child(2) { transform: rotate(-6deg); }
.september-decor__flags.left { order: 0; }
.september-decor__flags.right { order: 2; }
.september-decor__label { order: 1; color: #fff; font-size: .75rem; letter-spacing: .09em; text-align: center; }
@media (max-width: 600px) { .september-decor__flags svg:not(:first-child) { display: none; } .september-decor__label { font-size: .68rem; letter-spacing: .04em; } }
</style>
