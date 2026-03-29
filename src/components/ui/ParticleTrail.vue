<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

let particleId = 0
const particles = ref([])

const palette = [
    'rgba(255,255,255,0.72)',
    'rgba(244,232,203,0.52)',
    'rgba(203,164,94,0.50)',
    'rgba(184,145,78,0.24)',
]

const MAX_PARTICLES = 80
const SPAWN_INTERVAL = 24
const MIN_DISTANCE = 6

let lastSpawn = 0
let lastX = 0
let lastY = 0
let isListening = false

const randomBetween = (min, max) => Math.random() * (max - min) + min
const randomFrom = (items) => items[Math.floor(Math.random() * items.length)]

const removeParticleLater = (id, delay) => {
    setTimeout(() => {
        particles.value = particles.value.filter((p) => p.id !== id)
    }, delay)
}

const animateParticle = (particle) => {
    // Añadimos la partícula con active: false (estado inicial)
    const newParticle = { ...particle, active: false }
    particles.value.push(newParticle)

    if (particles.value.length > MAX_PARTICLES) {
        particles.value.shift()
    }

    // Doble requestAnimationFrame: El truco maestro para Firefox.
    // Asegura que el navegador renderice el estado inicial antes de activar la transición.
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const target = particles.value.find((p) => p.id === particle.id)
            if (target) {
                target.active = true
            }
        })
    })

    removeParticleLater(particle.id, particle.duration + particle.delay + 200)
}

const spawnCelestialDust = (x, y, movementX = 0, movementY = 0) => {
    const angle = Math.atan2(movementY || 0.01, movementX || 0.01)
    const behind = angle + Math.PI
    const amount = 2 + Math.floor(Math.random() * 2)

    for (let i = 0; i < amount; i++) {
        const spread = randomBetween(-0.45, 0.45)
        const distance = randomBetween(15, 35)
        const driftAngle = behind + spread

        const dx = Math.cos(driftAngle) * distance
        const dy = Math.sin(driftAngle) * distance

        const isSparkle = Math.random() > 0.80

        const particle = {
            id: particleId++,
            x,
            y,
            tx: x + dx + randomBetween(-5, 5),
            ty: y + dy + randomBetween(-5, 5),
            size: isSparkle ? randomBetween(4, 7) : randomBetween(6, 12),
            scale: randomBetween(0.8, 1.1),
            endScale: isSparkle ? 0.2 : 0.4,
            opacity: isSparkle ? 0.9 : 0.6,
            duration: isSparkle ? randomBetween(600, 1000) : randomBetween(1000, 1600),
            blur: isSparkle ? 0 : 2,
            endBlur: isSparkle ? 1 : 4,
            color: randomFrom(palette),
            delay: randomBetween(0, 30),
            rotate: randomBetween(-15, 15),
            endRotate: randomBetween(-45, 45),
            sparkle: isSparkle,
            halo: false,
        }
        animateParticle(particle)
    }

    // Rare Halo effect
    if (Math.random() > 0.94) {
        const halo = {
            id: particleId++,
            x, y, tx: x, ty: y,
            size: randomBetween(25, 40),
            scale: 0.5,
            endScale: 2.5,
            opacity: 0.15,
            duration: 1200,
            blur: 4,
            endBlur: 10,
            color: 'radial-gradient(circle, rgba(203,164,94,0.3) 0%, rgba(255,255,255,0) 70%)',
            delay: 0,
            rotate: 0,
            endRotate: 0,
            sparkle: false,
            halo: true,
        }
        animateParticle(halo)
    }
}

const handleMouseMove = (event) => {
    const now = performance.now()
    const x = event.clientX
    const y = event.clientY

    const dx = x - lastX
    const dy = y - lastY
    const distance = Math.hypot(dx, dy)

    if (now - lastSpawn < SPAWN_INTERVAL) return
    if (distance < MIN_DISTANCE) return

    lastSpawn = now
    lastX = x
    lastY = y

    spawnCelestialDust(x, y, dx, dy)
}

onMounted(() => {
    const canHover = window.matchMedia('(hover: hover)').matches
    if (canHover) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        isListening = true
    }
})

onBeforeUnmount(() => {
    if (isListening) {
        window.removeEventListener('mousemove', handleMouseMove)
    }
})
</script>

<template>
    <div class="celestial-trail" aria-hidden="true">
        <span v-for="p in particles" :key="p.id" class="celestial-trail__item" :class="{
            'celestial-trail__item--sparkle': p.sparkle,
            'celestial-trail__item--halo': p.halo
        }" :style="{
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                opacity: p.active ? 0 : p.opacity,
                filter: `blur(${p.active ? p.endBlur : p.blur}px)`,
                transition: `
                    transform ${p.duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${p.delay}ms,
                    opacity ${p.duration}ms ease-out ${p.delay}ms,
                    filter ${p.duration}ms ease-out ${p.delay}ms
                `,
                transform: p.active
                    ? `translate3d(${p.tx}px, ${p.ty}px, 0) translate(-50%, -50%) scale(${p.endScale}) rotate(${p.endRotate}deg)`
                    : `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${p.scale}) rotate(${p.rotate}deg)`
            }" />
    </div>
</template>