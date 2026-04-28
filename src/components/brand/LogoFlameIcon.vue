<template>
    <svg class="brand-icon" viewBox="0 0 120 120" aria-hidden="true">
        <path class="brand-icon__main"
            d="M60 12C77 34 84 49 82 64C80 81 68 92 60 100C52 92 40 81 38 64C36 49 43 34 60 12Z" />
        <path class="brand-icon__inner"
            d="M61 46C67 57 68 66 64 75C62 80 59 84 57 87C54 81 51 75 52 67C53 59 56 53 61 46Z" />
    </svg>
</template>

<script setup>
</script>

<style scoped>
.brand-icon {
    width: 100%;
    height: 100%;
}

.brand-icon__main {
    fill: var(--theme-secondary);
}

.brand-icon__inner {
    fill: var(--theme-bg-deep);
    opacity: 0.9;
}
</style>