<script setup>
import BannerCarousel from './BannerCarousel.vue'
defineProps({banner:{type:Object,required:true}})
</script>
<template><BannerCarousel :banner="banner" /></template>
