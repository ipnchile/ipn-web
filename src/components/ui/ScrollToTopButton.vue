<template>
    <Transition name="scroll-top-fade">
        <button v-if="visible" class="scroll-top-btn" type="button" aria-label="Volver al inicio" @click="scrollToTop">
            <svg class="scroll-top-btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 14L12 8L18 14" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
    </Transition>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const visible = ref(false)
const SHOW_AFTER = 50

function handleScroll() {
    visible.value = window.scrollY > SHOW_AFTER
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

onMounted(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-top-btn {
    position: fixed;
    right: 1.25rem;
    bottom: 1.25rem;
    width: 68px;
    height: 68px;
    display: grid;
    place-items: center;
    border: 1px solid var(--theme-border-soft);
    border-radius: 50%;
    background:
        radial-gradient(circle at 30% 30%,
            rgba(255, 255, 255, 0.92) 0%,
            rgba(255, 255, 255, 0.82) 100%);
    color: var(--theme-primary);
    box-shadow:
        0 18px 35px rgba(0, 0, 0, 0.18),
        0 8px 18px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
    cursor: pointer;
    z-index: 1200;
    transition:
        transform var(--transition-base),
        box-shadow var(--transition-base),
        border-color var(--transition-base),
        background var(--transition-base),
        opacity var(--transition-base);
}

.scroll-top-btn:hover {
    transform: translateY(-4px) scale(1.02);
    border-color: var(--theme-border-strong);
    box-shadow:
        0 22px 40px rgba(0, 0, 0, 0.22),
        0 10px 22px rgba(0, 0, 0, 0.12),
        0 0 0 8px rgba(var(--theme-secondary-rgb), 0.12);
}

.scroll-top-btn:active {
    transform: translateY(-1px) scale(0.98);
}

.scroll-top-btn:focus-visible {
    outline: none;
    box-shadow:
        0 0 0 4px rgba(255, 255, 255, 0.7),
        0 0 0 8px rgba(var(--theme-secondary-rgb), 0.26),
        0 18px 35px rgba(0, 0, 0, 0.18);
}

.scroll-top-btn__icon {
    width: 28px;
    height: 28px;
    display: block;
}

.scroll-top-fade-enter-active,
.scroll-top-fade-leave-active {
    transition:
        opacity 0.28s ease,
        transform 0.28s ease;
}

.scroll-top-fade-enter-from,
.scroll-top-fade-leave-to {
    opacity: 0;
    transform: translateY(10px) scale(0.92);
}

@media (max-width: 640px) {
    .scroll-top-btn {
        right: 1rem;
        bottom: 1rem;
        width: 58px;
        height: 58px;
    }

    .scroll-top-btn__icon {
        width: 24px;
        height: 24px;
    }
}

@media (prefers-reduced-motion: reduce) {

    .scroll-top-btn,
    .scroll-top-fade-enter-active,
    .scroll-top-fade-leave-active {
        transition: none !important;
    }
}
</style>