<template>
  <svg
    class="brand-icon"
    viewBox="0 0 120 120"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Letra N inspirada en el isotipo oficial -->
    <path
      class="brand-icon__main"
      d="
        M24 104
        V48
        C24 28 38 16 60 16
        C82 16 96 28 96 48
        V104
        H76
        V49
        C76 39 70 33 60 33
        C50 33 44 39 44 49
        V104
        H24
        Z
      "
    />

    <!-- Corte interior para dar forma al arco -->
    <path
      class="brand-icon__cut"
      d="
        M44 104
        V50
        C44 39 50 33 60 33
        C70 33 76 39 76 49
        V104
        H61
        V50
        C61 47 60 46 58 46
        C56 46 55 47 55 50
        V104
        H44
        Z
      "
    />

    <!-- Curva derecha característica -->
    <path
      class="brand-icon__main"
      d="
        M76 104
        V48
        C76 31 86 20 102 18
        V38
        C98 39 96 43 96 49
        V104
        H76
        Z
      "
    />
  </svg>
</template>

<script setup>
</script>

<style scoped>
.brand-icon {
  width: 100%;
  height: 100%;
  display: block;
}

.brand-icon__main {
  fill: var(--theme-secondary);
}

.brand-icon__cut {
  fill: var(--theme-bg-deep);
}
</style>