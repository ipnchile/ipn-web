<script setup>
import { instagramPostUrl, newsAnchor, newsLocation } from '@/utils/news'
import CardCarousel from './CardCarousel.vue'
defineProps({ items: { type: Array, default: () => [] }, home: Boolean })
defineEmits(['read'])
const formatDate = value => new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value + 'T12:00:00'))
</script>

<template>
  <CardCarousel :count="items.length" :label="home ? 'Últimas noticias' : 'Noticias de Instagram'">
    <article v-for="item in items" :id="home ? undefined : newsAnchor(item.id)" :key="item.id" class="glass-panel news-card" tabindex="-1">
      <img v-if="item.thumbnail || item.image" :src="item.thumbnail || item.image" :alt="item.title" loading="lazy" class="news-card__image">
      <div v-else class="news-card__placeholder" aria-hidden="true">IPN Chile · Noticias</div>
      <div class="news-card__body">
        <p class="section-eyebrow">{{ instagramPostUrl(item.instagramUrl) ? 'Desde Instagram' : 'Noticias de la misión' }}</p>
        <time :datetime="item.date">{{ formatDate(item.date) }}</time>
        <h3><RouterLink v-if="home" :to="newsLocation(item.id)">{{ item.title }}</RouterLink><template v-else>{{ item.title }}</template></h3>
        <p v-if="item.description" class="news-card__summary">{{ item.description }}</p>
        <RouterLink v-if="home" :to="newsLocation(item.id)" class="btn-secondary">Leer noticia <span aria-hidden="true">→</span></RouterLink>
        <button v-else type="button" class="btn-secondary" @click="$emit('read', item)">Leer noticia</button>
        <a v-if="!home && instagramPostUrl(item.instagramUrl)" :href="instagramPostUrl(item.instagramUrl)" class="btn-secondary" target="_blank" rel="noopener noreferrer">Ver en Instagram <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  </CardCarousel>
</template>

<style scoped>
.news-card { padding: 0; overflow: hidden; scroll-margin-top: 155px; min-width: 0; display: flex; flex-direction: column; }
.news-card:target { outline: 2px solid var(--theme-secondary); outline-offset: 4px; }
.news-card__image, .news-card__placeholder { width: 100%; aspect-ratio: 4 / 3; object-fit: contain; background: var(--theme-panel-bg-soft); display: block; }
.news-card__placeholder { display: grid; place-items: center; color: var(--theme-secondary); }
.news-card__body { padding: 1.4rem; overflow-wrap: anywhere; display: flex; flex-direction: column; flex: 1; }
.news-card__body time { color: var(--theme-text-soft); font-size: .85rem; }
.news-card__body h3 { font-size: 1.35rem; margin: .7rem 0; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.news-card__body h3 a { color: inherit; }
.news-card__body h3 a:hover { text-decoration: underline; }
.news-card__body > p:not(.section-eyebrow) { color: var(--theme-text-soft); line-height: 1.7; white-space: pre-line; }
.news-card__summary { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.news-card__body .btn-secondary { margin-top: auto; }
.news-card__body .btn-secondary + .btn-secondary { margin-top: .5rem; }
</style>
