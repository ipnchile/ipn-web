<template>
    <section class="carousel-container">
        <div class="carousel-wrapper">
            <div class="carousel-slides">
                <article
                    v-for="(slide, index) in slides"
                    :key="index"
                    class="carousel-slide"
                    :class="{ active: index === currentSlide }"
                >
                    <img
                        :src="slide.image"
                        :alt="slide.title"
                        class="carousel-image"
                    />

                    <div class="carousel-overlay"></div>

                    <div class="carousel-content">
                        <span v-if="slide.eyebrow" class="carousel-eyebrow">
                            {{ slide.eyebrow }}
                        </span>

                        <h2>{{ slide.title }}</h2>

                        <p v-if="slide.description" class="carousel-description">
                            {{ slide.description }}
                        </p>

                        <div v-if="slide.buttonText && slide.buttonLink" class="carousel-actions">
                            <RouterLink
                                :to="slide.buttonLink"
                                class="carousel-button-primary"
                            >
                                {{ slide.buttonText }}
                            </RouterLink>
                        </div>
                    </div>
                </article>
            </div>

            <button
                class="carousel-button prev"
                type="button"
                aria-label="Anterior"
                @click="prevSlide"
            >
                ‹
            </button>

            <button
                class="carousel-button next"
                type="button"
                aria-label="Siguiente"
                @click="nextSlide"
            >
                ›
            </button>

            <div class="carousel-dots">
                <button
                    v-for="(slide, index) in slides"
                    :key="`dot-${index}`"
                    class="dot"
                    :class="{ active: index === currentSlide }"
                    :aria-label="`Ir al slide ${index + 1}`"
                    @click="goToSlide(index)"
                ></button>
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
let autoplay = null

const slides = ref([
    {
        eyebrow: 'Iglesia Pentecostal Nazareth',
        title: 'Una presencia institucional con propósito',
        description: 'Un espacio digital renovado para fortalecer la conexión, la identidad y la misión de nuestra comunidad.',
        buttonText: 'Conócenos',
        buttonLink: '/quienes-somos',
        image: slide1
    },
    {
        eyebrow: 'Ministerios y comunidad',
        title: 'Cada departamento, una obra con identidad',
        description: 'Varones, Dorcas y Jumix forman parte de una visión viva, organizada y enfocada en servir.',
        buttonText: 'Ver departamentos',
        buttonLink: '/quienes-somos',
        image: slide2
    },
    {
        eyebrow: 'Súmate a la visión',
        title: 'Fe, servicio y comunidad en un solo lugar',
        description: 'Descubra una plataforma pensada para informar, conectar e inspirar a cada familia y generación.',
        buttonText: 'Súmate',
        buttonLink: '/sumate',
        image: slide3
    }
])

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
    currentSlide.value =
        (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

const goToSlide = (index) => {
    currentSlide.value = index
}

const startAutoplay = () => {
    stopAutoplay()
    autoplay = setInterval(() => {
        nextSlide()
    }, 6000)
}

const stopAutoplay = () => {
    if (autoplay) {
        clearInterval(autoplay)
        autoplay = null
    }
}

onMounted(() => {
    startAutoplay()
})

onBeforeUnmount(() => {
    stopAutoplay()
})
</script>

<style scoped>
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
    min-height: 420px;
    height: clamp(420px, 70vh, 760px);
    overflow: hidden;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.carousel-slides {
    position: relative;
    width: 100%;
    height: 100%;
}

.carousel-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.8s ease-in-out, visibility 0.8s ease-in-out;
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

.carousel-overlay {
    position: absolute;
    inset: 0;
    z-index: 3;
    background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.82) 0%,
        rgba(0, 0, 0, 0.56) 42%,
        rgba(0, 0, 0, 0.28) 74%,
        rgba(0, 0, 0, 0.16) 100%
    );
}

.carousel-content {
    position: absolute;
    left: clamp(1.5rem, 4vw, 5.5rem);
    right: clamp(1.5rem, 4vw, 5rem);
    bottom: clamp(7rem, 14vh, 9.5rem);
    max-width: 760px;
    z-index: 10;
    color: #ffffff;
    text-align: left;
    transform: translateY(20px);
    opacity: 0;
    transition: transform 0.8s ease-out, opacity 0.8s ease-out;
}

.carousel-slide.active .carousel-content {
    transform: translateY(0);
    opacity: 1;
}

.carousel-eyebrow {
    display: block;
    margin-bottom: 0.85rem;
    font-size: clamp(0.72rem, 1vw, 0.85rem);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #cba45e;
}

