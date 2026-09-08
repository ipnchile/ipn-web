<script setup>
defineProps({banner:{type:Object,required:true}})
</script>
<template>
  <section class="published-banner" :aria-label="banner.title">
    <a v-if="banner.link" :href="banner.link"><img :src="banner.image" :alt="banner.title" fetchpriority="high"><span>{{ banner.description || banner.title }}</span></a>
    <template v-else><img :src="banner.image" :alt="banner.title" fetchpriority="high"><p>{{ banner.description || banner.title }}</p></template>
  </section>
</template>
<style scoped>
.published-banner{background:#08111c;text-align:center;color:#fff}.published-banner a{display:block;color:inherit}.published-banner img{display:block;width:100%;height:auto;object-fit:contain}.published-banner span,.published-banner p{display:block;margin:0;padding:1rem}
</style>
