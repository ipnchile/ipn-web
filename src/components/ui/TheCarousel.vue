<template>
    <section class="carousel-container">
        <div class="carousel-wrapper" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
            <div class="carousel-slides">
                <article v-for="(slide, index) in slides" :key="index" class="carousel-slide"
                    :class="{ active: currentSlide === index }" :aria-hidden="currentSlide !== index">
                    <img :src="slide.image" :alt="slide.title" class="carousel-image" />

                    <div class="carousel-overlay"></div>

                    <div class="carousel-content">
                        <p v-if="slide.eyebrow" class="carousel-eyebrow">
                            {{ slide.eyebrow }}
                        </p>

                        <h2>{{ slide.title }}</h2>
                        <p class="carousel-description">{{ slide.description }}</p>

                        <div v-if="slide.buttonText" class="carousel-actions">
                            <RouterLink :to="slide.buttonLink || '/'" class="carousel-button-primary">
                                {{ slide.buttonText }}
                            </RouterLink>
                        </div>
                    </div>
                </article>
            </div>

            <button class="carousel-button prev" @click="prevSlide" aria-label="Slide anterior" type="button">
                <span>❮</span>
            </button>

            <button class="carousel-button next" @click="nextSlide" aria-label="Slide siguiente" type="button">
                <span>❯</span>
            </button>

            <div class="carousel-dots" role="tablist" aria-label="Selector de slides">
                <button v-for="(_, index) in slides" :key="index" class="dot"
                    :class="{ active: currentSlide === index }" :aria-label="`Ir al slide ${index + 1}`"
                    :aria-selected="currentSlide === index" role="tab" type="button" @click="goToSlide(index)"></button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import slide1 from '@/assets/img/carousel/slide1.jpeg'
import slide2 from '@/assets/img/carousel/slide2.jpeg'
import slide3 from '@/assets/img/carousel/slide3.jpeg'

const currentSlide = ref(0)
let autoplayInterval = null

const slides = ref([
    {
        image: slide1,
        eyebrow: 'Iglesia Pentecostal Nazareth',
        title: 'Una presencia institucional con propósito',
        description:
            'Un espacio digital renovado para fortalecer la conexión, la identidad y la misión de nuestra comunidad.',
        buttonText: 'Conócenos',
        buttonLink: '/quienes-somos',
    },
    {
        image: slide2,
        eyebrow: 'Ministerios y comunidad',
        title: 'Cada departamento, una obra con identidad',
        description:
            'Varones, Dorcas y Jumix forman parte de una visión viva, organizada y enfocada en servir.',
        buttonText: 'Ver departamentos',
        buttonLink: '/quienes-somos',
    },
    {
        image: slide3,
        eyebrow: 'Súmate a la visión',
        title: 'Fe, servicio y comunidad en un solo lugar',
        description:
            'Descubra una plataforma pensada para informar, conectar e inspirar a cada familia y generación.',
        buttonText: 'Súmate',
        buttonLink: '/sumate',
    }
])

const AUTOPLAY_DELAY = 5000

function nextSlide() {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
    resetAutoplay()
}

function prevSlide() {
    currentSlide.value =
        (currentSlide.value - 1 + slides.value.length) % slides.value.length
    resetAutoplay()
}

function goToSlide(index) {
    currentSlide.value = index
    resetAutoplay()
}

function startAutoplay() {
    stopAutoplay()
    autoplayInterval = window.setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % slides.value.length
    }, AUTOPLAY_DELAY)
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval)
        autoplayInterval = null
    }
}

function resetAutoplay() {
    stopAutoplay()
    startAutoplay()
}

onMounted(() => {
    startAutoplay()
})

onBeforeUnmount(() => {
    stopAutoplay()
})
</script>

<style scoped>
/* 1. Reset y Contenedor Principal */
.carousel-container {
    width: 100%;
    overflow: hidden;
    background-color: #060c14;
    margin: 0;
    padding: 0;
}

.carousel-wrapper {
    position: relative;
    width: 100%;
    height: 600px; /* Altura estándar */
    overflow: hidden;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Ajuste de altura para pantallas grandes */
@media (min-height: 800px) {
    .carousel-wrapper { height: 75vh; }
}

.carousel-slides {
    position: relative;
    width: 100%;
    height: 100%;
}

/* 2. Estilo de los Slides */
.carousel-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.8s ease-in-out, visibility 0.8s;
    z-index: 1;
}

.carousel-slide.active {
    opacity: 1;
    visibility: visible;
    z-index: 2;
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

/* 3. Capas de Protección (Para que el texto se lea) */
.carousel-overlay {
    position: absolute;
    inset: 0;
    z-index: 3;
    /* Degradado oscuro desde la izquierda */
    background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.85) 0%,
        rgba(0, 0, 0, 0.4) 50%,
        rgba(0, 0, 0, 0.2) 100%
    );
}

/* 4. BLOQUE DE CONTENIDO (TEXTO) */
.carousel-content {
    position: absolute;
    left: 8%; /* Margen de seguridad izquierdo */
    bottom: 15%;
    width: 84%; 
    max-width: 800px;
    z-index: 10;
    color: #ffffff;
    text-align: left;

    /* Animación de entrada suave */
    transform: translateY(20px);
    opacity: 0;
    transition: transform 0.8s ease-out, opacity 0.8s ease-out;
}

.carousel-slide.active .carousel-content {
    transform: translateY(0);
    opacity: 1;
}

/* Eyebrow (Texto pequeño arriba del título) */
.carousel-eyebrow {
    display: block;
    margin-bottom: 1rem;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #cba45e; /* Color dorado institucional */
}

/* Título Principal */
.carousel-content h2 {
    margin: 0 0 1.2rem;
    font-family: "Playfair Display", serif; /* Fuente elegante */
    font-size: clamp(1.8rem, 5vw, 3.2rem); 
    line-height: 1.1;
    font-weight: 800;
    color: #ffffff;
    text-wrap: balance;
}

/* Descripción */
.carousel-description {
    margin: 0 0 2.5rem;
    font-size: clamp(1rem, 1.2vw, 1.15rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    max-width: 550px;
}

/* 5. BOTONES DE ACCIÓN */
.carousel-button-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.9rem 2.2rem;
    background-color: transparent;
    color: #cba45e;
    border: 1px solid #cba45e;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.carousel-button-primary:hover {
    background-color: #cba45e;
    color: #000;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

/* 6. NAVEGACIÓN (Flechas) */
.carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.carousel-button:hover {
    background: #cba45e;
    border-color: #cba45e;
    color: #000;
}

.carousel-button.prev { left: 25px; }
.carousel-button.next { right: 25px; }

/* 7. INDICADORES (Dots) */
.carousel-dots {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    display: flex;
    gap: 10px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.4s ease;
}

.dot.active {
    background: #cba45e;
    width: 30px;
    border-radius: 10px;
}

/* 8. AJUSTES PARA MÓVIL */
@media (max-width: 768px) {
    .carousel-wrapper { height: 550px; }
    
    .carousel-content {
        left: 5%;
        width: 90%;
        bottom: 100px;
        text-align: center;
    }

    .carousel-content h2 {
        font-size: 2rem;
    }

    .carousel-description {
        margin: 0 auto 2rem;
    }

    /* Ocultamos flechas en móvil para no tapar el texto */
    .carousel-button {
        display: none;
    }
}
</style>