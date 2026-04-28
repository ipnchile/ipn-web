<template>
    <svg class="brand-icon" viewBox="0 0 120 120" aria-hidden="true">
        <path class="brand-icon__main"
            d="M24 96V62C24 39 40 24 62 24C84 24 100 39 100 62V96H82V63C82 50 74 41 62 41C50 41 42 50 42 63V96H24Z" />
        <circle class="brand-icon__stone" cx="84" cy="78" r="20" />
        <path class="brand-icon__cut" d="M42 96V63C42 50 50 41 62 41C74 41 82 50 82 63V96H42Z" />
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

.brand-icon__stone {
    fill: rgba(203, 164, 94, 0.35);
}

.brand-icon__cut {
    fill: var(--theme-bg-deep);
}
</style>