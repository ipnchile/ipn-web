<template>
  <header class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__container">
      <!-- LOGO -->
      <RouterLink
        to="/"
        class="navbar__brand"
        aria-label="Ir al inicio"
        @click="closeAll"
      >
        <img
          class="navbar__logo"
          src="@/assets/img/logos/ipn-navbar-white.png"
          alt="Iglesia Pentecostal Nazareth"
        />
      </RouterLink>

      <!-- NAVEGACIÓN DESKTOP -->
      <nav class="navbar__menu">
        <RouterLink
          to="/"
          class="navbar__link"
          :class="{ 'active': isRoute('/') }"
        >
          Inicio
        </RouterLink>

        <RouterLink
          to="/quienes-somos"
          class="navbar__link"
          :class="{ 'active': isSection('/quienes-somos') }"
        >
          Quiénes Somos
        </RouterLink>

        <!-- DROPDOWN DEPARTAMENTOS -->
        <div
          class="navbar__dropdown"
          @mouseenter="handleMouseEnter('departamentos')"
          @mouseleave="handleMouseLeave"
        >
          <button
            type="button"
            class="navbar__link navbar__dropdown-title"
            :class="{ 'active': isSection('/departamentos') || dropdowns.departamentos }"
            @click="toggleDropdown('departamentos')"
          >
            <span>Departamentos</span>
            <svg 
              class="navbar__dropdown-icon" 
              :class="{ 'open': dropdowns.departamentos }" 
              viewBox="0 0 20 20"
            >
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <transition name="dropdown-fade">
            <div v-if="dropdowns.departamentos" class="navbar__dropdown-content">
              <RouterLink to="/departamentos/varones" :class="{ 'active': isRoute('/departamentos/varones') }">Varones</RouterLink>
              <RouterLink to="/departamentos/dorcas" :class="{ 'active': isRoute('/departamentos/dorcas') }">Dorcas</RouterLink>
              <RouterLink to="/departamentos/jumix" :class="{ 'active': isRoute('/departamentos/jumix') }">Jumix</RouterLink>
            </div>
          </transition>
        </div>

        <!-- DROPDOWN ACTUALIDAD -->
        <div
          class="navbar__dropdown"
          @mouseenter="handleMouseEnter('actualidad')"
          @mouseleave="handleMouseLeave"
        >
          <button
            type="button"
            class="navbar__link navbar__dropdown-title"
            :class="{ 'active': isSection('/actualidad') || dropdowns.actualidad }"
            @click="toggleDropdown('actualidad')"
          >
            <span>Actualidad</span>
            <svg 
              class="navbar__dropdown-icon" 
              :class="{ 'open': dropdowns.actualidad }" 
              viewBox="0 0 20 20"
            >
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <transition name="dropdown-fade">
            <div v-if="dropdowns.actualidad" class="navbar__dropdown-content">
              <RouterLink to="/actualidad/noticias" :class="{ 'active': isRoute('/actualidad/noticias') }">Noticias</RouterLink>
              <RouterLink to="/actualidad/eventos" :class="{ 'active': isRoute('/actualidad/eventos') }">Eventos</RouterLink>
            </div>
          </transition>
        </div>

        <RouterLink
          to="/donaciones"
          class="navbar__link"
          :class="{ 'active': isRoute('/donaciones') }"
        >
          Donaciones
        </RouterLink>

        <RouterLink
          to="/contacto"
          class="navbar__link"
          :class="{ 'active': isRoute('/contacto') }"
        >
          Contacto
        </RouterLink>

        <RouterLink to="/sumate" class="navbar__cta">
          Súmate
        </RouterLink>
      </nav>

      <!-- BOTÓN MÓVIL -->
      <button
        class="navbar__toggle"
        @click="toggleMenu"
        :class="{ 'navbar__toggle--active': menuOpen }"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- MENÚ MÓVIL -->
    <transition name="mobile-fade">
      <div v-if="menuOpen" class="navbar__mobile">
        <div class="navbar__mobile-container">
          <RouterLink to="/" :class="{ 'active': isRoute('/') }">Inicio</RouterLink>
          <RouterLink to="/quienes-somos" :class="{ 'active': isSection('/quienes-somos') }">Quiénes Somos</RouterLink>
          
          <div class="navbar__mobile-section">
            <span class="navbar__mobile-label">Departamentos</span>
            <RouterLink to="/departamentos/varones">Varones</RouterLink>
            <RouterLink to="/departamentos/dorcas">Dorcas</RouterLink>
            <RouterLink to="/departamentos/jumix">Jumix</RouterLink>
          </div>

          <div class="navbar__mobile-section">
            <span class="navbar__mobile-label">Actualidad</span>
            <RouterLink to="/actualidad/noticias">Noticias</RouterLink>
            <RouterLink to="/actualidad/eventos">Eventos</RouterLink>
          </div>

          <RouterLink to="/donaciones" :class="{ 'active': isRoute('/donaciones') }">Donaciones</RouterLink>
          <RouterLink to="/contacto" :class="{ 'active': isRoute('/contacto') }">Contacto</RouterLink>
          
          <RouterLink to="/sumate" class="navbar__mobile-cta">
            Súmate
          </RouterLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const menuOpen = ref(false)