.carousel-content h2 {
    margin: 0 0 1rem;
    font-family: "Playfair Display", serif;
    font-size: clamp(2rem, 4.1vw, 4.4rem);
    line-height: 1.05;
    font-weight: 800;
    color: #ffffff;
    text-wrap: balance;
    max-width: 12ch;
}

.carousel-description {
    margin: 0 0 2rem;
    font-size: clamp(1rem, 1.2vw, 1.15rem);
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.9);
    max-width: 560px;
}

.carousel-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.carousel-button-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 0.95rem 2rem;
    background-color: transparent;
    color: #cba45e;
    border: 1px solid #cba45e;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.carousel-button-primary:hover {
    background-color: #cba45e;
    color: #09111d;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.28);
}

.carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.22);
    color: white;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    cursor: pointer;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-size: 2rem;
    line-height: 1;
}

.carousel-button:hover {
    background: #cba45e;
    border-color: #cba45e;
    color: #09111d;
}

.carousel-button.prev {
    left: 18px;
}

.carousel-button.next {
    right: 18px;
}

.carousel-dots {
    position: absolute;
    left: 50%;
    bottom: 22px;
    transform: translateX(-50%);
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 0.5rem;
}

.dot {
    width: 9px;
    height: 9px;
    border-radius: 999px;
    border: none;
    background: rgba(255, 255, 255, 0.35);
    cursor: pointer;
    transition: all 0.35s ease;
}

.dot.active {
    background: #cba45e;
    width: 28px;
}

/* Desktop grande */
@media (min-width: 1400px) {
    .carousel-wrapper {
        height: clamp(560px, 78vh, 860px);
    }

    .carousel-content {
        bottom: 8.5rem;
        max-width: 820px;
    }

    .carousel-content h2 {
        font-size: clamp(2.4rem, 4vw, 4.8rem);
    }
}

/* Laptop / tablet horizontal */
@media (max-width: 1200px) {
    .carousel-wrapper {
        height: clamp(460px, 68vh, 700px);
    }

    .carousel-content {
        bottom: 6.25rem;
        max-width: 680px;
    }

    .carousel-content h2 {
        font-size: clamp(1.9rem, 4.2vw, 3.4rem);
        max-width: 13ch;
    }

    .carousel-description {
        max-width: 520px;
    }
}

/* Tablet */
@media (max-width: 1024px) {
    .carousel-wrapper {
        height: clamp(430px, 62vh, 620px);
    }

    .carousel-content {
        bottom: 5.5rem;
        max-width: 620px;
    }

    .carousel-content h2 {
        font-size: clamp(1.75rem, 4.8vw, 2.9rem);
    }
}

/* Mobile */
@media (max-width: 768px) {
    .carousel-wrapper {
        min-height: 460px;
        height: min(78vh, 620px);
    }

    .carousel-overlay {
        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.72) 42%,
            rgba(0, 0, 0, 0.38) 72%,
            rgba(0, 0, 0, 0.16) 100%
        );
    }

    .carousel-content {
        left: 1.1rem;
        right: 1.1rem;
        bottom: 5rem;
        max-width: none;
        text-align: left;
    }

    .carousel-eyebrow {
        margin-bottom: 0.7rem;
        letter-spacing: 0.14em;
    }

    .carousel-content h2 {
        margin-bottom: 0.85rem;
        font-size: clamp(1.55rem, 7vw, 2.25rem);
        line-height: 1.12;
        max-width: 100%;
    }

    .carousel-description {
        margin-bottom: 1.4rem;
        max-width: 100%;
        font-size: 0.98rem;
        line-height: 1.55;
    }

    .carousel-button-primary {
        width: 100%;
        max-width: 260px;
        padding: 0.95rem 1.25rem;
        font-size: 0.78rem;
    }

    .carousel-button {
        display: none;
    }

    .carousel-dots {
        bottom: 16px;
        gap: 8px;
    }

    .dot {
        width: 8px;
        height: 8px;
    }

    .dot.active {
        width: 24px;
    }
}

/* Móviles pequeños */
@media (max-width: 480px) {
    .carousel-wrapper {
        min-height: 500px;
        height: 72vh;
    }

    .carousel-content {
        left: 0.95rem;
        right: 0.95rem;
        bottom: 4.5rem;
    }

    .carousel-content h2 {
        font-size: clamp(1.4rem, 7.5vw, 1.95rem);
    }

    .carousel-description {
        font-size: 0.93rem;
    }

    .carousel-button-primary {
        width: 100%;
        max-width: 100%;
    }
}
</style>