const isScrolled = ref(false)

// Estado unificado de dropdowns
const dropdowns = reactive({
  departamentos: false,
  actualidad: false
})

let closeTimeout = null

// Helpers de ruta
const isRoute = (path) => route.path === path
const isSection = (base) => route.path.startsWith(base)

// Lógica de Menú y Dropdowns
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) {
    dropdowns.departamentos = false
    dropdowns.actualidad = false
  }
}

const handleMouseEnter = (key) => {
  if (window.innerWidth > 1024) {
    clearTimeout(closeTimeout)
    // Cerrar el otro antes de abrir el actual
    Object.keys(dropdowns).forEach(k => dropdowns[k] = false)
    dropdowns[key] = true
  }
}

const handleMouseLeave = () => {
  if (window.innerWidth > 1024) {
    closeTimeout = setTimeout(() => {
      dropdowns.departamentos = false
      dropdowns.actualidad = false
    }, 200)
  }
}

const toggleDropdown = (key) => {
  dropdowns[key] = !dropdowns[key]
}

const closeAll = () => {
  menuOpen.value = false
  dropdowns.departamentos = false
  dropdowns.actualidad = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// Observadores
watch(() => route.fullPath, closeAll)

watch(menuOpen, (val) => {
  document.body.style.overflow = val ? "hidden" : ""
})

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll)
  document.body.style.overflow = ""
  clearTimeout(closeTimeout)
})
</script>

<style scoped>
/* --- VARIABLES LOCALES O REFERENCIAS --- */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(14, 30, 46, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar--scrolled {
  background: rgba(14, 30, 46, 0.95);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(203, 164, 94, 0.2);
}

.navbar__container {
  width: min(1200px, calc(100% - 3rem));
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 85px;
  transition: height 0.3s ease;
}

.navbar--scrolled .navbar__container {
  height: 70px;
}

/* --- LOGO --- */
.navbar__logo {
  height: 42px;
  transition: transform 0.3s ease;
}
.navbar__brand:hover .navbar__logo {
  transform: scale(1.05);
}

/* --- LINKS DESKTOP --- */
.navbar__menu {
  display: flex;
  align-items: center;
  gap: 1.8rem;
}

.navbar__link {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  background: none;
  border: none;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.navbar__link:hover,
.navbar__link.active {
  color: #fff;
}

.navbar__link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--theme-secondary, #cba45e);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.navbar__link.active::after {
  width: 100%;
}

/* --- DROPDOWNS --- */
.navbar__dropdown {
  position: relative;
  display: flex;
  align-items: center;
}

.navbar__dropdown-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar__dropdown-icon {
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease;
}

.navbar__dropdown-icon.open {
  transform: rotate(180deg);
}

.navbar__dropdown-content {
  position: absolute;
  top: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 220px;
  background: rgba(14, 30, 46, 0.98);
  border: 1px solid rgba(203, 164, 94, 0.3);
  border-radius: 12px;
  padding: 0.7rem 0;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  backdrop-filter: blur(20px);
}

.navbar__dropdown-content a {
  display: block;
  padding: 0.8rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
}

.navbar__dropdown-content a:hover,
.navbar__dropdown-content a.active {
  background: rgba(203, 164, 94, 0.1);
  color: var(--theme-secondary, #cba45e);
  padding-left: 1.8rem;
}

/* --- CTA BOTÓN --- */
.navbar__cta {
  border: 1px solid var(--theme-secondary, #cba45e);
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  color: var(--theme-secondary, #cba45e);
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;
}

.navbar__cta:hover {
  background: var(--theme-secondary, #cba45e);
  color: #0e1e2e;
  box-shadow: 0 0 20px rgba(203, 164, 94, 0.4);
}

/* --- MÓVIL --- */
.navbar__toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
}

.navbar__toggle span {
  width: 28px;
  height: 2px;
  background: #fff;
  transition: 0.3s;
}

.navbar__toggle--active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.navbar__toggle--active span:nth-child(2) { opacity: 0; }
.navbar__toggle--active span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

@media (max-width: 1024px) {
  .navbar__menu { display: none; }
  .navbar__toggle { display: flex; }

  .navbar__mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #0e1e2e;
    padding-top: 100px;
    z-index: -1;
  }

  .navbar__mobile-container {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1.2rem;
  }

  .navbar__mobile-container a {
    color: #fff;
    font-size: 1.2rem;
    text-decoration: none;
    font-weight: 600;
  }

  .navbar__mobile-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 1rem;
    border-left: 2px solid rgba(203, 164, 94, 0.3);
  }

  .navbar__mobile-label {
    color: var(--theme-secondary, #cba45e);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .navbar__mobile-cta {
    margin-top: 1rem;
    text-align: center;
    border: 2px solid var(--theme-secondary, #cba45e) !important;
    padding: 1rem !important;
    border-radius: 12px;
  }
}

/* --- TRANSICIONES --- */
.dropdown-fade-enter-active, .dropdown-fade-leave-active {
  transition: all 0.3s ease;
}
.dropdown-fade-enter-from, .dropdown-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}

.mobile-fade-enter-active, .mobile-fade-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-fade-enter-from, .mobile-fade-leave-to {
  opacity: 0;
}
</style>